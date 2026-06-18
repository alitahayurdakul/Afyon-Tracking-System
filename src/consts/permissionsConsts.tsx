import { IOptionType } from "@/types/formTypes";

export const PERMISSION_OPTIONS: IOptionType[] = [
  { label: "Kullanıcıları Görüntüle", value: "user:read" },
  { label: "Kullanıcıları Yönet (Oluştur / Güncelle)", value: "user:write" },
  { label: "Kullanıcı Sil", value: "user:delete" },
  { label: "Rolleri Görüntüle", value: "role:read" },
  { label: "Rolleri Yönet (Oluştur / Güncelle / Sil)", value: "role:manage" },
  { label: "Aşamaları Görüntüle", value: "stage:read" },
];

export const PERMISSION_LABEL_MAP = new Map<string, string>(
  PERMISSION_OPTIONS.map((p) => [String(p.value), p.label]),
);
