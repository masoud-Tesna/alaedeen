import { useState, Fragment } from "react";

// import style file:
import "./styles/FactoryOneColumn.less";

// import ANT Design Components Used:
import { Button, Col, Row, Skeleton, Modal } from "antd";

// import Custom hooks:
import { useWindowSize } from "../../../functions";

// import Verified
import verifiedIcon from "../../assets/images/verified.png";

// import Another Package used:
import TextTruncate from "react-text-truncate";

// import Skeleton used:
import SkeletonFactoriesShow from "../../blocks/skeletons/SkeletonFactoriesShow";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetConfig } from "../../../contexts/config/ConfigContext";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";

const FactoryOneColumn = ({ factories, isLoading, selectedStoreId }) => {

  const { t } = useTranslation();
  const { width } = useWindowSize();

  const [isContactUsModal, setIsContactUsModal] = useState([]);

  const showContactUsModal = (storeId) => {
    setIsContactUsModal(prevState => {
      return {
        ...prevState,
        [storeId]: true
      }
    });
  }

  const handleContactUsModalClose = (storeId) => {
    setIsContactUsModal(prevState => {
      return {
        ...prevState,
        [storeId]: false
      }
    });
  }

  const FactoriesLogo = ({ logo, imageAlt, object_id, store_type }) => {

    // get initial config:
    const { config } = useGetConfig();

    const logoSize = width >= 993 ? 80 : 53;

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

  // if loading for get data from api:
  if (isLoading) {
    return <SkeletonFactoriesShow
      skeleton = {true}
      skeltonNumbers = {3}
    />
  }

  return (
    <>
      {
        factories?.map(factory => {

          if (factory?.store_type === "A") {
            return (
              <Fragment key = { `FactoryOneColumn_pro_${factory?.company_id}` }>
                <Col xs={24} lg={12} className={ `factory--container ${selectedStoreId === factory?.company_id ? "byParam" : ""}` }>
                  <Row gutter={width >= 992 ? 16 : 0} className="bg-white rounded-10 border border-70 h-100 m-0">
                    <Col span={24}>
                      <Row className="h-100" gutter={[0, 12]}>
                        <Col className="align-self-start factory--topSection" span={24}>
                          <Row gutter={10}>
                            <Col xs={8} lg={11} className="product-xs">
                              <div className="d-lg-none rounded-10 shadow-y-2 text-center factory--productImage">
                                {factory?.products.length ?
                                  <div className="product--image">
                                    <ShowResponsiveImage
                                      imagePath={ factory?.products[0]?.main_pair?.detailed?.image_path }
                                      imageFolder='detailed'
                                      width={120}
                                      height={150}
                                      skeletonWidth="100%"
                                      skeletonHeight="147px"
                                      imageAlt={ factory?.products[0]?.product }
                                      object_id={factory?.products[0]?.product_id}
                                      object_type={`prd`}
                                    />
                                  </div> :
                                  <div className="product--image no--image">
                                    <ShowResponsiveImage
                                      skeletonWidth="100%"
                                      skeletonHeight="147px"
                                    />
                                  </div>
                                }
                                <div className="factory--logo">
                                  <FactoriesLogo
                                    logo={ factory?.logo }
                                    imageAlt={ factory?.general?.company }
                                    object_id={factory?.company_id}
                                  />
                                </div>
                              </div>

                              <div className="d-none d-lg-block rounded-10 shadow-y-2 text-center factory--productImage">
                                {(factory?.images && factory?.images[0]) ?
                                  <div className="product--image">
                                    <ShowResponsiveImage
                                      imagePath={ factory?.images[0] }
                                      imageFolder='profiles'
                                      width={250}
                                      height={210}
                                      skeletonWidth="100%"
                                      skeletonHeight="210px"
                                      imageAlt={ factory?.general?.company }
                                      object_id={`img_0_${factory?.company_id}`}
                                      object_type={`factory_image_0`}
                                    />
                                  </div> :
                                  <div className="product--image no--image">
                                    <ShowResponsiveImage
                                      skeletonWidth="100%"
                                      skeletonHeight="210px"
                                    />
                                  </div>
                                }
                                <div className="factory--logo">
                                  <FactoriesLogo
                                    logo={ factory?.logo }
                                    imageAlt={ factory?.general?.company }
                                    object_id={factory?.company_id}
                                  />
                                </div>
                              </div>
                            </Col>
                            <Col xs={16} lg={13}>
                              <Row gutter={[0, {xs:0, lg:7}]}>
                                <Col span={24}>
                                  <Row gutter={{ xs:4, lg:10 }}>
                                    <Col flex="1 1" className="text-truncate text-33 factory--name">
                                      {factory?.general?.company}
                                    </Col>
                                    <Col flex="44px" className="factory--verified">
                                      <img src={ verifiedIcon } alt="verified"/>
                                    </Col>
                                  </Row>
                                </Col>

                                <Col span={24} className="factory--aboutUs">
                                  {factory?.about_us ?
                                    <TextTruncate
                                      className="text-33 factory--aboutUs__paragraph"
                                      line={ width >= 993 ? 3 : 5 }
                                      element="div"
                                      truncateText=" …"
                                      text={ factory?.about_us && `${t(__('About Us'))}: ${factory?.about_us}` }
                                    /> :
                                    <Skeleton className="factory--aboutUs__empty" active={false} paragraph={{ rows: 4 }} />
                                  }
                                </Col>

                                <Col span={24} className="d-none d-lg-block factory--products">
                                  <Row className="row-cols-2" gutter={16}>
                                    {factory?.products.length ?
                                      factory?.products.map(product => {
                                        return (
                                          <Col key={`factoryProduct_${factory?.company_id}_${product?.product_id}`}>
                                            <div className="rounded-10 shadow-y-2 text-center factory--productImage">
                                              <ShowResponsiveImage
                                                imagePath={ product?.main_pair?.detailed?.image_path }
                                                imageFolder='detailed'
                                                width={127}
                                                height={100}
                                                skeletonWidth="130px"
                                                skeletonHeight="131px"
                                                imageAlt={ product?.product }
                                                object_id={product?.product_id}
                                                object_type={`prd`}
                                              />
                                            </div>
                                          </Col>
                                        );
                                      }) :
                                      new Array(4).fill("", 0, 4).map((_, i) => {
                                        return(
                                          <Col key={`factoryProduct_${factory?.company_id}_${i}`}>
                                            <div className="rounded-10 shadow-y-2 text-center factory--productImage">
                                              <ShowResponsiveImage
                                                skeletonWidth="100%"
                                                skeletonHeight="100px"
                                              />
                                            </div>
                                          </Col>
                                        );
                                      })

                                    }
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>

                        <Col className="align-self-end factory--bottomSection" span={24}>
                          <Row className="d-lg-none row-cols-3 factory--profileDetails" gutter={15}>
                            <Col>
                              <Row gutter={ [ 0, 5 ] }>
                                <Col className="profileDetail--value text-black text-truncate" span={ 24 }>
                                  {factory?.production_capability?.total_employees || "..."}
                                </Col>
                                <Col className="profileDetail--variable text-92 font-weight-600 text-truncate" span={ 24 }>
                                  {t(__('Total employees'))}
                                </Col>
                              </Row>
                            </Col>

                            <Col>
                              <Row gutter={ [ 0, 5 ] }>
                                <Col className="profileDetail--value text-black text-truncate" span={ 24 }>
                                  {factory?.production_capability?.factory_size || "..."}
                                </Col>
                                <Col className="profileDetail--variable text-92 font-weight-600 text-truncate" span={ 24 }>
                                  {t(__('Factory size'))}
                                </Col>
                              </Row>
                            </Col>

                            <Col>
                              <Row gutter={ [ 0, 5 ] }>
                                <Col className="profileDetail--value text-black text-truncate" span={ 24 }>
                                  {factory?.production_capability?.r_and_d_employees || "..."}
                                </Col>
                                <Col className="profileDetail--variable text-92 font-weight-600 text-truncate" span={ 24 }>
                                  {t(__('R&D employees'))}
                                </Col>
                              </Row>
                            </Col>
                          </Row>

                          <Row justify="space-between">
                            <Col className="factory--location">
                              <i className="fal fa-map-marker-alt text-primary" />
                              <span className="text-47">{ factory?.general?.country }, { factory?.general?.state }</span>
                            </Col>

                            <Col>
                              <Button
                                icon={ <i className="far fa-address-book vv-font-size-1-7"/> }
                                className="p-0 bg-transparent border-0 factory--contacts"
                                size={ "large" }
                                onClick={() => showContactUsModal(factory?.company_id)}
                              >
                                { t(__('Contacts')) }
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  {/* Contact Us Modal: */}
                  <Modal
                    className="factory--contactUs__modal"
                    title={ factory?.general?.company }
                    style={{ top: width < 992 && 10 }}
                    visible={isContactUsModal[factory?.company_id] || false}
                    onCancel={() => { handleContactUsModalClose(factory?.company_id) }}
                    footer={false}
                  >
                    <Row className="row-cols-1" gutter={[0, 20]}>

                      {factory?.contact_us?.full_name &&
                      <Col>
                        <Row gutter={width >= 992 ? 16 : 0}>
                          <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                            { t('supervisor') }:
                          </Col>
                          <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                            { factory?.contact_us?.full_name }
                          </Col>
                        </Row>
                      </Col>
                      }

                      {factory?.contact_us?.telephone &&
                      <Col>
                        <Row gutter={width >= 992 ? 16 : 0}>
                          <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                            { t('telephone') }:
                          </Col>
                          <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                            { factory?.contact_us?.telephone }
                          </Col>
                        </Row>
                      </Col>
                      }

                      {factory?.contact_us?.whatsapp &&
                      <Col>
                        <Row gutter={width >= 992 ? 16 : 0}>
                          <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                            { t('whatsapp') }:
                          </Col>
                          <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                            { factory?.contact_us?.whatsapp }
                          </Col>
                        </Row>
                      </Col>
                      }

                      {factory?.contact_us?.address &&
                      <Col>
                        <Row gutter={width >= 992 ? 16 : 0}>
                          <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                            { t('address') }:
                          </Col>
                          <Col xs={15} lg={19} className="text-47 contactUs--modal__value">

                            { factory?.contact_us?.country && `${factory?.contact_us?.country} - ` }

                            { factory?.contact_us?.state && `${factory?.contact_us?.state} - ` }

                            { factory?.contact_us?.address &&
                            <span dangerouslySetInnerHTML={{ __html: factory?.contact_us?.address }} />
                            }

                          </Col>
                        </Row>
                      </Col>
                      }

                      {(!factory?.contact_us?.full_name && !factory?.contact_us?.telephone && !factory?.contact_us?.whatsapp && !factory?.contact_us?.address) &&
                      <Col>
                        <Row gutter={width >= 992 ? 16 : 0}>
                          <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                            { t('email') }:
                          </Col>
                          <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                            { factory?.general?.email }
                          </Col>
                        </Row>
                      </Col>
                      }

                    </Row>
                  </Modal>
                </Col>
              </Fragment>
            );
          }

          return (
            <Col xs={12} lg={6} key = { `FactoryOneColumn_free_${factory?.company_id}` } className={ `factory--container storeType--free ${selectedStoreId === factory?.company_id ? "byParam" : ""}` }>
              <Row className="bg-white rounded-10 border border-70 h-100" gutter={[0, 7]}>
                <Col className="factory--topSection" span={24}>
                  <Row>
                    <Col span={24} className="factory--logo text-center">
                      <FactoriesLogo
                        logo={ factory?.logo }
                        imageAlt={ factory?.general?.company }
                        object_id={factory?.company_id}
                        store_type="F"
                      />
                    </Col>

                    <Col span={24} className="text-truncate text-33 factory--name">
                      {factory?.general?.company}
                    </Col>

                    <Col span={24} className="factory--aboutUs mt-2">
                      {factory?.about_us ?
                        <TextTruncate
                          className="text-33 factory--aboutUs__paragraph"
                          line={ width >= 993 ? 4 : 3 }
                          element="div"
                          truncateText=" …"
                          text={ factory?.about_us && `${t(__('About Us'))}: ${factory?.about_us}` }
                        /> :
                        <Skeleton className="factory--aboutUs__empty" active={false} paragraph={{ rows: 3 }} />
                      }
                    </Col>
                  </Row>
                </Col>

                <Col className="factory--bottomSection align-self-end" span={24}>
                  <Row justify="space-between">
                    <Col className="factory--location">
                      <i className="fal fa-map-marker-alt text-primary" />
                      <span className="text-47">{ factory?.general?.country }, { factory?.general?.state }</span>
                    </Col>

                    <Col>
                      <Button
                        icon={ <i className="far fa-address-book vv-font-size-1-7"/> }
                        className="p-0 bg-transparent border-0 factory--contacts"
                        size={ "large" }
                        onClick={() => showContactUsModal(factory?.company_id)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Modal
                className="factory--contactUs__modal"
                title={ factory?.general?.company }
                style={{ top: width < 992 && 10 }}
                visible={isContactUsModal[factory?.company_id] || false}
                onCancel={() => { handleContactUsModalClose(factory?.company_id) }}
                footer={false}
              >
                <Row className="row-cols-1" gutter={[0, 20]}>

                  {factory?.contact_us?.full_name &&
                  <Col>
                    <Row gutter={width >= 992 ? 16 : 0}>
                      <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                        { t('supervisor') }:
                      </Col>
                      <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                        { factory?.contact_us?.full_name }
                      </Col>
                    </Row>
                  </Col>
                  }

                  {factory?.contact_us?.telephone &&
                  <Col>
                    <Row gutter={width >= 992 ? 16 : 0}>
                      <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                        { t('telephone') }:
                      </Col>
                      <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                        { factory?.contact_us?.telephone }
                      </Col>
                    </Row>
                  </Col>
                  }

                  {factory?.contact_us?.whatsapp &&
                  <Col>
                    <Row gutter={width >= 992 ? 16 : 0}>
                      <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                        { t('whatsapp') }:
                      </Col>
                      <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                        { factory?.contact_us?.whatsapp }
                      </Col>
                    </Row>
                  </Col>
                  }

                  {factory?.contact_us?.address &&
                  <Col>
                    <Row gutter={width >= 992 ? 16 : 0}>
                      <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                        { t('address') }:
                      </Col>
                      <Col xs={15} lg={19} className="text-47 contactUs--modal__value">

                        { factory?.contact_us?.country && `${factory?.contact_us?.country} - ` }

                        { factory?.contact_us?.state && `${factory?.contact_us?.state} - ` }

                        { factory?.contact_us?.address &&
                        <span dangerouslySetInnerHTML={{ __html: factory?.contact_us?.address }} />
                        }

                      </Col>
                    </Row>
                  </Col>
                  }

                  {(!factory?.contact_us?.full_name && !factory?.contact_us?.telephone && !factory?.contact_us?.whatsapp && !factory?.contact_us?.address) &&
                  <Col>
                    <Row gutter={width >= 992 ? 16 : 0}>
                      <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                        { t('email') }:
                      </Col>
                      <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                        { factory?.general?.email }
                      </Col>
                    </Row>
                  </Col>
                  }

                </Row>
              </Modal>
            </Col>
          );

        })
      }
    </>
  )
};

export default FactoryOneColumn;
