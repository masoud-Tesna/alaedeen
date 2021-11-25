// import Style LESS File:
import './styles/CategoriesMultiColumn.less';

// import ANT Design Components used:
import { Col, Row } from "antd";

// import another components used:
import ScrollContainer from 'react-indiana-drag-scroll';

// import custom hooks:
import { useGetApi, useWindowSize } from "../../../functions";

import CategoriesMultiColumnSkeleton from "./skeletons/CategoriesMultiColumnSkeleton";

import TextTruncate from "react-text-truncate";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CategoriesMultiColumn = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  // get categories from API:
  const { isLoading, data } = useGetApi(`home-categories-api`, '', `allCategories`);
  const { categories } = data || [];

  return (
    <div className={ `${width >= 768 ? 'categoriesMultiColumn--container' : 'categoriesMultiColumn--containerXs my-4'} h-100` }>
      <Row className={ isLoading ? 'h-100' : (categories?.length >= 7 && 'h-100') }>

        {/* if Screen Width >= 768px (Desktop) Show Component: */}
        {width >= 992 ?
          <>

            { isLoading ?
              <CategoriesMultiColumnSkeleton
                skeleton = {true}
                skeltonNumbers = {8}
                width = {width}
              /> :
              <>
                {categories?.map((category, index) => {
                  return (
                    <Col key={ `categoriesMultiColumn_${ category?.category_id }` } className="categoriesMultiColumn--item" span={12}>
                      <Link to={ `/categories/${category?.seo_name}` } className={ `d-block ${category?.p_count === 0 ? 'categoryLink--disable': ''}` } >
                        <Row className={`categoriesMultiColumn--item__row ${ index !== 6 ? 'categoriesMultiColumn--item__borderBottom': '' }`}>
                          <Col span={24} className="categoriesMultiColumn--img text-center py-2">
                            <div className="categoriesMultiColumn--img__wrapper">
                              <img src={ `${process.env.PUBLIC_URL}/categories-image/category-${category?.category_id}.svg` } alt={ category?.category }/>
                            </div>
                          </Col>
                          <Col span={24} className="categoriesMultiColumn--title text-center text-47 vv-font-size-1-8 pb-2 text-truncate px-3">
                            { category?.category }
                          </Col>
                        </Row>
                      </Link>
                    </Col>
                  );
                })}

                <Col className="categoriesMultiColumn--item" span={12}>
                  <Link to="/categories/" className="d-block h-100">
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
                  </Link>
                </Col>
              </>
            }
          </> :

          /* if Screen Width <= 768px (Mobile) Show Component: */
          <>

            { isLoading ?
              <CategoriesMultiColumnSkeleton
                skeleton = {true}
                skeltonNumbers = {7}
                swiper
              /> :
              <>
                <Col className="categoriesMultiColumn--item" span={7}>
                  <Link className="d-block h-100" to="/categories/">
                    <Row>
                      <Col span={24} className="categoriesMultiColumn--icon text-center my-2">
                        <Row justify="center" className="h-100">
                          <div className="rounded-circle shadow-circle">
                            <i className="far fa-list-ul mr-2 display-4 font-weight-500 text-primary mx-auto" />
                          </div>
                        </Row>
                      </Col>
                      <Col span={24} className="categoriesMultiColumn--icon-title text-center text-47 vv-font-size-1-5 pb-2 text-wrap px-3">
                        { t(__('All Categories')) }
                      </Col>
                    </Row>
                  </Link>
                </Col>
                <Col span={17}>
                  <ScrollContainer className="text-select-none d-flex requestsList--scrollContainer">
                    {categories?.map((category, index) => {
                      return (
                        <Col key={ `categoriesMultiColumnXS_${ category?.category_id }` } span={9} className="categoriesMultiColumn--item">
                          <Link to={ `/categories/${category?.seo_name}` } className={ `d-block h-100 ${category?.p_count === 0 ? 'categoryLink--disable': ''}` }>
                            <Row className="categoriesMultiColumn--item__row">
                              <Col span={24} className="categoriesMultiColumn--img text-center my-2">
                                <div className="categoriesMultiColumn--img__wrapper">
                                  <img src={ `${process.env.PUBLIC_URL}/categories-image/category-${category?.category_id}.svg` } alt={ category?.category }/>
                                </div>
                              </Col>
                              <Col span={24} className="categoriesMultiColumn--title text-center text-47 pb-2 px-3">
                                <TextTruncate
                                  className="vv-font-size-1-5"
                                  line={2}
                                  element="div"
                                  truncateText=" …"
                                  text={category?.category}
                                />
                              </Col>
                            </Row>
                          </Link>
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