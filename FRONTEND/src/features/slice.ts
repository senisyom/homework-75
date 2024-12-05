import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMessages, createMessage } from "./thunk";
import { RootState } from "../app/store";

interface IMessage {
  encoded: string;
}

interface IMessageState {
  items: IMessage[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IMessageState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectMessagesItems = (state: RootState) => state.messages.items;
export const selectFetchLoading = (state: RootState) =>
  state.messages.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
  state.messages.createLoading;

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<IMessage[]>) => {
          state.fetchLoading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchMessages.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(createMessage.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(
        createMessage.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.createLoading = false;
          state.items.push(action.payload);
        }
      )
      .addCase(createMessage.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const messagesReducer = messageSlice.reducer;
