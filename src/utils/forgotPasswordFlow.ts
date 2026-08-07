export const RESET_CODE_TTL_SECONDS = 600;
export const RESET_CODE_LENGTH = 6;

const STORAGE_KEY = "afyon_reset_flow";

interface IResetFlowState {
  email: string;
  resetToken: string;
  expiresAt: number;
}

const readFlow = (): IResetFlowState | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as IResetFlowState) : null;
  } catch {
    return null;
  }
};

const writeFlow = (state: IResetFlowState) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const saveResetFlow = (email: string) => {
  if (typeof window === "undefined") return;
  writeFlow({
    email,
    resetToken: "",
    expiresAt: Date.now() + RESET_CODE_TTL_SECONDS * 1000,
  });
};

export const setResetToken = (resetToken: string) => {
  const flow = readFlow();
  if (!flow) return;
  writeFlow({ ...flow, resetToken });
};

export const clearResetFlow = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
};

export const getResetFlowEmail = (): string => readFlow()?.email ?? "";

export const getResetToken = (): string => readFlow()?.resetToken ?? "";

export const isResetFlowVerified = (): boolean =>
  Boolean(readFlow()?.resetToken);

export const getResetCodeSecondsLeft = (): number => {
  const flow = readFlow();
  if (!flow) return 0;
  return Math.max(0, Math.ceil((flow.expiresAt - Date.now()) / 1000));
};
