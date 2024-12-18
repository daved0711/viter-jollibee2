import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { imgPath } from "../../helpers/functions-general";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import ServerError from "@/components/partials/ServerError";

const SliderBanner = ({
  isLoadingAdvertisement,
  isFetchingAdvertisement,
  errorAdvertisement,
  dataAdvertisement,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    waitForAnimate: false,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <>
      <div className="relative h-[200px]">
        {(isFetchingAdvertisement || isLoadingAdvertisement) && (
          <FetchingSpinner />
        )}

        {errorAdvertisement && <ServerError />}
        <Slider {...settings}>
          {dataAdvertisement?.count > 0 &&
            dataAdvertisement?.data.map((item, key) => {
              return (
                <img
                  key={key}
                  src={`${imgPath}/${item.advertisement_image}`}
                  alt={item.advertisement_image}
                  className="h-[200px] object-cover object-center"
                />
              );
            })}
          {/* <img
            src={`${imgPath}/slider-1.jpg`}
            alt=""
            className="h-[200px] object-cover w-full"
          />
          <img
            src={`${imgPath}/slider-2.png`}
            alt=""
            className="h-[200px] object-cover w-full"
          />
          <img
            src={`${imgPath}/slider-3.jpg`}
            alt=""
            className=" object-cover w-full"
          /> */}
        </Slider>
      </div>
    </>
  );
};

export default SliderBanner;
