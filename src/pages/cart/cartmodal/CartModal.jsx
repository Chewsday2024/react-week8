import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";






import { delCartItem, editCart, selectCart, selectDiscountTotal, selectTransFee } from "../CRUD_Slice";




function CartModal () {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  const discountTotal = useSelector(selectDiscountTotal);

  const transFee = useSelector(selectTransFee);

  const nevigate = useNavigate();

  

  return (
    <div
      className="offcanvas offcanvas-end w-50"
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title fs-1" id="offcanvasRightLabel">購物車</h5>

        <button 
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          />
      </div>

      <div className="offcanvas-body">
        {cart.length === 0
          ? <h1 className="text-center">目前購物車內沒有物品！</h1>
          : <div className="row">
              <div className="col-md-5 bg-white py-6 px-5 w-100" style={{height: '100vh'}}>
                {cart.map( item => {
                  return <div className="d-flex mt-4 bg-light" key={item.product.id}>
                    <img src={item.product.imageUrl} alt={item.product.title} style={{minWidth: '25%', height: '120px', objectFit: 'cover'}} />

                    <div className="w-100 p-3 position-relative" >
                      <button 
                        className="btn position-absolute"
                        style={{top: '16px', right: '16px'}}
                        onClick={() => dispatch(delCartItem(item.id))}
                        >
                          <i className="fas fa-times" />
                      </button>

                      <p className="fw-bold fs-5 d-flex align-items-center gap-1">
                        {item.product.title} <span className="fs-6">${item.product.price}</span>
                      </p>

                      <p className="text-muted" style={{fontSize: '14px'}}>{item.product.description}</p>

                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="input-group w-50 align-items-center">
                          <div className="input-group-prepend pe-1">
                            <button 
                              className="btn border-0"
                              onClick={() => 
                                dispatch(editCart({
                                  itemId: item.id,
                                  productId: item.product.id,
                                  itemQty: item.qty - 1
                                }))
                              }
                              disabled={item.qty === 1}
                              >
                              <i className="fas fa-minus" />
                            </button>
                          </div>

                          <input
                            type="text"
                            className="form-control border-0 text-center my-auto shadow-none bg-light px-0"
                            value={item.qty.toLocaleString()}
                            onBlur={(e) => 
                              Number(e.target.value) !== item.qty &&
                              dispatch(editCart({
                              itemId: item.id,
                              productId: item.product.id,
                              itemQty: e.target.value
                              }))
                            }
                            onChange={(e) => 
                              !isNaN(e.target.value) && 
                              Number(e.target.value) !== 0 &&
                              dispatch(editCart({
                                itemId: item.id,
                                productId: item.product.id,
                                itemQty: e.target.value
                              }))
                            }
                            onKeyDown={(e) => 
                              e.key === 'Enter' && e.target.blur()
                            }
                            aria-label="Example text with button addon" aria-describedby="button-addon1"
                          />

                          <div className="input-group-append ps-1">
                            <button
                              className="btn"
                              onClick={() => 
                                dispatch(editCart({
                                  itemId: item.id,
                                  productId: item.product.id,
                                  itemQty: item.qty + 1
                                }))
                              }
                              >
                              <i className="fas fa-plus" />
                            </button>
                          </div>
                        </div>
                        <p className="mb-0 ms-auto">NT$ {item.final_total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                })}


                

                <div>
                  <table className="table mt-4 text-muted">
                    <tbody>
                      <tr>
                        <th scope="row" className="border-0 px-0 font-weight-normal">購物車總結：</th>
                        <td className="text-end border-0 px-0">NT$ {discountTotal.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">運送費用 1%：</th>
                        <td className="text-end border-0 px-0 pt-0">NT$ {transFee.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-between mt-4">
                    <p className="mb-0 h4 fw-bold">合計總結：</p>
                    <p className="mb-0 h4 fw-bold">NT$ {(discountTotal + transFee).toLocaleString()}</p>
                  </div>
                  <button
                    className="btn btn-dark btn-block mt-4 rounded-0 py-3"
                    onClick={() => nevigate('/cart')}
                    data-bs-dismiss="offcanvas"
                    >前往購物車
                  </button>
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  );
};

export default CartModal;