// import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';



import router from './router';
import store from './store';


import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/all.scss';


createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  //</StrictMode>,
)
