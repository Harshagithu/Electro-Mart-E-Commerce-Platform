import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const placeOrder = createAsyncThunk("orders/place", async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
});

export const fetchOrders = createAsyncThunk("orders/fetchByUser", async (userId) => {
  const res = await api.get(`/orders?userId=${userId}`);
  return res.data;
});

const orderSlice = createSlice({
  name: "orders",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      });
  },
});

export default orderSlice.reducer;
