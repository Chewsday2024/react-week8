import { configureStore } from "@reduxjs/toolkit";


import productlistReducer from './pages/productlist/productlistSlice';
import CRUD_Reducer from './pages/cart/CRUD_Slice';
import checkoutReducer from './pages/checkout/checkoutSlice';



const store = configureStore({
  reducer:{
    productlist: productlistReducer,
    CRUD: CRUD_Reducer,
    checkout: checkoutReducer
  }
});



export default store;