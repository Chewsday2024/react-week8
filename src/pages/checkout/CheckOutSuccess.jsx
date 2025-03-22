import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";


import { getOrder, selectOrder, selectOrderTotal, selectUserInfo } from "./checkoutSlice";






function CheckOutSuccess () {
  const dispatch = useDispatch();

  const { orderId } = useParams();

  const order = useSelector(selectOrder);

  const orderTotal = useSelector(selectOrderTotal);

  const userInfo = useSelector(selectUserInfo);


  useEffect(() => {
    dispatch(getOrder(orderId));
  }, [dispatch]);


  return (
    <>
      <div className="container vh-100">
        <div style={{
          'minHeight': '400px', 
          'backgroundImage': 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
          'backgroundPosition': 'center center'}} 
        />
        
        <div className="mt-5 mb-7">
          <div className="row">
            <div className="col-md-6">
              <h2>完成訂單！</h2>

              <p>
                感謝購買！
                召喚峽谷感謝有你！
              </p>

              <Link
                className="btn btn-outline-dark rounded-0 mt-4"
                to='/'
                >
                回到首頁
              </Link>
            </div>

            <div className="col-md-6">
              <div className="card rounded-0 py-4">
                <div className="card-header border-bottom-0 bg-white px-4 py-0">
                  <h2>訂單明細</h2>
                </div>

                <div className="card-body px-4 py-0">
                  <ul className="list-group list-group-flush">
                    {order.map( item => 
                      <li className="list-group-item px-0" key={item.id}>
                        <div className="d-flex mt-2">
                          <img src={item.product.imageUrl} alt={item.product.title} className="me-2" style={{'width': '60px', 'height': '60px', 'objectFit': 'cover'}} />

                          <div className="w-100 d-flex flex-column">
                            <div className="d-flex justify-content-between fw-bold">
                              <h5>{item.product.title}</h5>

                              <p className="mb-0">x {item.qty.toLocaleString()}</p>
                            </div>

                            <div className="d-flex justify-content-between mt-auto">
                              <p className="text-muted mb-0">
                                <small>NT$ {item.product.price.toLocaleString()}</small>
                              </p>

                              <p className="mb-0">NT$ {item.final_total.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}

                    <li className="list-group-item px-0 pb-0">
                      <table className="table text-muted">
                        <tbody>
                          <tr>
                            <th scope="row" className="border-0 px-0 font-weight-normal">
                              總計：
                            </th>

                            <td className="text-end border-0 px-0">
                              NT$ {orderTotal.toLocaleString()}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">
                              付款方式：
                            </th>

                            <td className="text-end border-0 px-0 pt-0">
                              {userInfo.payment}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="d-flex justify-content-between mt-2">
                        <p className="mb-0 h4 fw-bold">訂單總計：</p>

                        <p className="mb-0 h4 fw-bold">NT$ {orderTotal.toLocaleString()}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutSuccess;