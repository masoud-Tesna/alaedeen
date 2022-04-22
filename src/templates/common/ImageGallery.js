import { useState } from "react";

// import style file:
import './styles/ImageGallery.less';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import ant design components:
import { Col, Image, Row } from 'antd';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Thumbs } from 'swiper';
import ShowResponsiveImage from "./ShowResponsiveImage";

// install Swiper modules
SwiperCore.use([ FreeMode, Thumbs ]);

const ImageGallery = (
  {
    images = {},
    type = "product",
    id
  }
) => {

  const [ thumbsSwiper, setThumbsSwiper ] = useState(null);

  return (
    <Row className="imageGallery--container">
      {type === "product" ?
        (
          Object.values(images)?.length > 1 ?
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
                      <SwiperSlide key={ `ImageGallery_${id}_${image?.pair_id}` }>
                        <ShowResponsiveImage
                          imagePath={ image?.detailed?.image_path }
                          imageFolder='detailed'
                          width={ 300 }
                          height={ 300 }
                          skeletonWidth="100%"
                          skeletonHeight="350px"
                          imageAlt={ image?.detailed?.alt }
                          object_id={ `${image?.pair_id}_${id}` }
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
                    <SwiperSlide key={ `ImageGallery_thumbnail_${id}_${image?.pair_id}` }>
                      <ShowResponsiveImage
                        imagePath={ image?.detailed?.image_path }
                        imageFolder='detailed'
                        width={ 68 }
                        height={ 68 }
                        skeletonWidth="68px"
                        skeletonHeight="68px"
                        imageAlt={ image?.detailed?.alt }
                        object_id={ `thumbs_${ image?.pair_id }_${id}` }
                        object_type="prd"
                      />
                    </SwiperSlide>
                  );
                }) }
              </Swiper>
            </Col> :
    
            Object.values(images)?.length === 1 ?
              <Col span={24} className="imageGallery--oneImage">
                { images?.map(image => {
                  return (
                    <ShowResponsiveImage
                      key={ `ImageGallery_${id}_${image?.pair_id}` }
                      imagePath={ image?.detailed?.image_path }
                      imageFolder='detailed'
                      width={ 300 }
                      height={ 300 }
                      imageAlt={ image?.detailed?.alt }
                      object_id={ `${image?.pair_id}_${id}` }
                      object_type="prd"
                      preview
                    />
                  );
                }) }
              </Col> :
      
              !Object.values(images)?.length &&
              <Col span={24} className="imageGallery--oneImage">
                <ShowResponsiveImage
                  imagePath=""
                  skeletonWidth="100%"
                  skeletonHeight="350px"
                />
              </Col>
        ) :
        (
          Object.values(images)?.length > 1 ?
            <Col span={ 24 }>
              <Image.PreviewGroup>
                <Swiper
                  spaceBetween={ 5 }
                  navigation={ false }
                  thumbs={ { swiper: thumbsSwiper } }
                  className="imageGallery--swiper"
                >
                  { Object.values(images)?.map((image, i) => {
                    return (
                      <SwiperSlide key={ `ImageGallery_${id}_${i}` }>
                        <ShowResponsiveImage
                          imagePath={ image }
                          imageFolder='profiles'
                          width={ 400 }
                          height={ 400 }
                          skeletonWidth="100%"
                          skeletonHeight="350px"
                          object_id={ `${i}_${id}` }
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
                { Object.values(images)?.map((image, i) => {
                  return (
                    <SwiperSlide key={ `ImageGallery_thumbnail_${id}_${i}` }>
                      <ShowResponsiveImage
                        imagePath={ image }
                        imageFolder='profiles'
                        width={ 68 }
                        height={ 68 }
                        skeletonWidth="68px"
                        skeletonHeight="68px"
                        object_id={ `thumbs_${ i }_${id}` }
                        object_type="prd"
                      />
                    </SwiperSlide>
                  );
                }) }
              </Swiper>
            </Col> :
    
            Object.values(images)?.length === 1 ?
              <Col span={24} className="imageGallery--oneImage">
                { images?.map((image, i) => {
                  return (
                    <ShowResponsiveImage
                      key={ `ImageGallery_${id}_${i}` }
                      imagePath={ image }
                      imageFolder='profiles'
                      width={ 300 }
                      height={ 300 }
                      object_id={ `${ i }_${id}` }
                      object_type="prd"
                      preview
                    />
                  );
                }) }
              </Col> :
      
              !Object.values(images)?.length &&
              <Col span={24} className="imageGallery--oneImage">
                <ShowResponsiveImage
                  imagePath=""
                  skeletonWidth="100%"
                  skeletonHeight="350px"
                />
              </Col>
        )
      }
    </Row>
  );
};

export default ImageGallery;