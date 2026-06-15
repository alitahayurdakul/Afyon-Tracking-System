import { createSlice } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";

export interface IToastElement {
  id: string;
  message: string | ReactNode;
  deadTime?: number;
  type?: "error" | "success" | "info";
  icon?: "close" | "announcement" | "success" | "favorite" | React.ReactElement;
  titleClassName?: string;
  link?:
    | {
        text: string;
        href: string;
      }
    | React.ReactElement;
  isClose?: boolean;
}

export interface ICommonState {
  phoneSize?: number;
}

const initialState: ICommonState = {
  phoneSize: undefined,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
        setPhoneSize(state, action: { payload: number | undefined }) {
      state.phoneSize = action.payload;
    },
  }
});

export const { setPhoneSize } =
  commonSlice.actions;

export default commonSlice.reducer;
