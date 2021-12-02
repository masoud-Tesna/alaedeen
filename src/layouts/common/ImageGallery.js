import {useState} from "react";

// import style file:
import './styles/ImageGallery.less';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// import ant design components:
import { Image } from 'antd';

// Import Swiper styles
import "swiper/swiper.less";
import "swiper/modules/free-mode/free-mode.less";
import "swiper/modules/thumbs/thumbs.less";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Thumbs } from 'swiper';

// install Swiper modules
SwiperCore.use([FreeMode, Thumbs]);

const ImageGallery = () => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <h1>images</h1>
  );
};

export default ImageGallery;