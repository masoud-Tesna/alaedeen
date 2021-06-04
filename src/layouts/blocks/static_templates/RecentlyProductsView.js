// import Style File:
import './styles/RecommendedProducts.less';
import 'swiper/swiper.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

// import Another Components Used:
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductsMultiColumnVertical from "../product_list_templates/ProductsMultiColumnVertical";

import SkeletonMultiColumnVertical from "../product_list_templates/SkeletonMultiColumnVertical";

// import custom hooks:
import { useGetProductApi, useWindowSize } from '../../../functions';

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

SwiperCore.use([Autoplay ]);

const RecentlyProductsView = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  let url = `items_per_page=5&company_id=181`;

  const { load, products } = useGetProductApi(url);

  return (
    <div className="recommendedProducts--container">
      <Row>
        <Col className="recommendedProducts--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 992 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
              { t(__('Your visits')) }
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="h-100 productsMultiColumnVertical--container">
            <Row className={ `h-100 productsMultiColumnVertical--items ${width <= 991 && 'swiperProductShow'} row-cols-12 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5` } justify="space-around" gutter={[16, 20]}>

              {width >= 992 ?
                <>

                  {load ?
                  <SkeletonMultiColumnVertical
                    className = "bg-white rounded-10 shadow-y-2"
                    skeleton = {true}
                    skeltonNumbers = {5}
                    height = {width >= 992 ? 363.933 : 273.05}
                  /> :
                    <>
                      {products.map((product, i) => {
                        return (
                          <ProductsMultiColumnVertical
                            key = { i }
                            className="bg-white rounded-10 shadow-y-2"
                            product={product}
                            allDetails
                            widthProductImage={287}
                            heightProductImage={230}
                          />
                        );
                      })}
                    </>
                  }

                </> :
                <>
                  <Swiper
                    slidesPerView={2}
                    autoplay={{delay: 3000}}
                    dir={'ltr'}
                  >
                    {products.map((product, i) => {
                      return (
                        <Col key = { i }>
                          <SwiperSlide>
                            <ProductsMultiColumnVertical
                              className="bg-white rounded-10 shadow-y-2"
                              product={product}
                              allDetails
                              swiper
                              load = { load }
                              widthProductImage={164}
                              heightProductImage={170}
                            />
                          </SwiperSlide>
                        </Col>
                      );
                    })}

                    {/*{load &&
                    <SkeletonMultiColumnVertical
                      className = "bg-white rounded-10 shadow-y-2"
                      skeleton = {true}
                      skeltonNumbers = {5}
                      width={width}
                    />
                    }*/}
                  </Swiper>
                </>
              }

            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecentlyProductsView;