import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";




import CartModal from "../pages/cart/cartmodal/CartModal";
import { fetchCart } from "../pages/cart/CRUD_Slice";




function Header () {
  const dispatch = useDispatch();
  
  return (
    <>
      <div className="bg-white sticky-top">
        <div className="container">
          <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
            <Link className="navbar-brand position-absolute start-50 top-50 translate-middle">
              React-Week8
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link ps-0" to='productlist'>所有產品</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to='cart'>前往結帳</Link>
                </li>
              </ul>
            </div>
            <div className="d-flex gap-5">
              <button className="btn p-0">
                <i className="fas fa-heart" />
              </button>

              <button
                className="btn p-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                onClick={() => dispatch(fetchCart())}
                >
                <i className="fas fa-shopping-cart" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      

      <CartModal />

      <Toaster />
    </>
  );
};

export default Header;