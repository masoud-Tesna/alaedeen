// import style file:
import './styles/ImageGallery.less';

// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";

import SwiperCore, {Navigation, Thumbs} from 'swiper';
import {useState} from "react";

// install Swiper modules
SwiperCore.use([Navigation,Thumbs]);

const ImageGallery = () => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      <Swiper style={{'--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff'}} spaceBetween={10} navigation={true} thumbs={{swiper: thumbsSwiper}} className="mySwiper2">
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/400/400"/>
        </SwiperSlide>
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true}
              className="mySwiper">
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://picsum.photos/200/200"/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageGallery;