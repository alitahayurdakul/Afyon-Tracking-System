import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthUserInfo {
  id?: string;
  email?: string;
  fullname?: string;
  role?: {
    roleName?: string;
    permissions?: string[];
  };
}

export interface IAuthState {
  accessToken: string | null;
  user: IAuthUserInfo | null;
}

const initialState: IAuthState = {
  accessToken: null,
  user: null,
};

let memoryAccessToken: string | null = null;

export const getAccessTokenInMemory = (): string | null => memoryAccessToken;
export const setAccessTokenInMemory = (token: string | null): void => {
  memoryAccessToken = token;
};

const decodeJwtPayload = (token: string): IAuthUserInfo | null => {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8"),
    );
    return payload?.UserInfo ?? null;
  } catch {
    return null;
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
      state.user = action.payload ? decodeJwtPayload(action.payload) : null;
      setAccessTokenInMemory(action.payload);
    },
    clearAuth(state) {
      state.accessToken = null;
      state.user = null;
      setAccessTokenInMemory(null);
    },
  },
});

export const { setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
