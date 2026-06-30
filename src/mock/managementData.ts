/**
 * Geçici mock veriler.
 *
 * Backend hazır olmadığı için sayfalar şimdilik bu mock veriler ile çalışır.
 * API'ler hazır olduğunda ilgili query hook'larındaki mock dönüşü kaldırıp
 * yorum satırındaki gerçek `axiosInstance` çağrısını aktif etmek yeterlidir.
 */
import { IStageResponseDataTypes, IStageType } from "@/types/stagesTypes";
import {
  ISubStageResponseDataTypes,
  ISubStageType,
} from "@/types/subStagesTypes";
import { IWorkflowResponseTypes } from "@/types/workflowTypes";

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