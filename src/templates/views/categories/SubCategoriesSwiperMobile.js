import { Col, Row } from "antd";
import { Link } from "react-router-dom";

// import swiper:
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
// import Swiper core and required modules
import SwiperCore, { Scrollbar } from 'swiper';

import ShowResponsiveImage from "../../common/ShowResponsiveImage";

// install Swiper modules
SwiperCore.use([Scrollbar]);

const SubCategoriesSwiperMobile = ({ subCategories, category_name }) => {
  return (
    <Col span={24} className="subCategoriesSwiper">
      <Row className="bg-white px-3 pt-4 h-100 shadow-top" style={{ margin: "0 -1rem" }} gutter={[0, 15]}>
        <Col span={24} className="text-33 vv-font-size-1-6 font-weight-bold text-truncate mt-2">
          { category_name }
        </Col>
        <Col span={24}>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={18}
            className="subCategoriesSwiperMobile"
            scrollbar={{
              "hide": true
            }}
          >
            {subCategories && subCategories.map(subCategory => {
              return(
                <SwiperSlide key={ `subCategoriesSwiperMobile_${subCategory?.category_id}` } style={{ width: 80 }}>
                  <div>
                    <Row className={`pb-4 mb-2 ${subCategory?.p_count === 0 ? 'link--disable': ''}`}>
                      <Col span={24} className="text-center my-2">
                        <div className="subCategoriesSwiper--image">
                          <ShowResponsiveImage
                            imagePath={ subCategory?.main_pair?.detailed?.image_path }
                            imageFolder='detailed'
                            width={65}
                            height={65}
                            skeletonWidth="65px"
                            skeletonHeight="65px"
                            skeletonRadius={"50%"}
                            imageAlt={ subCategory?.category }
                            object_id={subCategory?.category_id}
                            object_type={`cat`}
                          />
                        </div>
                      </Col>
                      <Col span={24} className="text-center vv-font-size-1-3 text-47 text-truncate px-3 subCategoriesSwiper--title">
                        {subCategory?.category}
                      </Col>
                    </Row>
                    <Link to={ `/categories/${subCategory?.seo_name}` } className={`subCategoriesRow--link ${subCategory?.p_count === 0 ? 'link--disable': ''}`}/>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Col>
      </Row>
    </Col>
  );
};

export default SubCategoriesSwiperMobile;
