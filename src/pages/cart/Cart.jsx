import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, delCartItem, editCart, fetchCart, selectCart, selectDiscountTotal, selectTransFee } from "./CRUD_Slice";
import { useEffect } from "react";








function Cart () {
  const dispatch = useDispatch();

  const cart = useSelector(selectCart);

  const discountTotal = useSelector(selectDiscountTotal);

  const transFee = useSelector(selectTransFee);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch])

  return (
    <>
      <div className="container vh-100">
        <div className="row justify-content-center">
          {cart.length === 0
            ? <div className="d-flex justify-content-center align-items-center vh-100">
                <h1>目前購物車內沒有物品！</h1>
              </div>
            : <div className="col-md-6 bg-white py-5" style={{'minHeight': 'calc(100vh - 56px - 76px)'}}>
                <div className="d-flex justify-content-between">
                  <h2 className="mt-2">你的購物車</h2>
                </div>
    
    
                {cart.map( item => 
                  <div className="d-flex mt-4 bg-light" key={item.id}>
                    <img src={item.product.imageUrl} alt={item.product.title}
                    style={{'width': '120px', 'height': '120px', 'objectFit': 'cover'}}
                    />
                    <div className="w-100 p-3 position-relative">
                      <button
                        className="btn border-0 p-0 position-absolute" 
                        style={{'top': '16px', 'right': '16px'}}
                        onClick={() => dispatch(delCartItem(item.id))}
                      >
                        <i className="fas fa-times" />
                      </button>
    
                      <p className="mb-0 fw-bold">{item.product.title}</p>
    
                      <p
                        className="mb-1 text-muted" 
                        style={{'fontSize': '14px'}}
                      >
                        {item.product.description}
                      </p>
    
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="input-group w-50 align-items-center">
                          <div className="input-group-prepend pe-1">
                            <button 
                              className="btn border-0 p-0"
                              onClick={() =>
                                dispatch(editCart({
                                  itemId: item.id,
                                  productId: item.product.id,
                                  itemQty: item.qty - 1
                                }))
                              }
                            >
                              <i className="fas fa-minus" />
                            </button>
                          </div>
    
                          <input
                            type="text"
                            className="form-control border-0 text-center my-auto shadow-none bg-light px-0"
                            value={item.qty.toLocaleString()}
                            onChange={(e) =>
                              !isNaN(e.target.value) &&
                              Number(e.target.value) !== 0 &&
                              dispatch(editCart({
                                itemId: item.id,
                                productId: item.product.id,
                                itemQty: e.target.value
                              }))
                            }
                            onBlur={(e) =>
                              Number(e.target.value) !== item.qty &&
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
                              className="btn border-0 p-0"
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
                )}
    
                
    
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

                <div className="d-flex justify-content-between mt-4">
                  <Link to='/checkout' className="btn btn-dark rounded-0 py-3">前往結帳</Link>

                  <button
                    className="btn btn-danger rounded-0 py-3"
                    onClick={() => dispatch(clearCart())}
                    >
                      清空購物車
                  </button>
                </div>
              </div>
            }
            
          </div>
        </div>
    </>
  );
};

export default Cart;