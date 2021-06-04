import { Link } from "react-router-dom";

// import style file:
import './styles/TopRankingProducts.less';

// import ANT Design Components used:
import { Col, Row, Skeleton } from "antd";

// import Another Components used:
import ProductsMultiColumnHorizontal from "../product_list_templates/ProductsMultiColumnHorizontal";
import SkeletonMultiColumnHorizontal from "../product_list_templates/SkeletonMultiColumnHorizontal";

// import polygon images:
import polygon_1 from '../../../assets/images/polygon1.png';
import polygon_2 from '../../../assets/images/polygon2.png';
import polygon_3 from '../../../assets/images/polygon3.png';

// import custom hooks:
import { useGetTopRankingProducts, useWindowSize } from "../../../functions";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

// import language context:
import { useGetLanguageState } from "../../../contexts/language/LanguageContext";

const TopRankingProducts = () => {

  // initial state for language:
  const { language } = useGetLanguageState();

  const { t } = useTranslation();

  const { width } = useWindowSize();

  const urlCarpets = `items_per_page=3&company_id=181&page=1`;
  const urlHandmadeCarpet = `items_per_page=3&company_id=181&page=2`;
  const urlBabyCarpet = `items_per_page=3&page=4company_id=181`;

  const { load, productsCat1, productsCat2, productsCat3 } = useGetTopRankingProducts(urlCarpets, urlHandmadeCarpet, urlBabyCarpet);

  return (
    <div className="topRankingProducts--container">
      <Row>
        <Col className="topRankingProducts--caption__content" span={24}>
          <Row justify="space-between">
            <Col className={ `text-33 text-uppercase ${ width >= 992 ? 'vv-font-size-3' : 'vv-font-size-1-6' } font-weight-bold` }>
              { t(__('TOP-RANKING PRODUCTS')) }
            </Col>
            <Col className="my-auto">
              <Link to="/top-rankings" className={ `${ width >= 992 ? 'vv-font-size-1-8' : 'vv-font-size-1-4' } text-33` } >
                { t(__('View More')) } <i className={ `far fa-chevron-${language === 'en' ? 'right' : 'left'} ${ width >= 992 ? 'vv-font-size-1-8' : 'vv-font-size-1-4' } ${language === 'en' ? '' : 'align-middle'}` } />
              </Link>
            </Col>
          </Row>
        </Col>
        <Col className="rounded-10 shadow-y-2 bg-white p px-3 px-0 pt-3 pb-4 py-lg-5 topRankingProducts--content" span={24}>

          {width >= 992 ?
            <Row className="topRankingProducts--items">
              <Col className="topRankingProducts--item px-4" span={8}>
                <div className="ProductsMultiColumnHorizontal--container">
                  <Row className="ProductsMultiColumnHorizontal--content row-cols-1">
                    <Col className="text-black vv-font-size-2 font-weight-bold mb-3" span={24}>
                      {load ?
                        <Skeleton.Input style={{ width: 150, borderRadius: '10px' }} active={true} size={"small"} /> :
                        "Carpets"
                      }
                    </Col>

                    {load ?
                      <SkeletonMultiColumnHorizontal
                        skeleton = {true}
                        skeltonNumbers = {3}
                        className="SkeletonMultiColumnHorizontal"
                      /> :
                      <>
                        {productsCat1.map((product, i) => {
                          return (
                            <ProductsMultiColumnHorizontal
                              key = { i }
                              productKey = { i }
                              product= {product}
                              widthProductImage={140}
                              heightProductImage={140}
                            />
                          );
                        })}
                      </>
                    }

                  </Row>
                </div>
              </Col>

              <Col className="topRankingProducts--item px-4" span={8}>
                <div className="ProductsMultiColumnHorizontal--container">
                  <Row className="ProductsMultiColumnHorizontal--content row-cols-1">
                    <Col className="text-black vv-font-size-2 font-weight-bold mb-3" span={24}>
                      {load ?
                        <Skeleton.Input style={{ width: 150, borderRadius: '10px' }} active={true} size={"small"} /> :
                        "Handmade carpet"
                      }
                    </Col>

                    {load ?
                      <SkeletonMultiColumnHorizontal
                        skeleton = {true}
                        skeltonNumbers = {3}
                        className="SkeletonMultiColumnHorizontal"
                      /> :
                      <>
                        {productsCat2.map((product, i) => {
                          return (
                            <ProductsMultiColumnHorizontal
                              key = { i }
                              productKey = { i }
                              product= {product}
                              widthProductImage={140}
                              heightProductImage={140}
                            />
                          );
                        })}
                      </>
                    }

                  </Row>
                </div>
              </Col>

              <Col className="topRankingProducts--item px-4" span={8}>
                <div className="ProductsMultiColumnHorizontal--container">
                  <Row className="ProductsMultiColumnHorizontal--content row-cols-1">
                    <Col className="text-black vv-font-size-2 font-weight-bold mb-3" span={24}>
                      {load ?
                        <Skeleton.Input style={{ width: 150, borderRadius: '10px' }} active={true} size={"small"} /> :
                        "Kids & Baby Carpet"
                      }
                    </Col>

                    {load ?
                      <SkeletonMultiColumnHorizontal
                        skeleton = {true}
                        skeltonNumbers = {3}
                        className="SkeletonMultiColumnHorizontal"
                      /> :
                      <>
                        {productsCat3.map((product, i) => {
                          return (
                            <ProductsMultiColumnHorizontal
                              key = { i }
                              productKey = { i }
                              product= {product}
                              widthProductImage={140}
                              heightProductImage={140}
                            />
                          );
                        })}
                      </>
                    }

                  </Row>
                </div>
              </Col>
            </Row> :

            <Row className="topRankingProducts--items">

              <Col className="topRankingProducts--item__polygon" span={2}>
                <Row className="h-100" align="middle">
                  <Col span={24}>
                    <img src={ polygon_1 } alt="polygon 1"/>
                  </Col>
                  <Col span={24}>
                    <img src={ polygon_2 } alt="polygon 1"/>
                  </Col>
                  <Col span={24}>
                    <img src={ polygon_3 } alt="polygon 1"/>
                  </Col>
                </Row>
              </Col>

              <Col span={22}>
                <Row>
                  <Col className="topRankingProducts--item px-lg-4" span={8}>
                    <div className="ProductsMultiColumnHorizontal--container">
                      <Row className="ProductsMultiColumnHorizontal--content row-cols-1">
                        <Col className="text-black vv-font-size-1-4 font-weight-bold text-center ProductsMultiColumnHorizontal--content__title" span={24}>
                          {load ?
                            <Skeleton.Input style={{ width: 50, borderRadius: '10px' }} active={true} size={"small"} /> :
                            "Carpets"
                          }
                        </Col>

                        {load ?
                          <SkeletonMultiColumnHorizontal
                            skeleton = {true}
                            skeltonNumbers = {3}
                            className="SkeletonMultiColumnHorizontal"
                            Xs
                          /> :
                          <>
                            {productsCat1.map((product, i) => {
                              return (
                                <ProductsMultiColumnHorizontal
                                  key = { i }
                                  productKey = { i }
                                  product= {product}
                                  widthProductImage={90}
                                  heightProductImage={90}
                                />
                              );
                            })}
                          </>
                        }

                      </Row>
                    </div>
                  </Col>

                  <Col className="topRankingProducts--item px-lg-4" span={8}>
                    <div className="ProductsMultiColumnHorizontal--container">
                      <Row className="ProductsMultiColumnHorizontal--content row-cols-1">
                        <Col className="text-black vv-font-size-1-4 font-weight-bold text-center ProductsMultiColumnHorizontal--content__title" span={24}>
                          {load ?
                            <Skeleton.Input style={{ width: 50, borderRadius: '10px' }} active={true} size={"small"} /> :
                            "Handmade carpet"
                          }
                        </Col>

                        {load ?
                          <SkeletonMultiColumnHorizontal
                            skeleton = {true}
                            skeltonNumbers = {3}
                            className="SkeletonMultiColumnHorizontal"
                            Xs
                          /> :
                          <>
                            {productsCat2.map((product, i) => {
                              return (
                                <ProductsMultiColumnHorizontal
                                  key = { i }
                                  productKey = { i }
                                  product= {product}
                                  widthProductImage={90}
                                  heightProductImage={90}
                                />
                              );
                            })}
                          </>
                        }

                      </Row>
                    </div>
                  </Col>

                  <Col className="topRankingProducts--item px-lg-4" span={8}>
                    <div className="ProductsMultiColumnHorizontal--container">
                      <Row className="ProductsMultiColumnHorizontal--content row-cols-1">
                        <Col className="text-black vv-font-size-1-4 font-weight-bold text-center ProductsMultiColumnHorizontal--content__title" span={24}>
                          {load ?
                            <Skeleton.Input style={{ width: 50, borderRadius: '10px' }} active={true} size={"small"} /> :
                            "Kids & Baby Carpet"
                          }
                        </Col>

                        {load ?
                          <SkeletonMultiColumnHorizontal
                            skeleton = {true}
                            skeltonNumbers = {3}
                            className="SkeletonMultiColumnHorizontal"
                            Xs
                          /> :
                          <>
                            {productsCat3.map((product, i) => {
                              return (
                                <ProductsMultiColumnHorizontal
                                  key = { i }
                                  productKey = { i }
                                  product= {product}
                                  widthProductImage={90}
                                  heightProductImage={90}
                                />
                              );
                            })}
                          </>
                        }

                      </Row>
                    </div>
                  </Col>
                </Row>
              </Col>

            </Row>
          }

        </Col>
      </Row>
    </div>
  );
};

export default TopRankingProducts;