import "./styles/StoreDetails.less";
import {Col, Divider, Row, Skeleton, Tabs, Typography} from "antd";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import ImageGallery from "../../common/ImageGallery";
import React, {useEffect, useRef, useState} from "react";
import {useGetConfig} from "../../../contexts/config/ConfigContext";
import {useTranslation} from "react-i18next";
import {__, fn_get_lines_count} from "../../../functions/Helper";
import {useWindowSize} from "../../../functions";
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
      if (aboutUsLinesCount >= 7 && width >= 993) {
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
    
    if ((config.language === 'en' || config.language === 'ar') && logo?.en) {
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
    
    return (
      <ShowResponsiveImage
        skeletonWidth={ `${logoSize}px` }
        skeletonHeight={ `${logoSize}px` }
        skeletonRadius="50%"
        skeletonSvgWidth="3rem"
      />
    );
    
  }
  
  return (
    <Row gutter={[0, 30]} className="storeDetails--container">
      <Col span={24} className="storeDetails--topSection">
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
              <Col span={24}>
                <Row gutter={[0, 20]}>
                  <Col className="__top" span={24}>
                    <Row gutter={10} justify="space-between">
                      <Col className="--title">
                        {(isLoading) ?
                          <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "30%", "--text-height": "16px" }} active={true} size={"small"} /> :
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
                      <Skeleton active={true} paragraph={{ rows: 4 }} />
                      <div className="px-2 w-100">
                        <Divider className="border-ef m-0 mt-2" />
                      </div>
                    </> :
                    store?.company_Introduction?.detailed_company_introduction ?
                      (
                        <Col span={24} className="--aboutUs" ref={storeAboutUs}>
                          <Paragraph
                            ellipsis={
                              ellipsisStoreAboutUsShow ?
                                (
                                  ellipsisStoreAboutUs ?
                                    {
                                      rows: width < 993 ? 4 : 10,
                                    } :
                                    false
                                ) :
                                false
                            }
                            className="vv-font-size-2 text-70 font-weight-500"
                          >
                            <div dangerouslySetInnerHTML={ { __html: `${store?.company_Introduction?.detailed_company_introduction}` }} />
                          </Paragraph>
          
                          {ellipsisStoreAboutUsShow &&
                            <div className="__ellipseBtn" onClick={() => storeAboutUsEllipseHandle()}>
                              {ellipsisStoreAboutUs ?
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
                       <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "20px", "--text-height": "16px" }} active={true} size={"small"} />
                     </Col>
                     <Col>
                       <Skeleton.Input className="storeSkeleton--text" style={{ "--text-width": "20px", "--text-height": "16px" }} active={true} size={"small"} />
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
  );
};

export default StoreDetails;
