import { useRef } from "react";
import styles from "./StageDetailModal.module.scss";

interface ImageUploaderProps {
  images: string[];
  disabled: boolean;
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, disabled, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onChange([...images, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      {!disabled && (
        <div className={styles.uploadArea} onClick={() => inputRef.current?.click()}>
          <span>Görsel yüklemek için tıklayın</span>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}
      <div className={styles.imagePreview}>
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" className={styles.imageThumb} />
        ))}
      </div>
    </div>
  );
}
