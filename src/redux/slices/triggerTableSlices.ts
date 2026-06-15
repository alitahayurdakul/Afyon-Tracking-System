import { createSlice } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";

export interface ITableTriggerTypes {
    triggerTrainTableTrigger: number
}

const initialState: ITableTriggerTypes = {
    triggerTrainTableTrigger: 0
};

export const tableTriggerSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        addTriggerTable(state) {
            state.triggerTrainTableTrigger = state.triggerTrainTableTrigger + 1;
        }
    }
});

export const { addTriggerTable } =
    tableTriggerSlice.actions;

export default tableTriggerSlice.reducer;
