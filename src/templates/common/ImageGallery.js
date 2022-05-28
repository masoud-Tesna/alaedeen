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
      {
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
              
                    const imagePath = type === "product" ? image?.detailed?.image_path : image;
              
                    const imageFolder = type === "product" ? "detailed" : "profiles";
              
                    const object_type = type === "prd" ? "detailed" : "prf";
              
                    return (
                      <SwiperSlide key={ `ImageGallery_${id}_${image?.pair_id || i}` }>
                        <ShowResponsiveImage
                          imagePath={ imagePath }
                          imageFolder={ imageFolder }
                          width={ 350 }
                          height={ 350 }
                          skeletonWidth="100%"
                          skeletonHeight="350px"
                          imageAlt={ image?.detailed?.alt }
                          object_id={ `${image?.pair_id || i}_${id}` }
                          object_type={ object_type }
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
            
                  const imagePath = type === "product" ? image?.detailed?.image_path : image;
            
                  const imageFolder = type === "product" ? "detailed" : "profiles";
            
                  const object_type = type === "prd" ? "detailed" : "prf";
            
                  return (
                    <SwiperSlide key={ `ImageGallery_thumbnail_${id}_${image?.pair_id || i}` }>
                      <ShowResponsiveImage
                        imagePath={ imagePath }
                        imageFolder={ imageFolder }
                        width={ 68 }
                        height={ 68 }
                        skeletonWidth="68px"
                        skeletonHeight="68px"
                        imageAlt={ image?.detailed?.alt || "" }
                        object_id={ `thumbs_${ image?.pair_id || i }_${id}` }
                        object_type={ object_type }
                      />
                    </SwiperSlide>
                  );
                }) }
              </Swiper>
            </Col> :
      
            Object.values(images)?.length === 1 ?
              <Col span={24} className="imageGallery--oneImage">
                { images?.map((image, i) => {
            
                  const imagePath = type === "product" ? image?.detailed?.image_path : image;
            
                  const imageFolder = type === "product" ? "detailed" : "profiles";
            
                  const object_type = type === "prd" ? "detailed" : "prf";
            
                  return (
                    <ShowResponsiveImage
                      key={ `ImageGallery_${id}_${image?.pair_id || i}` }
                      imagePath={ imagePath }
                      imageFolder={ imageFolder }
                      width={ 350 }
                      height={ 350 }
                      skeletonWidth="100%"
                      skeletonHeight="350px"
                      imageAlt={ image?.detailed?.alt || "" }
                      object_id={ `${image?.pair_id || i}_${id}` }
                      object_type={ object_type }
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