import { useState } from "react";

// import style file:
import './styles/ImageGallery.less';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// import ant design components:
import { Col, Image, Row } from 'antd';

// Import Swiper styles
import "swiper/swiper.less";
import "swiper/modules/free-mode/free-mode.less";
import "swiper/modules/thumbs/thumbs.less";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Thumbs } from 'swiper';
import ShowResponsiveImage from "./ShowResponsiveImage";

// install Swiper modules
SwiperCore.use([ FreeMode, Thumbs ]);

const ImageGallery = ({ images }) => {

  const [ thumbsSwiper, setThumbsSwiper ] = useState(null);

  return (
    <Row className="imageGallery--container">
      {images !== undefined && Object.values(images)?.length > 1 ?
        <Col span={ 24 }>
          <Image.PreviewGroup>
            <Swiper
              spaceBetween={ 5 }
              navigation={ false }
              thumbs={ { swiper: thumbsSwiper } }
              className="imageGallery--swiper"
            >
              { Object.values(images)?.map(image => {
                return (
                  <SwiperSlide key={ image?.pair_id }>
                    <ShowResponsiveImage
                      imagePath={ image?.detailed?.image_path }
                      imageFolder='detailed'
                      width={ 300 }
                      height={ 300 }
                      skeletonWidth="100%"
                      skeletonHeight="350px"
                      imageAlt={ image?.detailed?.alt }
                      object_id={ image?.pair_id }
                      object_type="prd"
                      preview
                    />
                  </SwiperSlide>
                );
              }) }
            </Swiper>
          </Image.PreviewGroup>
          <Swiper
            onSwiper={ setThumbsSwiper }
            spaceBetween={ 15 }
            slidesPerView={ "auto" }
            freeMode={ true }
            watchSlidesProgress={ true }
            className="imageGallery--thumbnailsSwiper">
            { Object.values(images)?.map(image => {
              return (
                <SwiperSlide key={ image?.pair_id }>
                  <ShowResponsiveImage
                    imagePath={ image?.detailed?.image_path }
                    imageFolder='detailed'
                    width={ 68 }
                    height={ 68 }
                    skeletonWidth="68px"
                    skeletonHeight="68px"
                    imageAlt={ image?.detailed?.alt }
                    object_id={ `thumbs_${ image?.pair_id }` }
                    object_type="prd"
                  />
                </SwiperSlide>
              );
            }) }
          </Swiper>
        </Col> :

        images !== undefined && Object.values(images)?.length === 1 ?
          <Col span={24} className="imageGallery--oneImage">
            { images?.map(image => {
              return (
                <ShowResponsiveImage
                  imagePath={ image?.detailed?.image_path }
                  imageFolder='detailed'
                  width={ 300 }
                  height={ 300 }
                  imageAlt={ image?.detailed?.alt }
                  object_id={ image?.pair_id }
                  object_type="prd"
                  preview
                />
              );
            }) }
          </Col> :

          images !== undefined && !Object.values(images)?.length &&
            <Col span={24} className="imageGallery--oneImage">
              <ShowResponsiveImage
                imagePath=""
                skeletonWidth="100%"
                skeletonHeight="350px"
              />
            </Col>
      }
    </Row>
  );
};

export default ImageGallery;