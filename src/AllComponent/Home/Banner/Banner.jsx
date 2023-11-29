// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <div className="h-[640px]">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper "
      >
        <SwiperSlide>
          <img
            className=""
            src="https://www.dailypaws.com/thmb/2fXJfErNXwzcYxxhefZdxmIljbU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/woman-hugging-mutt-1226217094-2000-f22ac7554bf44d08a071ee3939e22c78.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className=""
            src="https://cdn.buttercms.com/zBJG6HQjGVouHl6SnXLg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className=""
            src="https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-animal-pet-blue-pink-simple-cartoon-image_782332.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            
            src="https://t4.ftcdn.net/jpg/05/98/84/51/360_F_598845130_61Ji4HYfyaq8Et1nAbQzQTN6SOiBtrGQ.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
