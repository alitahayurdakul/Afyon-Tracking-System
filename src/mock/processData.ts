import { MainStage, StageDetail } from "@/types/activeProcessDetailTypes";

export const mockMainStages: MainStage[] = [
  {
    id: "depoya-giris",
    name: "Depoya Giriş",
    status: "completed",
    start: "15.06.2026 12:14",
    end: "15.06.2026 12:43",
    elapsed: "00:28:59",
  },
  {
    id: "manevra",
    name: "Manevra",
    status: "pending",
    start: null,
    end: null,
    elapsed: null,
  },
  {
    id: "ikmal",
    name: "İkmal",
    status: "active",
    start: "15.06.2026 12:43",
    end: null,
    elapsed: null,
  },
  {
    id: "muayene",
    name: "Muayene",
    status: "pending",
    start: null,
    end: null,
    elapsed: null,
  },
  {
    id: "bakim",
    name: "Bakım",
    status: "active",
    start: "15.06.2026 13:05",
    end: null,
    elapsed: null,
  },
  {
    id: "test",
    name: "Test",
    status: "completed",
    start: "15.06.2026 13:20",
    end: "15.06.2026 13:50",
    elapsed: "00:30:12",
  },
  {
    id: "teslim",
    name: "Teslim",
    status: "pending",
    start: null,
    end: null,
    elapsed: null,
  },
];

export const mockStageDetails: Record<string, StageDetail> = {
  "depoya-giris": {
    stageId: "depoya-giris",
    stageName: "Depoya Giriş",
    subStages: [
      {
        id: "ikmal",
        name: "İkmal",
        status: "completed",
        start: "15.06.2026 12:14",
        end: "15.06.2026 12:25",
        delayReasons: [],
        materials: [{ name: "Filtre", serial: "SN-10234" }],
        description: "Depo girişi standart prosedüre uygun tamamlandı.",
        images: [],
      },
      {
        id: "muayene",
        name: "Muayene",
        status: "completed",
        start: "15.06.2026 12:25",
        end: "15.06.2026 12:43",
        delayReasons: [],
        materials: [],
        description: "",
        images: [],
      },
      {
        id: "bakim",
        name: "Bakım",
        status: "active",
        start: "15.06.2026 12:43",
        end: null,
        delayReasons: ["Malzeme Eksikliği"],
        materials: [{ name: "Yağ", serial: "" }],
        description: "",
        images: [],
      },
      {
        id: "sub-test",
        name: "Test",
        status: "pending",
        start: null,
        end: null,
        delayReasons: [],
        materials: [],
        description: "",
        images: [],
      },
      {
        id: "sub-teslim",
        name: "Teslim",
        status: "pending",
        start: null,
        end: null,
        delayReasons: [],
        materials: [],
        description: "",
        images: [],
      },
    ],
  },
};

export const delayReasonOptions: string[] = [
  "Malzeme Eksikliği",
  "Masa Kısaltılmalı",
  "Mazot",
  "Personel Yetersiz",
  "Tezgah Uzunluğu",
];

export const materialOptions: string[] = ["Filtre", "Yağ", "Conta", "Civata", "Şablon"];
