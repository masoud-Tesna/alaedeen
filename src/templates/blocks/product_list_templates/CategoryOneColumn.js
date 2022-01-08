import { Fragment } from 'react';

// import style file:
import './styles/CategoryOneColumn.less';
import { Button, Col, Row, Space } from "antd";
import { useWindowSize } from "../../../functions";
import TextTruncate from "react-text-truncate";
import { __, fn_stripHtml } from "../../../functions/Helper";
import { useTranslation } from "react-i18next";

import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import { Link } from "react-router-dom";
import {
  PrdFeatures_MULTIPLE_CHECKBOX,
  PrdFeatures_NUMBER_FIELD, PrdFeatures_SELECTABLE,
  PrdFeatures_SINGLE_CHECKBOX,
  PrdFeatures_TEXT_FIELD
} from "../../common/FeatureTypeConst";

const CategoryOneColumn = (props) => {

  const { t } = useTranslation();

  // get screen width:
  const { width } = useWindowSize();

  // product data:
  const { product } = props;

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
                <span key={`features_variants_${variant.variant_id}`}>
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
                <span key={`features_variants_${variant.variant_id}`} className="feature--multiple">
                  {variant.variant}
                </span>
              );
            })
          )
        }
      default: return <span className="textField">--</span>
    }

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

        <Col flex="1 1" className="text-truncate pt-4">
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
                        <Col key={`features_${key}`}>
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
                        <Col key={`features_${key}`}>
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
                          <i className={ `flag-icon flag-icon-${product?.manufacturing_country?.toString().trim().toLowerCase()} vv-font-size-2 align-bottom` } /> { product?.manufacturing_country }
                        </div>
                        }


                      </Space>
                    </Col>
                    <Col span={12} className="productsOneColumnVertical--item__sendRequestBtn-phoneNumber text-right">
                      <div>
                        {product?.agent_whatsApp_number ?
                          <a className="text-primary" href={ `whatsapp://send?abid=${product?.agent_whatsApp_number}&text=` }>
                            <i className="fab fa-whatsapp vv-font-size-2" style={{ verticalAlign: "sub", marginRight: ".5rem" }} /> {product?.agent_whatsApp_number}
                          </a> :
                          product?.agent_phone_number &&
                          <a className="text-primary" href={ `tel:${product?.agent_phone_number}` }>
                            <i className="fal fa-phone vv-font-size-2" style={{ marginRight: ".5rem" }}/> {product?.agent_phone_number}
                          </a>
                        }

                        <Button className="border border-primary p-0 productsOneColumnVertical--item__sendRequestBtn" size="large">{t(__('send request'))}</Button>
                      </div>

                    </Col>
                  </> :
                  <>
                    <Col className="productsOneColumnVertical--item__location">
                      <i className="icon-vv-location text-ab vv-font-size-2-2" /> { product?.wk_location }
                    </Col>
                    <Col className="productsOneColumnVertical--item__manufacturingLocation">
                      <i className={ `flag-icon flag-icon-${product?.manufacturing_country?.toString().trim().toLowerCase()} vv-font-size-2 align-bottom` } /> { product?.manufacturing_country }
                    </Col>
                  </>
                }

              </Row>
            </Col>
          </Row>
        </Col>

      </Row>
      <Link className="productsOneColumnVertical--item__link" to={`/product/${product?.seo_name}`} />
    </Col>
  );
};

export default CategoryOneColumn;
