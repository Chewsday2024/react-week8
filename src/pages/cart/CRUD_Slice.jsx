import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
 
 
 
 
const initialState = {
  cart: [],
  originTotal: 0,
  discountTotal: 0,
  transFee: 0,
  status: 'idle',
  error: null
};
 
 
 
const CRUD_Slice = createSlice({
  name: 'CRUD',
  initialState,
  reducers: {
    
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(fetchCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.cart = [...action.payload || []] ;

        state.discountTotal = action.payload.reduce((total, cart) => total + cart.total, 0) || 0;

        state.originTotal = action.payload.reduce((total, cart) => total + (cart.product.origin_price * cart.qty), 0) || 0;

        state.transFee = Math.round(state.discountTotal / 100);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(addCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.status = 'succeed';

        toast.success(`${action.payload.message} 🎊`);
      })
      .addCase(addCart.rejected, (state, action) => {
        state.status = 'failed';
        toast.error(action.error.message)

        state.error = action.error.message;
      })



      .addCase(editCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(editCart.fulfilled, (state, action) => {
        state.status = 'succeed';

        toast.success(action.payload.message);
      })
      .addCase(editCart.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(delCartItem.pending, state => {
        state.status = 'loading';
      })
      .addCase(delCartItem.fulfilled, (state, action) => {
        state.status = 'succeed';

        toast.success(action.payload.message);
      })
      .addCase(delCartItem.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })



      .addCase(clearCart.pending, state => {
        state.status = 'loading';
      })
      .addCase(clearCart.fulfilled, state => {
        state.status = 'succeed';

        toast.success('已清空購物車！');
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});




export const fetchCart = createAsyncThunk('CRUD/fetchCart', async () => {
  const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);

  return res.data.data.carts;
});




export const addCart = createAsyncThunk('CRUD/addCart', async ({ id, qty }) => {
  const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
    data: {
      product_id: id,
      qty: Number(qty)
    }
  });

  return res.data;
});





export const editCart = createAsyncThunk('CRUD/editCart', async ({ itemId, productId, itemQty }, { dispatch }) => {
  const res = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${itemId}`, {
    data: {
      product_id: productId,
      qty: Number(itemQty)
    }
  });

  dispatch(fetchCart());

  return res.data;
});





export const delCartItem = createAsyncThunk('CRUD/delCartItem', async ( itemId, { dispatch } ) => {
  const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${itemId}`);

  dispatch(fetchCart());

  return res.data;
});




export const clearCart = createAsyncThunk('CRUD/clearCart', async ( _, { dispatch }) => {
  await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);

  dispatch(fetchCart());
})




export const selectCart = state => state.CRUD.cart;

export const selectOriginTotal = state => state.CRUD.originTotal;

export const selectDiscountTotal = state => state.CRUD.discountTotal;

export const selectTransFee = state => state.CRUD.transFee;






export default CRUD_Slice.reducer;