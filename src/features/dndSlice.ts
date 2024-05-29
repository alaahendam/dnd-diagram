import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TDraggableItem, TRelation } from "@/types/Dnd";

type TLayout = {
  draggableItems: TDraggableItem[];
  selectedItems: number[];
  relations: TRelation[];
};

const initialState: TLayout = {
  draggableItems: [],
  selectedItems: [],
  relations: [],
};

export const dndSlice = createSlice({
  name: "dnd",
  initialState,
  reducers: {
    setDraggableItems: (state, action: PayloadAction<TDraggableItem[]>) => {
      state.draggableItems = action.payload;
    },

    addToDraggableItems: (state, action: PayloadAction<TDraggableItem>) => {
      state.draggableItems = [...state.draggableItems, action.payload];
    },
    deleteDraggableItem: (state, action: PayloadAction<number>) => {
      state.draggableItems = state.draggableItems.filter(
        (item) => item.id != action.payload
      );
    },
    setSelectedItems: (state, action: PayloadAction<number[]>) => {
      state.selectedItems = action.payload;
      if (action.payload.length > 1) {
        if (
          state.relations.find(
            (item) =>
              item.start == `${action.payload[0]}` &&
              item.end == `${action.payload[1]}`
          )
        ) {
          state.relations = state.relations.filter(
            (item) =>
              item.start != `${action.payload[0]}` &&
              item.end != `${action.payload[1]}`
          );
        } else {
          state.relations = [
            ...state.relations,
            { start: `${action.payload[0]}`, end: `${action.payload[1]}` },
          ];
        }
        state.selectedItems = [];
      }
    },

    deleteSelectedItems: (state) => {
      state.draggableItems = state.draggableItems.filter(
        (draggableItems) => !state.selectedItems.includes(draggableItems.id)
      );
      state.selectedItems = [];
    },

    resetLayout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addToDraggableItems,
  setDraggableItems,
  setSelectedItems,
  deleteSelectedItems,
  resetLayout,
  deleteDraggableItem,
} = dndSlice.actions;

export default dndSlice.reducer;
