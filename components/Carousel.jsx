import React from "react";
import Slider from "react-slick";
import Title from "./ui/Title";

function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    appendDots: (dots) => (
      <div>
        <ul className="container mx-auto w-full text-start">{dots}</ul>
      </div>
    ),
  };

  return (
    <>
      <div className="-mt-[88px] h-screen bg-hero-bg-image bg-cover bg-no-repeat">
        <div className="relative top-52">
          {/* Slider Start */}
          <Slider {...settings}>
            {/* Slider Item */}
            <div>
              <div className="container mx-auto  text-white flex flex-col items-start gap-y-8">
                <Title addClass="text-5xl">Fast Food Restaurant</Title>
                <p className="text-sm sm:w-2/5 w-full">
                  Doloremque, itaque aperiam facilis rerum, commodi, temporibus
                  sapiente ad mollitia laborum quam quisquam esse error unde.
                  Tempora ex doloremque, labore, sunt repellat dolore, iste
                  magni quos nihil ducimus libero ipsam.
                </p>
                <button className="btn-primary">Order Now</button>
              </div>
            </div>

            <div>
              <div className="container mx-auto  text-white flex flex-col items-start gap-y-8">
                <Title addClass="text-5xl">Fast Food Restaurant</Title>
                <p className="text-sm sm:w-2/5 w-full">
                  Doloremque, itaque aperiam facilis rerum, commodi, temporibus
                  sapiente ad mollitia laborum quam quisquam esse error unde.
                  Tempora ex doloremque, labore, sunt repellat dolore, iste
                  magni quos nihil ducimus libero ipsam.
                </p>
                <button className="btn-primary">Order Now</button>
              </div>
            </div>

            <div>
              <div className="container mx-auto  text-white flex flex-col items-start gap-y-8">
                <Title addClass="text-5xl">Fast Food Restaurant</Title>
                <p className="text-sm sm:w-2/5 w-full">
                  Doloremque, itaque aperiam facilis rerum, commodi, temporibus
                  sapiente ad mollitia laborum quam quisquam esse error unde.
                  Tempora ex doloremque, labore, sunt repellat dolore, iste
                  magni quos nihil ducimus libero ipsam.
                </p>
                <button className="btn-primary">Order Now</button>
              </div>
            </div>

            <div>
              <div className="container mx-auto  text-white flex flex-col items-start gap-y-8">
                <Title addClass="text-5xl">Fast Food Restaurant</Title>
                <p className="text-sm sm:w-2/5 w-full">
                  Doloremque, itaque aperiam facilis rerum, commodi, temporibus
                  sapiente ad mollitia laborum quam quisquam esse error unde.
                  Tempora ex doloremque, labore, sunt repellat dolore, iste
                  magni quos nihil ducimus libero ipsam.
                </p>
                <button className="btn-primary">Order Now</button>
              </div>
            </div>

            {/* Slider Item */}
          </Slider>
          {/* Slider End */}
        </div>
      </div>
    </>
  );
}

export default Carousel;
