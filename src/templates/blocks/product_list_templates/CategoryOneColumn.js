// import style file:
import './styles/CategoryOneColumn.less';
import {Button, Col, Modal, Row, Space} from "antd";
import { useWindowSize } from "../../../utilities/functions";
import TextTruncate from "react-text-truncate";
import { __, fn_stripHtml } from "../../../utilities/functions/Helper";
import { useTranslation } from "react-i18next";

import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import { Link } from "react-router-dom";
import {
  PrdFeatures_MULTIPLE_CHECKBOX,
  PrdFeatures_NUMBER_FIELD, PrdFeatures_SELECTABLE,
  PrdFeatures_SINGLE_CHECKBOX,
  PrdFeatures_TEXT_FIELD
} from "../../common/FeatureTypeConst";
import {useState} from "react";

const CategoryOneColumn = (props) => {

  const { t } = useTranslation();

  // get screen width:
  const { width } = useWindowSize();

  // product data:
  const { product } = props;
  
  const { contact_us: contactUs } = product || {};

  const productPrice = parseFloat(product.price).toFixed(2);
  const productListPrice = parseFloat(product.list_price).toFixed(2);

  const FeatureVariant = (feature) => {

    switch (feature.feature_type) {
      case PrdFeatures_TEXT_FIELD :
        return(
          <span className="textField">{feature.value}</span>
        )
      case PrdFeatures_SINGLE_CHECKBOX :
        return(
          <span className="singleCheckbox">{feature.value === 'Y' ? t('yes') : t('no')}</span>
        )
      case PrdFeatures_NUMBER_FIELD :
        return(
          <span className="singleCheckbox">{feature.value_int && parseFloat(feature?.value_int).toFixed(0)}</span>
        )
      case PrdFeatures_SELECTABLE.find(type => type === feature.feature_type) :
        return(
          <span className="singleCheckbox">{ feature.variants[feature.variant_id].variant }</span>
        )
      case PrdFeatures_MULTIPLE_CHECKBOX :
        if (feature.feature_id === "3247") {
          return (
            Object.values(feature?.variants).map(variant => {
              const featureColor = (variant.variant_color).toString().trim().toLowerCase().replaceAll(" ", "-")
              return(
                <span key={`CategoryOneColumn_PrdFeatures_MULTIPLE_CHECKBOX_${variant.variant_id}`}>
                  <span className={`colorFeature--icon ${featureColor} align-middle`} /> <span className="colorFeature--title align-middle">{variant.variant}</span> &nbsp;&nbsp;
                </span>
              );
            })
          )
        }
        else {
          return (
            Object.values(feature?.variants).map(variant => {
              return(
                <span key={`CategoryOneColumn_PrdFeatures_MULTIPLE_CHECKBOX_${variant.variant_id}`} className="feature--multiple">
                  {variant.variant}
                </span>
              );
            })
          )
        }
      default: return <span className="textField">--</span>
    }

  }
  
  const [isContactUsModal, setIsContactUsModal] = useState(false);
  
  const showContactUsModal = () => {
    setIsContactUsModal(true);
  }
  
  const handleContactUsModalClose = () => {
    setIsContactUsModal(false);
  }

  return (
    <Col className="productsOneColumnVertical--item px-2" span={24}>
      <Row className="h-100 pb-3 pb-lg-0" justify="center" gutter={{ xs: 13, lg: 35 }}>

        <Col flex={ width >= 992 ? '195px' : '128px' } className="d-flex align-items-center justify-content-center productsOneColumnVertical--item__image">
          <div className="imageContent">
            <ShowResponsiveImage
              imagePath={ product?.main_pair?.detailed?.image_path }
              imageFolder='detailed'
              width={width >= 992 ? 160 : 115}
              height={width >= 992 ? 160 : 115}
              imageAlt={ product?.product }
              object_id={product?.product_id}
              object_type={`prd`}
            />
          </div>
        </Col>

        <Col flex="1 1" className="text-truncate pt-4 productsOneColumnVertical--item__details">
          <Row className="h-100" gutter={[0, 5]}>
            <Col span={24} className="text-47 font-weight-bold text-truncate productsOneColumnVertical--item__title">
              { product.product }
            </Col>

            {(productPrice !== "0.00") &&
            <Col span={24} className="productsOneColumnVertical--item__price">
              <span className={ `${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-3' } text-primary font-weight-bold` }>${ productPrice } </span>

              { productListPrice !== "0.00" &&
              <span className={ `${ width >= 992 ? 'vv-font-size-1-9' : 'vv-font-size-1-3' } text-primary font-weight-bold` }> - ${productListPrice}</span>
              }

              {product.quantity_unit &&
              <span className={ `${ width >= 992 ? 'vv-font-size-1-6' : 'vv-font-size-1-1' } text-92` }> / { product.quantity_unit }</span>
              }

              {(width < 992 && product?.min_qty && product?.quantity_unit) &&
                <>
                  <span className={ `${ width >= 992 ? 'vv-font-size-1-4' : 'vv-font-size-1-2rem' } text-47 ml-4` }>
                      { product.min_qty } { product.quantity_unit }
                    </span>
                  <span className={` ${ width >= 992 ? 'vv-font-size-1-2rem' : 'vv-font-size-1' } text-92 `}>
                      (MOQ)
                    </span>
                </>
              }

            </Col>
            }

            <Col span={24} className="productsOneColumnVertical--item__description d-none d-lg-block">
              <TextTruncate
                className="vv-font-size-1-5 text-47"
                line={1}
                element="div"
                truncateText="…"
                text={fn_stripHtml(product.full_description)}
              />
            </Col>

            <Col span={24} className="productsOneColumnVertical--item__features d-none d-lg-block">
              <Row className="row-cols-2" gutter={[12, 2]}>

                {
                  (product?.product_features && product?.product_features?.length !== 0) &&
                  Object.entries(product?.product_features)
                    .filter(([key]) => key !== "3231" && key !== "3260" && key !== "3274" && key !== "3276")
                    .slice(0, 6)
                    .map(([key, feature]) => {
                      return(
                        <Col key={`productsOneColumnVerticalFeatures_xl_${key}`}>
                          <div className="w-100 text-truncate">
                            <span className="features--variant">{ feature?.description }{ feature?.suffix && ` (${feature?.suffix})` } :</span> <span className="features--value">{FeatureVariant(feature)}</span>
                          </div>
                        </Col>
                      );
                    })
                }

              </Row>
            </Col>

            <Col span={24} className="productsOneColumnVertical--item__features d-lg-none d-block my-3">
              <Row className="row-cols-1" gutter={[0, 5]}>

                {
                  (product?.product_features && product?.product_features?.length !== 0) &&
                  Object.entries(product?.product_features)
                    .filter(([key]) => key !== "3231" && key !== "3260" && key !== "3274" && key !== "3276")
                    .slice(0, 4)
                    .map(([key, feature]) => {
                      return(
                        <Col key={`productsOneColumnVerticalFeatures_xs_${key}`}>
                          <div className="w-100 text-truncate">
                            <span className="features--variant">{ feature?.description }{ feature?.suffix && ` (${feature?.suffix})` } :</span> <span className="features--value">{FeatureVariant(feature)}</span>
                          </div>
                        </Col>
                      );
                    })
                }

              </Row>
            </Col>

            <Col span={24} className="border-bottom border-e6 productsOneColumnVertical--item__location-sendRequestBtn">
              <Row justify={"space-between"} align={"middle"}>
                {width >= 992 ?
                  <>
                    <Col span={12}>
                      <Space size={"large"}>

                        {product?.wk_location &&
                        <div className="productsOneColumnVertical--item__location">
                          <i className="icon-vv-location text-ab vv-font-size-2-2" /> { product?.wk_location }
                        </div>
                        }

                        {product?.manufacturing_country &&
                        <div className="productsOneColumnVertical--item__manufacturingLocation">
                          <i className={ `fi fi-${product?.manufacturing_country?.toString().trim().toLowerCase()} vv-font-size-2 align-bottom` } /> { product?.manufacturing_country }
                        </div>
                        }


                      </Space>
                    </Col>
                    <Col span={12} className="productsOneColumnVertical--item__sendRequestBtn-phoneNumber text-right">
                      <div>
                        <Button
                          icon={ <i className="far fa-address-book vv-font-size-1-7"/> }
                          className="p-0 bg-transparent border-0 shadow-none factory--contacts"
                          size={ "large" }
                          onClick={showContactUsModal}
                        >
                          { t(__('Contacts')) }
                        </Button>

                        <Button className="border border-primary p-0 productsOneColumnVertical--item__sendRequestBtn" size="large">{t(__('send request'))}</Button>
                      </div>
                    </Col>
                  </> :
                  <>
                    <Col className="productsOneColumnVertical--item__location">
                      <i className="icon-vv-location text-ab vv-font-size-2-2" /> { product?.wk_location }
                    </Col>
                    <Col className="productsOneColumnVertical--item__manufacturingLocation">
                      <i className={ `fi fi-${product?.manufacturing_country?.toString().trim().toLowerCase()} vv-font-size-2 align-bottom` } /> { product?.manufacturing_country }
                    </Col>
                  </>
                }

              </Row>
            </Col>
          </Row>
        </Col>

      </Row>
      <Link className="productsOneColumnVertical--item__link" to={`/product/${product?.seo_name}`} />
  
      <Modal
        className="factory--contactUs__modal"
        title={ contactUs?.company }
        visible={isContactUsModal}
        onCancel={handleContactUsModalClose}
        footer={false}
        destroyOnClose
      >
        <Row className="row-cols-1" gutter={[0, 20]}>
      
          {contactUs?.full_name &&
            <Col>
              <Row gutter={width >= 992 ? 16 : 0}>
                <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                  { t('supervisor') }:
                </Col>
                <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                  { contactUs?.full_name }
                </Col>
              </Row>
            </Col>
          }
      
          {contactUs?.telephone &&
            <Col>
              <Row gutter={width >= 992 ? 16 : 0}>
                <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                  { t('telephone') }:
                </Col>
                <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                  { contactUs?.telephone }
                </Col>
              </Row>
            </Col>
          }
      
          {contactUs?.whatsapp &&
            <Col>
              <Row gutter={width >= 992 ? 16 : 0}>
                <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                  { t('whatsapp') }:
                </Col>
                <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                  { contactUs?.whatsapp }
                </Col>
              </Row>
            </Col>
          }
      
          {contactUs?.address &&
            <Col>
              <Row gutter={width >= 992 ? 16 : 0}>
                <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                  { t('address') }:
                </Col>
                <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
              
                  { contactUs?.country && `${contactUs?.country} - ` }
              
                  { contactUs?.state && `${contactUs?.state} - ` }
              
                  { contactUs?.address &&
                    <span dangerouslySetInnerHTML={{ __html: contactUs?.address }} />
                  }
            
                </Col>
              </Row>
            </Col>
          }
      
          {(!contactUs?.full_name && !contactUs?.telephone && !contactUs?.whatsapp && !contactUs?.address) &&
            <Col>
              <Row gutter={width >= 992 ? 16 : 0}>
                <Col xs={9} lg={5} className="text-92 contactUs--modal__variable">
                  { t('email') }:
                </Col>
                <Col xs={15} lg={19} className="text-47 contactUs--modal__value">
                  { contactUs?.email }
                </Col>
              </Row>
            </Col>
          }
    
        </Row>
      </Modal>
      
    </Col>
  );
};

export default CategoryOneColumn;
