import React, { useMemo } from "react";

import styles from "@/styles/components/common/TrainVisualization.module.scss";

type TrainPieceType = "locomotive" | "wagon";

interface TrainPiece {
  type: TrainPieceType;
  overallIndex: number;
  wagonNumber?: number;
  isHighlighted: boolean;
  x: number; // Her parçanın başladığı sol X koordinatı
  computedWidth: number; // Bu parçanın burun dahil toplam genişliği
}

interface TrainVisualizationProps {
  totalCount: number;
  highlightedWagonNumber?: number;
  className?: string;
}

const MIN_LOCOMOTIVES = 2;

// --- SABİT BOYUT TANIMLARI ---
const WAGON_BASE_WIDTH = 80; // Standart vagon gövde genişliği
const NOSE_LEN = 26; // Burun kısmının uzunluğu
// Lokomotif boyu = Vagon boyu + Burun boyu
const LOCOMOTIVE_WIDTH = WAGON_BASE_WIDTH + NOSE_LEN;

const CAR_GAP = 8;
const MARGIN = 20;

const BODY_Y = 50;
const BODY_HEIGHT = 40;
const WINDOW_Y = 58;
const WINDOW_HEIGHT = 16;
const WINDOW_INSET = 8;
const WHEEL_R = 7;
const WHEEL_CY = BODY_Y + BODY_HEIGHT + 8;
const TRACK_Y = WHEEL_CY + 14;
const SVG_HEIGHT = TRACK_Y + 4;

