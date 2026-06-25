import {
  DelayReasons,
  MainStage,
  StageDetail,
  SubStage,
} from "@/types/activeProcessDetailTypes";

export const mockMainStages: MainStage[] = [
  {
    id: "depoya-giris",
    name: "Depoya Giriş",
    status: "1",
    start: "15.06.2026 12:14",
    end: "15.06.2026 12:43",
    elapsed: "00:28:59",
  },
  {
    id: "manevra",
    name: "Manevra",
    status: "3",
    start: null,
    end: null,
    elapsed: null,
  },
  {
    id: "ikmal",
    name: "İkmal",
    status: "2",
    start: "15.06.2026 12:43",
    end: null,
    elapsed: null,
  },
  {
    id: "muayene",
    name: "Muayene",
    status: "3",
    start: null,
    end: null,
    elapsed: null,
  },
  {
    id: "bakim",
    name: "Bakım",
    status: "2",
    start: "15.06.2026 13:05",
    end: null,
    elapsed: null,
  },
  {
    id: "test",
    name: "Test",
    status: "1",
    start: "15.06.2026 13:20",
    end: "15.06.2026 13:50",
    elapsed: "00:30:12",
  },
  {
    id: "teslim",
    name: "Teslim",
    status: "3",
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
        start: "2026-06-15T09:14:03.041Z",
        end: "2026-06-15T09:15:03.041Z",
        delayReasons: [],
        materials: [{ name: "Filtre", serial: "SN-10234" }],
        description: "Depo girişi standart prosedüre uygun tamamlandı.",
        images: [],
      },
      {
        id: "muayene",
        name: "Muayene",
        status: "completed",
        start: "2026-06-15T09:14:03.041Z",
        end: "2026-06-15T09:17:03.041Z",
        delayReasons: [],
        materials: [],
        description: "",
        images: [],
      },
      {
        id: "bakim",
        name: "Bakım",
        status: "active",
        start: "2026-06-15T09:14:03.041Z",
        end: null,
        delayReasons: [
          {
            name: "Malzeme Eksikliği",
            id: "1",
          },
          {
            name: "Malzeme Eksikliği 2",
            id: "2",
          },
        ],
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

export const mockStageDetail: StageDetail = {
  stageName: "Depoya Giriş",
  stageId: "3",
  subStages: [
    {
      id: "ikmal",
      name: "İkmal",
      status: "1",
      start: "2026-06-15T09:14:03.041Z",
      end: "2026-06-15T09:15:03.041Z",
      delayReasons: [],
      materials: [{ name: "Filtre", serial: "SN-10234" }],
      description: "Depo girişi standart prosedüre uygun tamamlandı.",
      images: [],
    },
    {
      id: "muayene",
      name: "Muayene",
      status: "1",
      start: "2026-06-15T09:14:03.041Z",
      end: "2026-06-15T09:17:03.041Z",
      delayReasons: [],
      materials: [],
      description: "",
      images: [],
    },
    {
      id: "bakim",
      name: "Bakım",
      status: "2",
      start: "2026-06-15T09:14:03.041Z",
      end: null,
      delayReasons: [
        {
          name: "Malzeme Eksikliği",
          id: "1",
        },
        {
          name: "Malzeme Eksikliği 2",
          id: "2",
        },
      ],
      materials: [{ name: "Yağ", serial: "" }],
      description: "",
      images: [],
    },
    {
      id: "sub-test",
      name: "Test",
      status: "2",
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
      status: "3",
      start: null,
      end: null,
      delayReasons: [],
      materials: [],
      description: "",
      images: [],
    },
  ],
};

export const delayReasonOptions: DelayReasons[] = [
  {
    name: "Malzeme Eksikliği",
    id: "1",
  },
  {
    name: "Masa Kısaltılmalı",
    id: "2",
  },
  {
    name: "Mazot",
    id: "3",
  },
  {
    name: "Personel Yetersiz",
    id: "4",
  },
  {
    name: "Tezgah Uzunluğu",
    id: "5",
  },
];

export const materialOptions: string[] = [
  "Filtre",
  "Yağ",
  "Conta",
  "Civata",
  "Şablon",
];
