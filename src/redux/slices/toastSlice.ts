import React, { ReactNode } from "react";

import { createSlice } from "@reduxjs/toolkit";

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

export interface IToastState {
  elements: IToastElement[];
}

const initialState: IToastState = {
  elements: []
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToastify(state, action: { payload: IToastElement }) {
      state.elements = [...state.elements, action.payload];
    },

    removeToastify(state, action: { payload: string }) {
      state.elements = state.elements.filter(
        (element) => element.id !== action.payload
      );
    },
    clearToastify(state) {
      state.elements = [];
    }
  }
});

export const { addToastify, removeToastify, clearToastify } =
  toastSlice.actions;

export default toastSlice.reducer;
