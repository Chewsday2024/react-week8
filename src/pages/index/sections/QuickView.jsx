import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



import { fetchAllProducts, selectAllProducts } from "../../productlist/productlistSlice";
import shuffle from "../../../helpers/shuffle";


function QuickView () {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);

  const [randomProducts, setRandomProducts] = useState([]);


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  

  useEffect(() => {
    setRandomProducts(shuffle(allProducts).slice(0, 4));
  }, [allProducts]);



  return (
    <div className="container">
      <div className="row mt-5">
        {randomProducts.map( product => 
          <div className="col-md-6 mt-md-4" key={product.id}>
            <div className="card border-0 mb-4 position-relative position-relative">
              <img
                src={product.imageUrl}
                className="card-img-top rounded-0"
                alt={product.title}
              />
              
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">{product.title}</h4>

                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    {product.description}
                  </p>

                  <Link to={`/products/${product.id}`} className="btn btn-outline-dark rounded-0 text-nowrap">
                    了解更多
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>  
  );
};

export default QuickView;