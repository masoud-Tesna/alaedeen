import { Col, Row } from "antd";
import { Link } from "react-router-dom";

// import swiper:
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

// import Swiper core and required modules
import SwiperCore, { Scrollbar } from 'swiper';
import ShowResponsiveImage from "../../common/ShowResponsiveImage";

// install Swiper modules
SwiperCore.use([Scrollbar]);

const SubCategoriesSwiperDesktop = ({ subCategories }) => {
  return (
    <Row className="bg-white px-3 h-100">
      <Col span={24}>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={50}
          scrollbar={{
            "hide": true
          }}
        >
          {subCategories && subCategories.map(subCategory => {
            return(
              <SwiperSlide key={ `subCategoriesSwiperDesktop_${subCategory?.category_id}` } style={{ width: 120 }}>
                <div>
                  <Row className={`py-4 ${subCategory?.p_count === 0 ? 'categoryLink--disable': ''}`}>
                    <Col span={24} className="text-center my-2">
                      <div className="subCategoriesSwiper--image">
                        <ShowResponsiveImage
                          imagePath={ subCategory?.main_pair?.detailed?.image_path }
                          imageFolder='detailed'
                          width={92}
                          height={92}
                          skeletonWidth="92px"
                          skeletonHeight="92px"
                          skeletonRadius={"50%"}
                          imageAlt={ subCategory?.category }
                          object_id={subCategory?.category_id}
                          object_type={`cat`}
                        />
                      </div>
                    </Col>
                    <Col span={24} className="text-center vv-font-size-1-6 text-47 text-truncate px-3 subCategoriesSwiper--title">
                      {subCategory?.category}
                    </Col>
                  </Row>
                  <Link to={ `/categories/${subCategory?.seo_name}` } className={`subCategoriesRow--link ${subCategory?.p_count === 0 ? 'categoryLink--disable': ''}`}/>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Col>
    </Row>
  );
};

export default SubCategoriesSwiperDesktop;
