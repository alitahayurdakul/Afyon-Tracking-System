/**
 * Geçici mock veriler.
 *
 * Backend hazır olmadığı için sayfalar şimdilik bu mock veriler ile çalışır.
 * API'ler hazır olduğunda ilgili query hook'larındaki mock dönüşü kaldırıp
 * yorum satırındaki gerçek `axiosInstance` çağrısını aktif etmek yeterlidir.
 */

import {
  IMaterialResponseDataTypes,
  IMaterialType,
} from "@/types/materialsTypes";
import {
  IProjectType,
} from "@/types/projectsTypes";
import { IReasonResponseDataTypes, IReasonType } from "@/types/reasonsTypes";
import { IRoleResponseDataTypes, IRoleType } from "@/types/rolesTypes";
import { IStageResponseDataTypes, IStageType } from "@/types/stagesTypes";
import {
  ISubStageResponseDataTypes,
  ISubStageType,
} from "@/types/subStagesTypes";
import { IUserResponseDataTypes, IUserType } from "@/types/usersTypes";
import { IWagonResponseDataTypes, IWagonType } from "@/types/wagonsTypes";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";

/* --------------------------------- Vagonlar -------------------------------- */

export const mockWagons: IWagonType[] = [
  {
    _id: "wagon-1",
    name: "Vagon A1",
    description: "Yolcu vagonu, birinci sınıf.",
    creator: "Admin",
    createdAt: "2026-05-10T09:00:00.000Z",
    updatedAt: "2026-05-10T09:00:00.000Z",
  },
  {
    _id: "wagon-2",
    name: "Vagon B2",
    description: "Yük vagonu, kapalı tip.",
    creator: "Admin",
    editor: "Admin",
    createdAt: "2026-05-12T11:30:00.000Z",
    updatedAt: "2026-06-01T08:15:00.000Z",
  },
  {
    _id: "wagon-3",
    name: "Vagon C3",
    description: "Sarnıç vagonu, sıvı taşımacılığı için.",
    creator: "Admin",
    createdAt: "2026-05-20T14:45:00.000Z",
    updatedAt: "2026-05-20T14:45:00.000Z",
  },
];

export const mockWagonsResponse: IWagonResponseDataTypes = {
  count: mockWagons.length,
  wagons: mockWagons,
};

/* ----------------------------- Gecikme Sebepleri ---------------------------- */

export const mockReasons: IReasonType[] = [
  {
    _id: "reason-1",
    name: "Malzeme Eksikliği",
    description: "İlgili aşama için gerekli malzeme depoda bulunmuyor.",
    creator: "Admin",
    createdAt: "2026-05-10T09:00:00.000Z",
    updatedAt: "2026-05-10T09:00:00.000Z",
  },
  {
    _id: "reason-2",
    name: "Personel Yetersizliği",
    description: "Vardiyada yeterli operatör bulunmadığı için gecikme yaşandı.",
    creator: "Admin",
    editor: "Admin",
    createdAt: "2026-05-12T11:30:00.000Z",
    updatedAt: "2026-06-01T08:15:00.000Z",
  },
  {
    _id: "reason-3",
    name: "Ekipman Arızası",
    description: "Kullanılan ekipmanda teknik arıza meydana geldi.",
    creator: "Admin",
    createdAt: "2026-05-20T14:45:00.000Z",
    updatedAt: "2026-05-20T14:45:00.000Z",
  },
];

export const mockReasonsResponse: IReasonResponseDataTypes = {
  count: mockReasons.length,
  reasons: mockReasons,
};

/* --------------------------------- Roller ---------------------------------- */

export const mockRoles: IRoleType[] = [
  {
    _id: "role-1",
    roleName: "Yönetici",
    roleDescription: "Tüm yetkilere sahip sistem yöneticisi.",
    permissions: [
      "user:read",
      "user:write",
      "user:delete",
      "role:read",
      "role:manage",
      "stage:read",
    ],
    creator: "Admin",
    createdAt: "2026-04-01T09:00:00.000Z",
    updatedAt: "2026-04-01T09:00:00.000Z",
  },
  {
    _id: "role-2",
    roleName: "Operatör",
    roleDescription: "Aşamaları görüntüleyebilen saha kullanıcısı.",
    permissions: ["stage:read"],
    creator: "Admin",
    createdAt: "2026-04-05T10:00:00.000Z",
    updatedAt: "2026-04-05T10:00:00.000Z",
  },
];

export const mockRolesResponse: IRoleResponseDataTypes = {
  count: mockRoles.length,
  roles: mockRoles,
};

/* ------------------------------- Kullanıcılar ------------------------------- */

export const mockUsers: IUserType[] = [
  {
    _id: "user-1",
    fullname: "Mehmet Eroğlu",
    email: "mehmet@example.com",
    phone: "0500 000 00 01",
    department: "Bakım",
    role: { _id: "role-1", roleName: "Yönetici" },
    isActive: true,
    creator: "Admin",
    createdAt: "2026-04-01T09:00:00.000Z",
    updatedAt: "2026-04-01T09:00:00.000Z",
  },
  {
    _id: "user-2",
    fullname: "Ayşe Yılmaz",
    email: "ayse@example.com",
    phone: "0500 000 00 02",
    department: "Operasyon",
    role: { _id: "role-2", roleName: "Operatör" },
    isActive: true,
    creator: "Admin",
    createdAt: "2026-04-08T13:20:00.000Z",
    updatedAt: "2026-04-08T13:20:00.000Z",
  },
  {
    _id: "user-3",
    fullname: "Can Demir",
    email: "can@example.com",
    phone: "0500 000 00 03",
    department: "Operasyon",
    role: { _id: "role-2", roleName: "Operatör" },
    isActive: false,
    creator: "Admin",
    createdAt: "2026-04-15T16:00:00.000Z",
    updatedAt: "2026-04-15T16:00:00.000Z",
  },
];

