import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";




import { fetchAllProducts, selectAllProducts } from "../../productlist/productlistSlice";
import shuffle from "../../../helpers/shuffle";




function Rate () {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);

  const [randomRates, setRandomRates] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  useEffect(() => {
    setRandomRates(shuffle(allProducts).slice(0, 4));
  }, [allProducts]);



  return (
    <div className="bg-light mt-7">
      <Swiper navigation={true} modules={[Navigation]} loop={true} className="mySwiper w-50">
        {randomRates.map( rate => 
          <SwiperSlide key={rate.id}>
            <div className="row justify-content-center py-7">
              <div className="col-md-8 d-flex justify-content-center">
                <img src={rate.imageUrl} alt="" className="rounded-circle me-5" 
                style={{width: '160px', height: '160px', objectFit: 'cover'}} 
                />
                <div className="d-flex flex-column">
                  <p className="h5">{`“${rate.description}”`}</p>
                  <p className="mt-auto text-muted">{rate.content}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Rate;