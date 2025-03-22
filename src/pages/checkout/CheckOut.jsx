import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";



import { fetchCart, selectCart, selectDiscountTotal } from "../cart/CRUD_Slice";
import { checkoutCart, selectOrderId } from "./checkoutSlice";



function CheckOut () {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cart = useSelector(selectCart);

  const orderId = useSelector(selectOrderId);

  const discountTotal = useSelector(selectDiscountTotal);

  

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);


  useEffect(() => {
    orderId !== '' && navigate(`${orderId}`);
  }, [orderId, navigate])


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: { payment: 'WebATM'}
  });


  const payment = watch('payment');


  const cities = [
    "台北市", "新北市", "桃園市", "台中市",
    "台南市", "高雄市", "基隆市", "新竹市",
    "嘉義市", "新竹縣", "苗栗縣", "彰化縣",
    "南投縣", "雲林縣", "嘉義縣", "屏東縣",
    "宜蘭縣", "花蓮縣", "台東縣", "澎湖縣",
    "金門縣", "連江縣"
  ];


  const onSubmit = handleSubmit( data => {
    dispatch(checkoutCart(data));
   
    reset();
  });

  return (
    <>
      <div className="bg-light pt-5 pb-7">
        <div className="container">
          <div className="row justify-content-center flex-md-row flex-column-reverse">
            <div className="col-md-6">
              <div className="bg-white p-4">
                <h4 className="fw-bold">1. 聯絡表單</h4>

                <p className="mt-4">聯絡資訊</p>

                <form>
                  <div className="mb-2">
                    <label htmlFor="email" className="text-muted mb-0 form-label">
                      Email
                    </label>

                    <input
                      {...register('email', {
                        required: 'Email 欄位必填！',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Email 格式錯誤！'
                        }})
                      }
                      type="email"
                      name="email"
                      id="email"
                      className={`form-control rounded-0 ${errors.email && 'is-invalid'}`}
                      placeholder="請輸入 Email"
                    />

                    {errors.email && 
                      <p className="text-danger my-2">
                        {errors.email.message}
                      </p>
                    }
                  </div>

                  <div className="mb-2">
                    <label htmlFor="name" className="text-muted mb-0 form-label">
                      姓名
                    </label>

                    <input
                      {...register('name', {
                        required: '姓名欄位必填！'
                      })}
                      type="text"
                      name="name"
                      className={`form-control rounded-0 ${errors.name && 'is-invalid'}`}
                      id="name"
                      placeholder="請輸入姓名"
                    />

                    {errors.name && 
                      <p className="text-danger my-2">
                        {errors.name.message}
                      </p>
                    }
                  </div>

                  <div className="">
                    <label htmlFor="ContactPhone" className="text-muted mb-0 form-label">
                      電話
                    </label>

                    <input
                      {...register('tel', {
                        required: '電話欄位必填！',
                        pattern: {
                          value: /^(0[2-8]\d{7}|09\d{8})$/,
                          message: '電話格式錯誤！'
                        }})
                      }
                      type="tel"
                      name="tel"
                      className={`form-control rounded-0 ${errors.tel && 'is-invalid'}`}
                      id="tel"
                      placeholder="請輸入電話"
                    />


                    {errors.tel && 
                      <p className="text-danger my-2">
                        {errors.tel.message}
                      </p>
                    }
                  </div>
                </form>
              </div>

              <div className="bg-white p-4 mt-3">
                <h4 className="fw-bold">2. 運送資訊表單</h4>

                <form>
                  <p className="mt-4 mb-3">運送地址</p>

                  <div className="form-row">
                    <div className="col mb-2">
                      <select
                        {...register('country', {
                          required: '請選擇國家 / 地區！'
                        })}
                        id="country"
                        className={`form-select rounded-0 ${errors.country && 'is-invalid'}`}
                        >
                        <option value=''>國家 / 地區</option>

                        <option value={'臺灣'}>臺灣</option>
                      </select>

                      {errors.country && 
                        <p className="text-danger my-2">
                          {errors.country.message}
                        </p>
                      }
                    </div>

                    <div className="col mb-2">
                      <select
                        {...register('state', {
                          required: '請選擇縣市！'
                        })}
                        id="state"
                        className={`form-select rounded-0 ${errors.state && 'is-invalid'}`}
                        >
                        <option value=''>請選擇縣市</option>

                        {cities.map( city => 
                          <option key={city} value={city}>{city}</option>
                        )}
                      </select>


                      {errors.state && 
                        <p className="text-danger my-2">
                          {errors.state.message}
                        </p>
                      }
                    </div>
                  </div>


                  <div>
                    <input
                      {...register('address', {
                        required: '地址欄位必填！'
                      })}
                      type="text"
                      className={`form-control rounded-0 mt-1 ${errors.address && 'is-invalid'}`} id="address"
                      placeholder="地址"
                    />

                    {errors.address && 
                      <p className="text-danger my-2">
                        {errors.address.message}
                      </p>
                    }
                  </div>

                  <p className="mt-4 mb-2">付款方式</p>

                  <div className="form-check mb-2">
                    <input
                      {...register('payment')}
                      value='WebATM'
                      className="form-check-input"
                      type="radio"
                      id='WebATM'
                    />

                    <label
                      className="form-check-label text-muted" htmlFor="WebATM"
                      >
                      WebATM
                    </label>
                  </div>

                  <div className="form-check mb-2">
                    <input
                      {...register('payment')}
                      value='ATM'
                      className="form-check-input"
                      type="radio"
                      id='ATM'
                    />

                    <label
                      className="form-check-label text-muted"
                      htmlFor="ATM"
                      >
                      ATM
                    </label>
                  </div>

                  <div className="form-check mb-2">
                    <input
                      {...register('payment')}
                      value='ApplePay'
                      className="form-check-input"
                      type="radio"
                      id='ApplePay'
                    />

                    <label
                    className="form-check-label text-muted"
                    htmlFor="ApplePay"
                    >
                    ApplePay
                    </label>
                  </div>
                </form>
              </div>

              <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100 mb-3">
                <Link to='/productlist' className="text-dark mt-md-0 mt-3">
                  <i className="fas fa-chevron-left me-2" /> 回到所有商品
                </Link>

                <button
                  type="sumbit"
                  className="btn btn-dark py-3 px-7 rounded-0"
                  onClick={onSubmit}
                  >
                  送出訂單
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="mb-4">訂單明細</h4>

                {cart.map( item => 
                  <div className="d-flex mb-2" key={item.id}>
                    <img src={item.product.imageUrl} alt="" className="me-2" 
                    style={{'width': '48px', 'height': '48px', 'objectFit': 'cover'}}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{item.product.title}</p>
                        <p className="mb-0">x{item.qty.toLocaleString()}</p>
                      </div>
                      
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0"><small>NT$ {item.product.price.toLocaleString()}</small></p>
                        <p className="mb-0">NT$ {item.final_total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
                

                <table className="table mt-4 border-top border-bottom text-muted">
                  <tbody>
                    <tr>
                      <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">
                        總計：
                      </th>

                      <td className="text-end border-0 px-0 pt-4">
                        NT$ {discountTotal.toLocaleString()}
                      </td>
                    </tr>

                    <tr>
                      <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">
                        付款方式：
                      </th>

                      <td className="text-end border-0 px-0 pt-0 pb-4">
                        {payment}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">訂單總計：</p>

                  <p className="mb-0 h4 fw-bold">NT$ {discountTotal.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;