import "./styles/StoreDetails.less";
import {Col, Divider, Progress, Row, Skeleton, Tabs, Typography} from "antd";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import ImageGallery from "../../common/ImageGallery";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useGetConfig} from "../../../contexts/config/ConfigContext";
import {useTranslation} from "react-i18next";
import {__, fn_get_lines_count} from "../../../utilities/functions/Helper";
import {useWindowSize} from "../../../utilities/functions";
import CompanyInformation from "./components/CompanyInformation";
import StoreProducts from "./components/StoreProducts";

const StoreDetails = ({store, isLoading}) => {
  
  const { Paragraph } = Typography;
  const { TabPane } = Tabs;
  
  // get initial config:
  const { config } = useGetConfig();
  
  const { width } = useWindowSize();
  
  const { t } = useTranslation();
  
  const storeAboutUs = useRef();
  
  const [ellipsisStoreAboutUs, setEllipsisStoreAboutUs] = useState(true);
  const [ellipsisStoreAboutUsShow, setEllipsisStoreAboutUsShow] = useState(false);
  
  const storeAboutUsEllipseHandle = () => {
    setEllipsisStoreAboutUs(prevState => !prevState);
    if (!ellipsisStoreAboutUs) {
      return storeAboutUs.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  useEffect(() => {
    let mountAboutUsSection = true;
    
    if (storeAboutUs.current && !isLoading) {
      const aboutUsLinesCount = fn_get_lines_count(storeAboutUs.current);
      
      if (aboutUsLinesCount >= 5 && width >= 993) {
        setEllipsisStoreAboutUsShow(true);
      }
      else if (aboutUsLinesCount >= 4 && width < 993) {
        setEllipsisStoreAboutUsShow(true);
      }
      else {
        setEllipsisStoreAboutUsShow(false);
      }
    }
    
    return () => {
      mountAboutUsSection = false;
    }
  }, [storeAboutUs.current, isLoading]);
  
  const FactoriesLogo = ({ logo, imageAlt, object_id }) => {
    
    // get initial config:
    const { config } = useGetConfig();
    
    const logoSize = width >= 993 ? 50 : 35;
  
    if (config.language === 'fa' && logo?.fa) {
      return (
        <ShowResponsiveImage
          imagePath={ logo.fa }
          imageFolder='company_logo'
          width={logoSize}
          height={logoSize}
          skeletonWidth={ `${logoSize}px` }
          skeletonHeight={ `${logoSize}px` }
          skeletonSvgWidth="3rem"
          skeletonRadius="50%"
          imageAlt={ imageAlt }
          object_id={object_id}
          object_type={`company_logo_fa`}
        />
      );
    }
    
    if (config.language !== 'fa' && logo?.en) {
      return (
        <ShowResponsiveImage
          imagePath={ logo?.en }
          imageFolder='company_logo'
          width={logoSize}
          height={logoSize}
          skeletonWidth={ `${logoSize}px` }
          skeletonHeight={ `${logoSize}px` }
          skeletonSvgWidth="3rem"
          skeletonRadius="50%"
          imageAlt={ imageAlt }
          object_id={object_id}
          object_type={`company_logo_en`}
        />
      );
    }
    
    
    
    return (
      <ShowResponsiveImage
        skeletonWidth={ `${logoSize}px` }
        skeletonHeight={ `${logoSize}px` }
        skeletonRadius="50%"
        skeletonSvgWidth="3rem"
      />
    );
    
  }
  
  const { support, rate } = store || {};
  
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
    <Row className="storeDetails--container" >
      <Col span={24}>
        <Row gutter={16}>
          {
            isLoading ?
              <Col span={24}>
                <Row gutter={16} className="--isLoading">
                  <Col xs={24} md={17}>
                    <Row gutter={[0, 16]}>
                      <Col span={24} style={{ height: 350 }}>
                        <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "100%", "--text-height": "100%"}} active size={"small"} />
                      </Col>
      
                      <Col span={24} style={{ height: 450 }}>
                        <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "100%", "--text-height": "100%"}} active size={"small"} />
                      </Col>
                    </Row>
                  </Col>
          
                  <Col xs={24} md={7}>
                   <Row gutter={[0, 16]}>
                     <Col span={24} style={{ height: 350 }}>
                       <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "100%", "--text-height": "100%"}} active size={"small"} />
                     </Col>
  
                     <Col span={24} style={{ height: 170 }}>
                       <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "100%", "--text-height": "100%"}} active size={"small"} />
                     </Col>
                   </Row>
                  </Col>
                </Row>
              </Col> :
              <>
                <Col xs={24} md={17} className="storeDetails--leftSection">
                  <Row gutter={[0, 16]}>
                    <Col span={24} className="storeDetails--topSection">
                      <div className="--details">
                        <Row gutter={{ md: 17 }}>
                          <Col className="storeDetails--imageContainer">
                            {isLoading ?
                              <ShowResponsiveImage
                                imagePath=""
                                skeletonWidth="100%"
                                skeletonHeight="350px"
                              /> :
                              <ImageGallery images={store?.company_Introduction?.company_images} type="profiles" id="company_images" />
                            }
                          </Col>
                  
                          <Col className="storeDetails">
                            <Row gutter={[0, 20]} className="h-100">
                              <Col span={24} className="__top">
                                <Row gutter={[0, 20]}>
                                  <Col span={24}>
                                    <Row gutter={10} justify="space-between">
                                      <Col className="--title">
                                        {(isLoading) ?
                                          <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "30%", "--text-height": "16px" }} active size={"small"} /> :
                                          <h1>{ store?.general?.company }</h1>
                                        }
                                      </Col>
                                      <Col className="--logo">
                                        <FactoriesLogo
                                          logo={ store?.company_Introduction?.logo }
                                          imageAlt={ store?.general?.company }
                                          object_id={ store?.general?.company_id }
                                          store_type="F"
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                          
                                  {(isLoading) ?
                                    <>
                                      <Skeleton active paragraph={{ rows: 4 }} />
                                      <div className="px-2 w-100">
                                        <Divider className="border-ef m-0 mt-2" />
                                      </div>
                                    </> :
                                    store?.company_Introduction?.detailed_company_introduction ?
                                      (
                                        <Col span={24} className="--aboutUs">
                                          <Paragraph
                                            ellipsis={
                                              ellipsisStoreAboutUsShow ?
                                                (
                                                  ellipsisStoreAboutUs ?
                                                    {
                                                      rows: width < 993 ? 4 : 5,
                                                    } :
                                                    false
                                                ) :
                                                false
                                            }
                                            className="vv-font-size-2 text-70 font-weight-500"
                                          >
                                            <div dangerouslySetInnerHTML={ { __html: `${store?.company_Introduction?.detailed_company_introduction}` }} ref={storeAboutUs} />
                                          </Paragraph>
                                  
                                          {ellipsisStoreAboutUsShow &&
                                            <div className="__ellipseBtn" onClick={() => storeAboutUsEllipseHandle()}>
                                              {ellipsisStoreAboutUs ?
                                                <>
                                                  <span className="cursor-pointer">{t('more')}</span>
                                                  <i className={ `fas fa-long-arrow-${ ['fa', 'ar'].find(lng => lng === config.language) ? 'left' : 'right' } cursor-pointer` } />
                                                </> :
                                                <>
                                                  <i className={ `fas fa-long-arrow-${ ['fa', 'ar'].find(lng => lng === config.language) ? 'right' : 'left' } cursor-pointer` } />
                                                  <span className="cursor-pointer">{t('less')}</span>
                                                </>
                                              }
                                    
                                            </div>
                                          }
                                  
                                          <div className="px-2">
                                            <Divider className="border-ef m-0 mt-2" />
                                          </div>
                                        </Col>
                                      ) :
                                      null
                                  }
                                </Row>
                              </Col>
                      
                              <Col className="__bottom" span={24}>
                                <Row gutter={[10, 10]} justify="space-between">
                                  {isLoading ?
                                    <>
                                      <Col>
                                        <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "20px", "--text-height": "16px" }} active size={"small"} />
                                      </Col>
                                      <Col>
                                        <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "20px", "--text-height": "16px" }} active size={"small"} />
                                      </Col>
                                    </> :
                                    <>
                                      <Col>
                                        <Row gutter={10}>
                                          <Col>{t("brand")}: </Col>
                                          <Col>{ store?.general?.brand }</Col>
                                        </Row>
                                      </Col>
                              
                                      <Col>
                                        <Row gutter={10}>
                                          <Col>{t("business_type")}: </Col>
                                  
                                          <Col className="--businessTyp">
                                            {store?.general?.business_type?.map((type, i) => {
                                              return (
                                                <span key={`businessType_${i}`}>{ t(__(type)) }</span>
                                              )
                                            })}
                                          </Col>
                                        </Row>
                                      </Col>
                                    </>
                                  }
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
            
                    <Col span={24} className="storeDetails--bottomSection">
                      <Tabs defaultActiveKey="profile"  className="--tab" destroyInactiveTabPane={true}>
                        <TabPane tab={t(__('Company information'))} key="profile">
                          <CompanyInformation details={store} isLoading={isLoading} />
                        </TabPane>
                
                        <TabPane tab={t(__('products'))} key="products">
                          <StoreProducts companyId={store?.general?.company_id} />
                        </TabPane>
                      </Tabs>
                    </Col>
                  </Row>
                </Col>
  
                <Col xs={24} md={7} className="storeDetails--rightSection">
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
                                    <img src={support?.personal_photo} alt={store?.full_name} /> :
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

export default StoreDetails;
