// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Pagination } from "swiper/modules";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <section>
      <SectionTitle 
      heading={"Category Of 'Pets'"}
      ></SectionTitle>

      <div className="mt-20 mb-20 h-[380px]">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://img.freepik.com/premium-photo/group-cute-cats-are-gathered-together_180947-198.jpg"
              alt=""
            />
            <h3 className="text-6xl text-center uppercase fixed mt-[300px] text-white shadow-slate-900">
            <Link to={'/petListing'}><button className="btn">Cats</button></Link>
            </h3>
          </SwiperSlide>

          <SwiperSlide>
            <img src="https://w0.peakpx.com/wallpaper/266/456/HD-wallpaper-cute-dogs-cute-pet-group-dogs-dog.jpg" alt="" />
            <h3 className="text-6xl text-center uppercase fixed mt-[300px] text-white shadow-slate-900">
            <Link to={'/petListing'}><button className="btn">Dogs</button></Link>
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://img.freepik.com/free-photo/rabbit-with-pink-tongue-is-sitting-brown-background_1340-24078.jpg" alt="" />
            <h3 className="text-6xl text-center uppercase fixed mt-[300px] text-white shadow-slate-900">
            <Link to={'/petListing'}><button className="btn">Rabbit</button></Link>
            </h3>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://cdn.cdnparenting.com/articles/2019/02/07115103/393732661-H-1024x700.webp" alt="" />
            <h3 className="text-6xl text-center uppercase fixed mt-[300px] text-white shadow-slate-900">
            <Link to={'/petListing'}><button className="btn">Fish</button></Link>
            </h3>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Category;
