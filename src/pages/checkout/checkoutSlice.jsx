import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
 
 
const initialState = { 
  order: [],
  orderId: '',
  orderTotal: 0,
  userInfo: {},
  status: 'idle',
  error: null
};
 
 
 
const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(checkoutCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.orderId = action.payload.orderId;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(getOrder.pending, state => {
        state.status = 'loading';
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.order = Object.values(action.payload.products).map( item => item);

        state.orderTotal = action.payload.total;

        state.userInfo = action.payload.user;


        state.orderId = '';
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});



export const checkoutCart = createAsyncThunk('checkout/checkoutCart', async ( data ) => {
  const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, {
    data: {
      user: {...data}
    }
  });

  return res.data;
});




export const getOrder = createAsyncThunk('checkout/getOrder', async ( orderId ) => {
  const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/order/${orderId}`);

Object.values(res.data.order.products).map( item => item);
  return res.data.order;
});




export const selectOrderId = state => state.checkout.orderId;

export const selectOrder = state => state.checkout.order;

export const selectOrderTotal = state => state.checkout.orderTotal;

export const selectUserInfo = state => state.checkout.userInfo;



export default checkoutSlice.reducer;