import axiosApi from "../axiosApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const response = await axiosApi.get("/password");
    return response.data || [];
  }
);

export const createMessage = createAsyncThunk(
  "messages/createMessage",
  async (payload: { password: string; message: string }) => {
    const response = await axiosApi.post("/encode", payload);
    return response.data;
  }
);
