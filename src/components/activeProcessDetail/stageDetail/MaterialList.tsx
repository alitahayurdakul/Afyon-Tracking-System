import { useTranslations } from "next-intl";

import { MaterialEntry } from "@/types/activeProcessDetailTypes";

import styles from "./StageDetailModal.module.scss";

interface MaterialListProps {
  materials: MaterialEntry[];
  disabled?: boolean;
  onChange: (materials: MaterialEntry[]) => void;
}

export default function MaterialList({ materials, disabled, onChange }: MaterialListProps) {
  const t = useTranslations("activeProcessDetail");

  const updateSerial = (name: string, serial: string) => {
    onChange(materials.map((m) => (m.name === name ? { ...m, serial } : m)));
  };

  return (
    <div className={styles.materialList}>
      {materials.map((material) => (
        <div key={material.name} className={styles.materialRow}>
          <span className={styles.materialName}>{material.name}</span>
          <input
            type="text"
            placeholder={t("serial-number-placeholder")}
            value={material.serial}
            disabled={disabled}
            onChange={(e) => updateSerial(material.name, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
