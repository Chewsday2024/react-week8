import { createHashRouter } from "react-router-dom";




import App from "./App";
import Index from "./pages/index";
import ProductList from "./pages/productlist/ProductList";
import ProductDetail from "./pages/productdetail/ProductDetail";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/checkout/CheckOut";
import NotFound from "./pages/NotFound";
import CheckOutSuccess from "./pages/checkout/CheckOutSuccess";








const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: 'productlist',
        element: <ProductList />
      },
      {
        path: '/products/:id',
        element: <ProductDetail />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'checkout',
        element: <CheckOut />
      },
      {
        path: 'checkout/:orderId',
        element: <CheckOutSuccess />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);




export default router;