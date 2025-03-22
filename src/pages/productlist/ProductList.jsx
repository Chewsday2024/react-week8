import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



import { fetchAllProducts, fetchfilteredProducts, selectAllProducts, selectFilteredProducts, selectPageInfo } from "./productlistSlice";





function ProductList () {
  const dispatch = useDispatch();

  const allProducts = useSelector(selectAllProducts);

  const filteredProducts = useSelector(selectFilteredProducts);

  const pageInfo = useSelector(selectPageInfo);


  const [selectedCategory, setSelectedCategory] = useState('全部');




  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchfilteredProducts(selectedCategory));
  }, [dispatch, selectedCategory]);


  

  const categories = ['全部',...new Set(allProducts.map( product => product.category))];

 


  return (
    <>
      <div className="d-flex justify-content-center border border-start-0 border-end-0 border-top border-bottom">
        <ul className="d-flex list-unstyled m-0">
          {categories.map( category => 
            <li key={category}>
              <button 
                className="btn p-0 mx-2 my-1"
                onClick={() => setSelectedCategory(category)}
                >
                {category}
              </button>
            </li>
          )}
        </ul>
      </div>


      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {filteredProducts.map( product => 
            <div className="col-md-3" key={product.id}>
              <div className="card border-0 mb-4 position-relative position-relative">
                <img src={product.imageUrl} className="card-img-top rounded-0" alt={product.title} />
                <button
                  className="
                    btn
                    text-dark
                    p-0
                    border-0
                    position-absolute
                  "
                  style={{right: '10px' , top: '8px'}}
                  >
                  <i className="far fa-heart" />
                </button>

                <div className="card-body p-0">
                  <h4>
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                  </h4>
                  <p className="card-text text-muted mb-0">{product.description}</p>
                  <p className="text-muted mt-3">NT$ {product.origin_price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>



        <div className={`d-flex justify-content-center ${pageInfo.total_pages === 1 && 'd-none'}`}>
          <nav>
            <ul className="pagination">
              <li className={`page-item ${!pageInfo.has_pre && 'disabled'}`}>
                <button onClick={() => pageInfo.current_page - 1} className="page-link">
                  上一頁
                </button>
              </li>

              
              {Array.from({ length: pageInfo.total_pages }).map(( _, index ) => (
                <li className={`page-item ${pageInfo.current_page === index + 1 && 'active'}`} key={index}>
                  <button onClick={() => index + 1} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
              
              
              <li className={`page-item ${!pageInfo.has_next && 'disabled'}`}>
                <button onClick={() => pageInfo.current_page + 1} className="page-link">
                  下一頁
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProductList;