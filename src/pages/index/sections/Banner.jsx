import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";



import { fetchAllProducts, selectAllProducts } from "../../productlist/productlistSlice";
import shuffle from "../../../helpers/shuffle";





function Banner () {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);

  const [carouselImgs, setCarouselImgs] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);


  useEffect(() => {
    setCarouselImgs(shuffle(allProducts).slice(0, 5).map( item => item.imageUrl));
  }, [allProducts]);


  return (
    <div className="container">
      <div className="row flex-md-row-reverse flex-column">
        <div className="col-md-6">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {carouselImgs.map( (img, index) =>
              <SwiperSlide key={index}>
                <img src={img} className="img-fluid" alt={img} />
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
          <h2 className="fw-bold">Lorem ipsum dolor sit</h2>
          <h5 className="font-weight-normal text-muted mt-2">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor
          </h5>
          <div className="input-group mb-0 mt-4">
            <input type="text" className="form-control rounded-0" placeholder="" />
            <div className="input-group-append">
              <button className="btn btn-dark rounded-0" type="button" id="search">
                Lorem ipsum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;