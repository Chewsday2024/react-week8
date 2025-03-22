import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
 
 
 
const initialState = { 
  allProducts: [],
  filteredProducts: [],
  pageInfo: {},
  status: 'idle',
  error: null
};
 
 
 
const productlistSlice = createSlice({
  name: 'productlist',
  initialState,
  reducers: {
    
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(fetchAllProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.allProducts = [...action.payload.products];
        state.pageInfo = {...action.payload.pagination};
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })


      .addCase(fetchfilteredProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchfilteredProducts.fulfilled, (state, action) => {
        state.status = 'succeed';

        state.filteredProducts = [...action.payload.products];
      })
      .addCase(fetchfilteredProducts.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});



export const fetchAllProducts = createAsyncThunk('productlist/fetchAllProducts', async () => {
  const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
  
  return res.data ;
});


export const fetchfilteredProducts = createAsyncThunk('productlist/filteredProducts', async ( selectedCategory ) => {
  const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products?category=${selectedCategory === '全部' ? '' : selectedCategory}`);
  
  return res.data ;
})







export const selectAllProducts = state => state.productlist.allProducts;

export const selectFilteredProducts = state => state.productlist.filteredProducts;

export const selectPageInfo = state => state.productlist.pageInfo;



export default productlistSlice.reducer;