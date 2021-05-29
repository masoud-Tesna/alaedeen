// import Style LESS File:
import './styles/CategoriesMultiColumn.less';

// import ANT Design Components used:
import { Col, Row } from "antd";

// import another components used:
import ScrollContainer from 'react-indiana-drag-scroll';

// import custom hooks:
import { useGetApi, useWindowSize } from "../../../functions";
import { fn_handleLinkClick } from "../../../functions/Helper";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import React from "react";
import CategoriesMultiColumnSkeleton from "./CategoriesMultiColumnSkeleton";

const CategoriesMultiColumn = () => {

  const { width } = useWindowSize();

  const { load, items } = useGetApi(`home-categories-api`, '', 'categories');

  return (
    <div className={ `${width >= 992 ? 'categoriesMultiColumn--container' : 'categoriesMultiColumn--containerXs my-4'} h-100` }>
      <Row className="h-100">

        {/* if Screen Width >= 992px (Desktop) Show Component: */}
        {width >= 992 ?
          <>

            { load ?
              <CategoriesMultiColumnSkeleton
                skeleton = {true}
                skeltonNumbers = {8}
              /> :
              <>
                {items.map((category, index) => {
                  return (
                    <Col key={category.category_id} className="categoriesMultiColumn--item" span={12} onClick={() => { fn_handleLinkClick(category.link, '_blank'); }}>
                      <Row className={`categoriesMultiColumn--item__row ${ index !== 6 ? 'categoriesMultiColumn--item__borderBottom': '' }`}>
                        <Col span={24} className="categoriesMultiColumn--img text-center py-2">
                          <div className="categoriesMultiColumn--img__wrapper">
                            <ShowResponsiveImage imagePath={ category.main_pair.detailed.image_path } imageFolder='detailed' width={80} height={80} imageAlt={ category.category }/>
                          </div>
                        </Col>
                        <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2 text-truncate px-3">
                          { category.category }
                        </Col>
                      </Row>
                    </Col>
                  );
                })}

                <Col className="categoriesMultiColumn--item" span={12}>
                  <Row className="categoriesMultiColumn--item__row">
                    <Col span={24} className="categoriesMultiColumn--icon text-center my-2">
                      <Row align="middle" className="h-100">
                        <Col span={24}>
                          <i className="far fa-list-ul mr-2 vv-font-size-4 font-weight-500 text-primary" />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24} className="categoriesMultiColumn--icon-title text-center text-47 vv-font-size-1-8 pb-2 text-truncate px-3">
                      All Categories
                    </Col>
                  </Row>
                </Col>
              </>
            }
          </> :

          /* if Screen Width <= 991px (Mobile) Show Component: */
          <>

            { load ?
              <CategoriesMultiColumnSkeleton
                skeleton = {true}
                skeltonNumbers = {7}
                swiper
              /> :
              <>
                <Col className="categoriesMultiColumn--item" span={7}>
                  <Row>
                    <Col span={24} className="categoriesMultiColumn--icon text-center my-2">
                      <Row justify="center" className="h-100">
                        <div className="rounded-circle shadow-circle">
                          <i className="far fa-list-ul mr-2 vv-font-size-3 font-weight-500 text-primary mx-auto" />
                        </div>
                      </Row>
                    </Col>
                    <Col span={24} className="categoriesMultiColumn--icon-title text-center text-47 vv-font-size-1-5 pb-2 text-wrap px-3">
                      All Categories
                    </Col>
                  </Row>
                </Col>
                <Col span={17}>
                  <ScrollContainer className="text-select-none d-flex requestsList--scrollContainer">
                    {items.map((category, index) => {
                      return (
                        <Col key={category.category_id} span={9} className="categoriesMultiColumn--item" onClick={() => { fn_handleLinkClick(category.link, '_blank'); }}>
                          <Row className="categoriesMultiColumn--item__row">
                            <Col span={24} className="categoriesMultiColumn--img text-center py-2">
                              <div className="categoriesMultiColumn--img__wrapper">
                                <ShowResponsiveImage imagePath={ category.main_pair.detailed.image_path } imageFolder='detailed' width={50} height={50} imageAlt={ category.category }/>
                              </div>
                            </Col>
                            <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-5 pb-2 text-wrap px-3">
                              Kids & Baby Carpet
                            </Col>
                          </Row>
                        </Col>
                      );
                    })}
                  </ScrollContainer>
                </Col>
              </>
            }

          </>
        }

      </Row>
    </div>
  );
};

export default CategoriesMultiColumn;