export const TrainVisualization: React.FC<TrainVisualizationProps> = ({
  totalCount,
  highlightedWagonNumber,
  className,
}) => {
  const { pieces, svgWidth } = useMemo(() => {
    const safeTotal = Math.max(totalCount, MIN_LOCOMOTIVES);
    const result: TrainPiece[] = [];
    let wagonCounter = 0;
    let currentX = MARGIN;

    for (let i = 1; i <= safeTotal; i++) {
      const isFirst = i === 1;
      const isLast = i === safeTotal;
      const type: TrainPieceType = isFirst || isLast ? "locomotive" : "wagon";

      // Parçanın burun dahil toplam genişliği
      const pieceWidth =
        type === "locomotive" ? LOCOMOTIVE_WIDTH : WAGON_BASE_WIDTH;

      let wagonNumber: number | undefined;
      if (type === "wagon") {
        wagonCounter += 1;
        wagonNumber = wagonCounter;
      }

      result.push({
        type,
        overallIndex: i,
        wagonNumber,
        // Sadece o anki parçanın sıra numarası, prop olarak gelen numaraya eşitse boya
        isHighlighted: i === highlightedWagonNumber,
        x: currentX,
        computedWidth: pieceWidth,
      });

      // Bir sonraki parçanın başlangıç X'ini güncelle
      currentX += pieceWidth + CAR_GAP;
    }

    // Toplam SVG genişliği: Son parçanın son X koordinatı + sağ kenar boşluğu
    // (Döngü sonunda fazladan eklenen son CAR_GAP'i çıkarıyoruz)
    const totalSvgWidth = currentX - CAR_GAP + MARGIN;

    return { pieces: result, svgWidth: totalSvgWidth };
  }, [totalCount, highlightedWagonNumber]);

  return (
    <div className={`${styles.wrapper} ${className ?? ""}`}>
      <svg
        className={styles.svg}
        // Sabit piksel boyutlarını kullanıyoruz (Yatay kaydırma için)
        width={svgWidth}
        height={SVG_HEIGHT}
        viewBox={`0 0 ${svgWidth} ${SVG_HEIGHT}`}
        role="img"
        aria-label="Tren vagon dizilimi"
      >
        <line
          x1={MARGIN - 10}
          y1={TRACK_Y}
          x2={svgWidth - MARGIN + 10}
          y2={TRACK_Y}
          className={styles.track}
        />

        {pieces.map((piece) => {
          const isFirstLoco =
            piece.type === "locomotive" && piece.overallIndex === 1;
          const isLastLoco =
            piece.type === "locomotive" && piece.overallIndex === pieces.length;

          // Dikdörtgen gövdenin X konumu ve genişliği
          let bodyX = piece.x;
          let bodyWidth = WAGON_BASE_WIDTH;

          if (isFirstLoco) {
            // İlk lokomotifte burun en solda, gövde burundan sonra başlar
            bodyX = piece.x + NOSE_LEN;
          } else if (isLastLoco) {
            // Son lokomotifte gövde en solda, burun gövdeden sonra (en sağda) başlar
            bodyX = piece.x;
          }

          // Pencere koordinatları
          const windowX = bodyX + WINDOW_INSET;
          const windowWidth = bodyWidth - WINDOW_INSET * 2;

          const bodyGroupClass = piece.isHighlighted
            ? styles.highlightBody
            : styles.body;
          const midY = BODY_Y + BODY_HEIGHT / 2;

          // --- BURUN ÇİZİM MANTIĞI (Pencereler gibi dikdörtgen gövdeye göre konumlanmalı) ---
          const nosePath = isFirstLoco
            ? `M ${bodyX} ${BODY_Y} Q ${piece.x} ${BODY_Y + BODY_HEIGHT * 0.075} ${piece.x} ${midY} ` +
              `Q ${piece.x} ${BODY_Y + BODY_HEIGHT * 0.925} ${bodyX} ${BODY_Y + BODY_HEIGHT} Z`
            : isLastLoco
              ? (() => {
                  // Son burun, gövdenin hemen sağ ucundan (bx) başlar ve lokomotifin en sağ ucuna (tipX) kadar uzanır
                  const tipX = piece.x + LOCOMOTIVE_WIDTH; // Lokomotifin en sağ ucu
                  const bx = bodyX + bodyWidth; // Dikdörtgen gövdenin sağ ucu
                  return (
                    `M ${bx} ${BODY_Y} Q ${tipX} ${BODY_Y + BODY_HEIGHT * 0.075} ${tipX} ${midY} ` +
                    `Q ${tipX} ${BODY_Y + BODY_HEIGHT * 0.925} ${bx} ${BODY_Y + BODY_HEIGHT} Z`
                  );
                })()
              : null;

          return (
            <g key={piece.overallIndex}>
              {/* Burun */}
              {nosePath && <path d={nosePath} className={bodyGroupClass} />}

              {/* Dikdörtgen Gövde (Standart Vagon Boyunda) */}
              <rect
                x={bodyX}
                y={BODY_Y}
                width={bodyWidth}
                height={BODY_HEIGHT}
                rx={10}
                className={bodyGroupClass}
              />

              {/* Pencere */}
              <rect
                x={windowX}
                y={WINDOW_Y}
                width={windowWidth}
                height={WINDOW_HEIGHT}
                rx={6}
                className={styles.window}
              />

              {/* Vagon Bölmeleri (Sadece vagonlarda) */}
              {piece.type === "wagon" &&
                [1 / 3, 2 / 3].map((frac) => (
                  <line
                    key={frac}
                    x1={windowX + windowWidth * frac}
                    y1={WINDOW_Y + 1}
                    x2={windowX + windowWidth * frac}
                    y2={WINDOW_Y + WINDOW_HEIGHT - 1}
                    className={styles.mullion}
                  />
                ))}

              {/* Tekerlekler (Her parçanın kendi toplam genişliğine göre ortalanmış) */}
              <circle
                cx={piece.x + piece.computedWidth * 0.25}
                cy={WHEEL_CY}
                r={WHEEL_R}
                className={bodyGroupClass}
              />
              <circle
                cx={piece.x + piece.computedWidth * 0.75}
                cy={WHEEL_CY}
                r={WHEEL_R}
                className={bodyGroupClass}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TrainVisualization;
