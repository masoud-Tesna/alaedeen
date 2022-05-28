// import style file:
import './styles/ProductDetail.less';

// import ant design components:
import {Col, Divider, Progress, Row, Skeleton, Typography} from "antd";

import {useWindowSize} from "../../../functions";
import {useTranslation} from "react-i18next";
import { useGetConfig } from "../../../contexts/config/ConfigContext";
import ProductTab from "../product_tabs";
import React, {useCallback, useEffect, useRef, useState} from "react";
import ImageGallery from "../../common/ImageGallery";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";

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
  
  const { support, rate } = product || {};
  
  const [dotPercent, setDotPercent] = useState(0);
  
  const progressRef = useCallback(node => {
    if (node !== null) {
      if (rate?.interaction !== false) {
        const progressDot = node?.children[1].children[0].children[0].children[1];
        
        let bgColor = "red";
        
        if (rate?.interaction >= -51) {
          bgColor = "orange";
        }
        if (rate?.interaction >= 10) {
          bgColor = "yellow";
        }
        if (rate?.interaction >= 31) {
          bgColor = "#D9FC5D";
        }
        if (rate?.interaction >= 71) {
          bgColor = "green";
        }
        
        setDotPercent(((rate?.interaction) + 100) / 2);
        
        if (progressDot) {
          progressDot.style.backgroundColor = bgColor;
          progressDot.style.left = `calc(${dotPercent}% - 7.5px)`;
        }
      }
    }
  }, [isLoading, dotPercent]);
  
  const [isSupport, setIsSupport] = useState(false);
  
  useEffect(() => {
    if (support?.length !== 0 && (support?.full_name && support?.telephone_number)) {
      setIsSupport(true);
    }else {
      setIsSupport(false);
    }
  }, [support]);

  return (
    <Row>
      <Col span={24} className="productDetails--content">
        <Row gutter={16}>
  
          {
            isLoading ?
              <Col span={24}>
                <Row gutter={16} className="--isLoading">
                  <Col xs={24} md={17}>
                    <Row gutter={[0, 16]}>
                      <Col span={24} style={{ height: 350 }}>
                        <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "100%", "--text-height": "100%"}} active size={"small"} />
                      </Col>
            
                      <Col span={24} style={{ height: 450 }}>
                        <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "100%", "--text-height": "100%"}} active size={"small"} />
                      </Col>
                    </Row>
                  </Col>
        
                  <Col xs={24} md={7}>
                    <Row gutter={[0, 16]}>
                      <Col span={24} style={{ height: 350 }}>
                        <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "100%", "--text-height": "100%"}} active size={"small"} />
                      </Col>
            
                      <Col span={24} style={{ height: 170 }}>
                        <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "100%", "--text-height": "100%"}} active size={"small"} />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col> :
              <>
                <Col xs={24} md={17} className="productDetails--leftSection">
                  <Row gutter={[0, 16]}>
                    <Col span={24} className="productDetails--topSection">
                      <Row gutter={{ md: 17 }}>
                        <Col className="productDetails--imageContainer">
                          {isLoading ?
                            <ShowResponsiveImage
                              imagePath=""
                              skeletonWidth="100%"
                              skeletonHeight="350px"
                            /> :
                            <ImageGallery images={product?.product_images} id={`product_image_${product?.product_id}`} />
                          }
                        </Col>
                        
                        <Col className="productDetail">
                          <Row className="h-100" gutter={[0, 5]}>
                            <Col span={24} className="productDetails--title">
                              {(isLoading) ?
                                <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "60vw", "--text-height": "2.55vh" }} active size="small" /> :
                                <h1>{ product?.product }</h1>
                              }
                            </Col>
              
                            {(isLoading) ?
                              <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "40vw", "--text-height": "2.55vh" }} active size="small" /> :
                              (productPrice !== "0.00") &&
                              <Col span={24} className="productDetails--price">
                                <span className={ `${ width >= 992 ? 'vv-font-size-2-5' : 'vv-font-size-1-6' } text-primary font-weight-bold` }>${ productPrice }</span>
                  
                                { productListPrice !== "0.00" &&
                                  <span className={ `${ width >= 992 ? 'vv-font-size-2-5' : 'vv-font-size-1-6' } text-primary font-weight-bold` }> - ${productListPrice}</span>
                                }
                  
                                {product?.quantity_unit &&
                                  <span className={ ` ${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-3' } text-92 font-weight-600` }>&nbsp; /&nbsp; { product?.quantity_unit }</span>
                                }
                  
                                {(product?.min_qty && product?.quantity_unit) &&
                                  <>
                                    <span className={ ` ${ width >= 992 ? 'vv-font-size-1-9 ml-4' : 'vv-font-size-1-3 ml-5' } text-47 font-weight-600` }>{ product?.min_qty } { product?.quantity_unit }</span>
                                    <span className={ ` ${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-2' } text-92 font-weight-600 ml-2` }>({t('MOQ')})</span>
                                  </>
                                }
                              </Col>
                            }
              
                            {(isLoading) ?
                              <>
                                <Skeleton active paragraph={{ rows: 4 }} />
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
                                      <i className={ `fas fa-long-arrow-${config.language === 'en' ? 'right' : 'left'} cursor-pointer` } />
                                    </> :
                                    <>
                                      <i className={ `fas fa-long-arrow-${config.language === 'en' ? 'left' : 'right'} cursor-pointer` } />
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
                                    <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "30vw", "--text-height": "2.55vh" }} active size="small" /> :
                                    product?.wk_location &&
                                    <>
                                      <i className="fal fa-map-marker-alt text-red-a0 mr-2 mr-lg-3" />
                                      <span className="text-47">{ product.wk_location }</span>
                                    </>
                                  }
                                </Col>
                                <Col className="productDetails--Manufacture">
                                  {(isLoading) ?
                                    <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "20vw", "--text-height": "2.55vh" }} active size="small" /> :
                                    product?.manufacturing_country &&
                                    <>
                                      <i className={ `fi fi-${ (product?.manufacturing_country)?.toLowerCase() } display-5 mr-2 mr-lg-3` } />
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
                        <ProductTab product={product} isLoading={isLoading} />
                      </div>
                    </Col>
                  </Row>
                </Col>
  
                <Col xs={24} md={7} className="productDetails--rightSection">
                  <Row gutter={[0, 16]} className="--sticky">
                    {isSupport &&
                      <Col span={24} className="--support">
                        <Row gutter={[0, 10]}>
                          <Col span={24} className="--top">
                            <div className="--bg" />
                            <div className={`--img ${(support?.personal_photo && support?.personal_photo !== "") ? "--border" : "--borderNone"}`}>
                              <div>
                                {
                                  (support?.personal_photo && support?.personal_photo !== "") ?
                                    <img src={support?.personal_photo} alt={product?.company_name} /> :
                                    <i className="fa-thin fa-user" />
                                }
                              </div>
                            </div>
                          </Col>
            
                          {
                            support?.full_name &&
                            <Col span={24} className="text-center --name">
                              {support?.full_name}
                            </Col>
                          }
            
                          {
                            (support?.country && support?.state) &&
                            <Col span={24} className="text-center --location">
                              <i className="fa-regular fa-location-dot" /> {` ${support?.country}, ${support?.state} `}
                            </Col>
                          }
            
                          {
                            support?.telephone_number &&
                            <Col span={24} className="--detail">
                              <i className="fa-regular fa-phone" /> <a href="tel:+982177874366">{ support?.telephone_number }</a>
                            </Col>
                          }
            
                          {
                            support?.whatsapp_number &&
                            <Col span={24} className="--detail">
                              <i className="fa-brands fa-whatsapp" /> <a href="whatsapp://send?abid=+989912322188&text=">{ support?.whatsapp_number }</a>
                            </Col>
                          }
            
                          {
                            (support?.country && support?.state && support?.address) &&
                            <Col span={24} className="--detail">
                              <i className="fa-regular fa-location-dot" /> {` ${support?.country}, ${support?.state} - ${support?.address} `}
                            </Col>
                          }
                        </Row>
                      </Col>
                    }
      
                    <Col span={24} className="--rate">
                      <Row gutter={[0, 16]}>
                        <Col span={24} className={`__interactionRate `} ref={progressRef}>
                          <div className="__caption">
                            {t("interaction_rate")}: {rate?.interaction === false ? t("there_is_no_record") : rate?.interaction}
                          </div>
            
                          <Progress
                            percent={100}
                            className={`__progress ${rate?.interaction === false && "-noRecord"}`}
                            success={{ percent: dotPercent }}
                            showInfo={false}
                          />
            
                          {
                            rate?.interaction &&
                            <div className="__details">
                              <span className="__green">{t("excellent")}</span>
                              <span className="__lemon">{t("good")}</span>
                              <span className="__yellow">{t("medium")}</span>
                              <span className="__orange">{t("weak ")}</span>
                              <span className="__red">{t("very_weak")}</span>
                            </div>
                          }
                        </Col>
          
                        <Col span={24} className="__responseRate">
                          <div className="__caption">
                            {`${t("response_time")} ${rate?.interaction === false ? t("there_is_no_record") : `≥ ${rate?.response?.value} ${rate?.response?.indicator}`}`}
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </>
          }
          
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;