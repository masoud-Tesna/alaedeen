// import style file:
import './styles/ProductDetail.less';

// import ant design components:
import { Button, Col, Divider, Row, Skeleton, Typography } from "antd";

import {useWindowSize} from "../../../functions";
import {useTranslation} from "react-i18next";
import {__} from "../../../functions/Helper";
import FeaturesGrid from "./../../common/FeaturesGrid";
import { useGetConfig } from "../../../contexts/config/ConfigContext";
import ProductTab from "../product_tabs";
import React, { useRef, useState } from "react";
import ImageGallery from "../../common/ImageGallery";

const ProductDetail = (props) => {

  // get initial config:
  const { config } = useGetConfig();

  const { product, isLoading } = props;

  // get screen width:
  const { width } = useWindowSize();

  const { t } = useTranslation();

  const productPrice = parseFloat(product?.price).toFixed(2);
  const productListPrice = parseFloat(product?.list_price).toFixed(2);

  const [ellipsisProductDescription, setEllipsisProductDescription] = useState(true);

  const productDescription = useRef();

  const productDescriptionEllipseHandle = () => {
    setEllipsisProductDescription(prevState => !prevState);
    if (!ellipsisProductDescription) {
      return productDescription.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const { Paragraph } = Typography;

  return (
    <Row>
      <Col span={24} className="productDetails--content">
        <Row gutter={[0, 15]}>
          <Col span={24} className="productDetails--topSection">
            <Row>
              <Col xs={24} lg={10} className="productDetails--imageContainer">
                {isLoading ?
                  <>Loading...</> :
                  <ImageGallery mainPair={product?.main_pair} imagePairs={product?.image_pairs} />
                }
              </Col>
              <Col xs={24} lg={14} className="productDetail">
                <Row className="h-100" gutter={[0, 5]}>
                  <Col span={24} className="productDetails--title">
                    {(isLoading) ?
                      <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "60vw", "--text-height": "2.55vh" }} active={true} size={"small"} /> :
                      <h1>{ product?.product }</h1>
                    }
                  </Col>

                  {(isLoading) ?
                    <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "40vw", "--text-height": "2.55vh" }} active={true} size={"small"} /> :
                    (config.countryCode !== 'IR' && productPrice !== "0.00") ?
                      <Col span={24} className="productDetails--price">
                            <span className={ `${ width >= 768 ? 'vv-font-size-2-5' : 'vv-font-size-1-6' } text-primary font-weight-bold` }>${ productPrice }</span>

                        { productListPrice !== "0.00" &&
                        <span className={ `${ width >= 768 ? 'vv-font-size-2-5' : 'vv-font-size-1-6' } text-primary font-weight-bold` }> - ${productListPrice}</span>
                        }

                        {product?.quantity_unit &&
                        <span className={ ` ${ width >= 768 ? 'vv-font-size-1-9' : 'vv-font-size-1-3' } text-92 font-weight-600` }>&nbsp; /&nbsp; { product?.quantity_unit }</span>
                        }

                        {(product?.min_qty && product?.quantity_unit) &&
                          <>
                            <span className={ ` ${ width >= 768 ? 'vv-font-size-1-9 ml-4' : 'vv-font-size-1-3 ml-5' } text-47 font-weight-600` }>{ product?.min_qty } { product?.quantity_unit }</span>
                            <span className={ ` ${ width >= 768 ? 'vv-font-size-1-9' : 'vv-font-size-1-2' } text-92 font-weight-600 ml-2` }>({t('MOQ')})</span>
                          </>
                        }
                      </Col> :
                      <Col span={24} className="productDetails--getLatestPrice">
                        {(isLoading || !product.product) ?
                          <Skeleton.Input style={{ width: 70, height: 22 }} active={true} size={"small"} /> :
                          t(__('get latest price'))
                        }
                      </Col>
                  }

                  {(isLoading) ?
                    <>
                      <Skeleton active={true} paragraph={{ rows: 4 }} />
                      <div className="px-2 w-100">
                        <Divider className="border-ef m-0 mt-2" />
                      </div>
                    </> :
                    <Col span={24} className="product--description" ref={productDescription}>
                      <Paragraph ellipsis={ellipsisProductDescription ? { rows: 4 } : false} className="vv-font-size-2 text-70 font-weight-500">
                        <div dangerouslySetInnerHTML={ { __html: `${product?.full_description}` }} />
                      </Paragraph>

                      <div className="product--description__ellipse" onClick={() => productDescriptionEllipseHandle()}>
                        {ellipsisProductDescription ?
                          <>
                            <span className="cursor-pointer">{t('more')}</span>
                            <i className="fas fa-long-arrow-right cursor-pointer" />
                          </> :
                          <>
                            <i className="fas fa-long-arrow-left cursor-pointer" />
                            <span className="cursor-pointer">{t('less')}</span>
                          </>
                        }

                      </div>

                      <div className="px-2">
                        <Divider className="border-ef m-0 mt-2" />
                      </div>
                    </Col>
                  }

                  <Col span={24} className="productDetails--locationManufacture px-4">
                    <Row justify={"space-between"} align="bottom">
                      <Col className="productDetails--location">
                        {(isLoading) ?
                          <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "30vw", "--text-height": "2.55vh" }} active={true} size={"small"} /> :
                          product?.wk_location &&
                          <>
                            <i className="fal fa-map-marker-alt text-red-a0 mr-2 mr-lg-3" />
                            <span className="text-47">{ product.wk_location }</span>
                          </>
                        }
                      </Col>
                      <Col className="productDetails--Manufacture">
                        {(isLoading) ?
                          <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "20vw", "--text-height": "2.55vh" }} active={true} size={"small"} /> :
                          product?.manufacturing_country &&
                          <>
                            <i className={ `flag-icon flag-icon-${ (product?.manufacturing_country)?.toLowerCase() } display-5 mr-2 mr-lg-3` } />
                            <span className="text-92">{ product.manufacturing_country }</span>
                          </>
                        }
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={24} className="productDetails--bottomSection">
            <div>
              <ProductTab features={product?.product_features} isLoading={isLoading} />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;