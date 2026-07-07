import { useTranslations } from "next-intl";

import { MaterialEntry } from "@/types/activeProcessDetailTypes";

import styles from "./StageDetailModal.module.scss";

interface MaterialListProps {
  materials: MaterialEntry[];
  disabled?: boolean;
  onChange: (materials: MaterialEntry[]) => void;
}

export default function MaterialList({
  materials,
  disabled,
  onChange,
}: MaterialListProps) {
  const t = useTranslations("activeProcessDetail");

  const updateSerial = (materialId: string, serialNumber: string) => {
    onChange(
      materials.map((m) => (m._id === materialId ? { ...m, serialNumber } : m)),
    );
  };

  return (
    <div className={styles.materialList}>
      {materials.map((material) => (
        <div key={material._id} className={styles.materialRow}>
          <span className={styles.materialName}>{material.name}</span>
          <input
            name={material.materialCode}
            type="text"
            placeholder={t("serial-number-placeholder")}
            value={material.serialNumber}
            disabled={disabled}
            onChange={(e) => updateSerial(material._id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
