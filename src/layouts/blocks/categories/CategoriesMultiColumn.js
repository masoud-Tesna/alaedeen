// import Style LESS File:
import './styles/CategoriesMultiColumn.less';

// import ANT Design Components used:
import { Col, Row } from "antd";

// import another components used:
import ScrollContainer from 'react-indiana-drag-scroll';

// import custom hooks:
import { useGetApi, useWindowSize } from "../../../functions";

// import responsive image show component:
import ShowResponsiveImage from "../../common/ShowResponsiveImage";

import CategoriesMultiColumnSkeleton from "./CategoriesMultiColumnSkeleton";

import TextTruncate from "react-text-truncate";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

const CategoriesMultiColumn = () => {

  const { t } = useTranslation();

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
                    <Col key={category.category_id} className="categoriesMultiColumn--item" span={12}>
                      <a className="d-block h-100" href={ category.link }>
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
                      </a>
                    </Col>
                  );
                })}

                <Col className="categoriesMultiColumn--item" span={12}>
                  <a href="#" className="d-block h-100">
                    <Row className="categoriesMultiColumn--item__row">
                      <Col span={24} className="categoriesMultiColumn--icon text-center my-2">
                        <Row align="middle" className="h-100">
                          <Col span={24}>
                            <i className="far fa-list-ul mr-2 vv-font-size-4 font-weight-500 text-primary" />
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24} className="categoriesMultiColumn--icon-title text-center text-47 vv-font-size-1-8 pb-2 text-truncate px-3">
                        { t(__('All Categories')) }
                      </Col>
                    </Row>
                  </a>
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
                  <a className="d-block h-100" href="https://hornb2b.com/horn/all-categories/">
                    <Row>
                      <Col span={24} className="categoriesMultiColumn--icon text-center my-2">
                        <Row justify="center" className="h-100">
                          <div className="rounded-circle shadow-circle">
                            <i className="far fa-list-ul mr-2 vv-font-size-3 font-weight-500 text-primary mx-auto" />
                          </div>
                        </Row>
                      </Col>
                      <Col span={24} className="categoriesMultiColumn--icon-title text-center text-47 vv-font-size-1-5 pb-2 text-wrap px-3">
                        { t(__('All Categories')) }
                      </Col>
                    </Row>
                  </a>
                </Col>
                <Col span={17}>
                  <ScrollContainer className="text-select-none d-flex requestsList--scrollContainer">
                    {items.map((category, index) => {
                      return (
                        <Col key={category.category_id} span={9} className="categoriesMultiColumn--item">
                          <a className="d-block h-100" href={ category.link }>
                            <Row className="categoriesMultiColumn--item__row">
                              <Col span={24} className="categoriesMultiColumn--img text-center my-2">
                                <div className="categoriesMultiColumn--img__wrapper">
                                  <ShowResponsiveImage imagePath={ category.main_pair.detailed.image_path } imageFolder='detailed' width={50} height={50} imageAlt={ category.category }/>
                                </div>
                              </Col>
                              <Col span={24} className="categoriesMultiColumn--title text-center text-47 pb-2 px-3">
                                <TextTruncate
                                  className="vv-font-size-1-5"
                                  line={2}
                                  element="span"
                                  truncateText=" …"
                                  text={category.category}
                                />
                              </Col>
                            </Row>
                          </a>
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