export const mockUsersResponse: IUserResponseDataTypes = {
  count: mockUsers.length,
  users: mockUsers,
};

/* --------------------------------- Aşamalar -------------------------------- */

export const mockStages: IStageType[] = [
  {
    _id: "stage-1",
    name: "Depoya Giriş",
    description: "Trenin depoya giriş aşaması.",
    creator: "Admin",
    isActive: true,
    plannedOrder: 1,
    createdAt: "2026-03-01T09:00:00.000Z",
    updatedAt: "2026-03-01T09:00:00.000Z",
  },
  {
    _id: "stage-2",
    name: "Manevra",
    description: "Manevra aşaması.",
    creator: "Admin",
    isActive: true,
    plannedOrder: 2,
    createdAt: "2026-03-01T09:00:00.000Z",
    updatedAt: "2026-03-01T09:00:00.000Z",
  },
  {
    _id: "stage-3",
    name: "İkmal",
    description: "İkmal aşaması.",
    creator: "Admin",
    isActive: true,
    plannedOrder: 3,
    createdAt: "2026-03-01T09:00:00.000Z",
    updatedAt: "2026-03-01T09:00:00.000Z",
  },
  {
    _id: "stage-4",
    name: "Muayene",
    description: "Muayene aşaması.",
    creator: "Admin",
    isActive: true,
    plannedOrder: 4,
    createdAt: "2026-03-01T09:00:00.000Z",
    updatedAt: "2026-03-01T09:00:00.000Z",
  },
];

export const mockStagesResponse: IStageResponseDataTypes = {
  count: mockStages.length,
  stages: mockStages,
};

/* ------------------------------- İş Akışları ------------------------------- */

export const mockWorkflows: IWorkflowResponseTypes[] = [
  {
    _id: "workflow-1",
    name: "Standart Bakım Akışı",
    description: "Depoya giriş, manevra, ikmal ve muayene aşamalarını içerir.",
    creator: "Admin",
    isActive: true,
    stages: [
      { label: "Depoya Giriş", value: "stage-1" },
      { label: "Manevra", value: "stage-2" },
      { label: "İkmal", value: "stage-3" },
      { label: "Muayene", value: "stage-4" },
    ],
    createdAt: "2026-04-01T09:00:00.000Z",
    updatedAt: "2026-04-01T09:00:00.000Z",
  },
  {
    _id: "workflow-2",
    name: "Hızlı İkmal Akışı",
    description: "Sadece ikmal odaklı kısa akış.",
    creator: "Admin",
    isActive: true,
    stages: [
      { label: "Depoya Giriş", value: "stage-1" },
      { label: "İkmal", value: "stage-3" },
    ],
    createdAt: "2026-04-10T09:00:00.000Z",
    updatedAt: "2026-04-10T09:00:00.000Z",
  },
];

/* ------------------------------ Malzeme Listesi ----------------------------- */

export const mockMaterials: IMaterialType[] = [
  {
    _id: "material-1",
    name: "Fren Balatası",
    code: "FRN-001",
    description: "Tren fren sistemi için yedek balata.",
    creator: "Admin",
    createdAt: "2026-05-01T09:00:00.000Z",
    updatedAt: "2026-05-01T09:00:00.000Z",
  },
  {
    _id: "material-2",
    name: "Motor Yağı",
    code: "MTR-015",
    description: "İkmal aşamasında kullanılan motor yağı.",
    creator: "Admin",
    editor: "Admin",
    createdAt: "2026-05-03T10:30:00.000Z",
    updatedAt: "2026-05-22T12:00:00.000Z",
  },
  {
    _id: "material-3",
    name: "Hava Filtresi",
    code: "FLT-007",
    description: "Periyodik bakımda değiştirilen hava filtresi.",
    creator: "Admin",
    createdAt: "2026-05-08T08:00:00.000Z",
    updatedAt: "2026-05-08T08:00:00.000Z",
  },
];

export const mockMaterialsResponse: IMaterialResponseDataTypes = {
  count: mockMaterials.length,
  materials: mockMaterials,
};

/* ------------------------------- Alt Aşamalar ------------------------------ */

export const mockSubStages: ISubStageType[] = [
  {
    _id: "substage-1",
    name: "Yağ Seviyesi Kontrolü",
    materials: [{ value: "material-2", label: "Motor Yağı" }],
    description: "İkmal aşamasında motor yağ seviyesinin kontrol edilmesi.",
    creator: "Admin",
    createdAt: "2026-05-02T09:00:00.000Z",
    updatedAt: "2026-05-02T09:00:00.000Z",
  },
  {
    _id: "substage-2",
    name: "Yakıt Dolumu",
    materials: [
      { value: "material-2", label: "Motor Yağı" },
      { value: "material-3", label: "Hava Filtresi" },
    ],
    description: "Yakıt tankının doldurulması.",
    creator: "Admin",
    editor: "Admin",
    createdAt: "2026-05-04T10:30:00.000Z",
    updatedAt: "2026-05-18T12:00:00.000Z",
  },
  {
    _id: "substage-3",
    name: "Görsel Muayene",
    materials: [{ value: "material-1", label: "Fren Balatası" }],
    description: "Dış gövde ve aksamların görsel olarak incelenmesi.",
    creator: "Admin",
    createdAt: "2026-05-06T08:00:00.000Z",
    updatedAt: "2026-05-06T08:00:00.000Z",
  },
];

export const mockSubStagesResponse: ISubStageResponseDataTypes = {
  count: mockSubStages.length,
  subStages: mockSubStages,
};