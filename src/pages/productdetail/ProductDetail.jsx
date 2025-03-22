import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCart } from "../cart/CRUD_Slice";



const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;




function ProductDetail () {
  const dispatch = useDispatch();

  const { id } = useParams();
  
  const [product, setProduct] = useState({});


  const [amount, setAmount] = useState(1);


  const fetchProduct = async ( id ) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);

      setProduct(res.data.product);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchProduct(id);
  }, [id]);


  return (
    <>
      <div className="container">
        <div style={{
          minHeight: '600px', 
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'}}
        />

        <div className="row justify-content-between mt-4 mb-7">
          <div className="col-md-7">
            <h2 className="mb-0">
              {product.title}
            </h2>

            <p className="fw-bold">
              NT$ ${product.origin_price?.toLocaleString()}
            </p>

            <p>
              {product.content}
            </p>

            <div className="my-4">
              {product.imagesUrl?.map( (img, index) => <img key={index} src={img} alt={img} className="img-fluid mt-4" />)}
            </div>

            <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
              <div className="card border-0">
                <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">
                      Lorem ipsum
                    </h4>
                    <i className="fas fa-minus" />
                  </div>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="card-body pb-5">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                  </div>
                </div>
              </div>

              <div className="card border-0">
                <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">
                      Lorem ipsum
                    </h4>
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="card-body pb-5">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                  </div>
                </div>
              </div>

              <div className="card border-0">
                <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingThree" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <h4 className="mb-0">
                      Lorem ipsum
                    </h4>
                    <i className="fas fa-plus"></i>
                  </div>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="card-body pb-5">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="input-group mb-3 border mt-3">
              <div className="input-group-prepend">
                <button
                  className="btn btn-outline-dark rounded-0 border-0 py-3" 
                  type="button"
                  id="button-addon1"
                  onClick={() => setAmount(amount - 1)}
                  disabled={amount <= 0}
                  >
                  <i className="fas fa-minus" />
                </button>
              </div>

              <input
                type="text"
                className="form-control border-0 text-center my-auto mx-1 p-0 shadow-none"
                value={amount}
                onBlur={(e) => e.target.value === '' && setAmount(0)}
                onChange={(e) => setAmount(
                  isNaN(e.target.value) ? ''
                                        : Number(e.target.value))}
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />

              <div className="input-group-append">
                <button
                  className="btn btn-outline-dark rounded-0 border-0 py-3"
                  type="button"
                  id="button-addon2"
                  onClick={() => setAmount(amount + 1)}
                  >
                  <i className="fas fa-plus" />
                </button>
              </div>
            </div>

            <button
              className="btn btn-dark btn-block rounded-0 py-3"
              onClick={() => dispatch(addCart({id: product.id, qty: amount}))}
              >加入購物車</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;