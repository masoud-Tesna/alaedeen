import React, { Fragment } from "react";

// import ant design components:
import { Col, Image, Row, Skeleton, Space } from "antd";

import { useGetConfig } from "../../../../contexts/config/ConfigContext";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../../../functions";
import { __ } from "../../../../functions/Helper";

//import feature type const:
import {
  PrdFeatures_GROUP,
  PrdFeatures_SINGLE_CHECKBOX,
  PrdFeatures_MULTIPLE_CHECKBOX,
  PrdFeatures_NUMBER_FIELD,
  PrdFeatures_TEXT_FIELD,
  PrdFeatures_SELECTABLE
} from "../../product_templates/components/FeatureTypeConst";
import ShowResponsiveImage from "../../../common/ShowResponsiveImage";

const ProductSpecifications = ({ product, isLoading }) => {


  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  // get screen width:
  const { width } = useWindowSize();

  const FeatureVariant = (feature) => {

    {/*{feature.feature_type === PrdFeatures_TEXT_FIELD &&
          <span className="textField">{feature.value}</span>
        }

        {feature.feature_type === PrdFeatures_SINGLE_CHECKBOX &&
          <span className="singleCheckbox">{feature.value === 'Y' ? t('yes') : t('no')}</span>
        }

        {feature.feature_type === PrdFeatures_NUMBER_FIELD &&
          <span className="singleCheckbox">{feature.value_int && parseFloat(feature?.value_int).toFixed(0)}</span>
        }

        {PrdFeatures_SELECTABLE.includes(feature.feature_type) &&
          <span className="textField">
            {
              feature.variants[feature.variant_id].variant
            }
          </span>
        }

        {feature.feature_type === PrdFeatures_MULTIPLE_CHECKBOX &&
          ((feature.feature_id === 3221 || feature.feature_id === 3260) && ) ?
            <>certificate</> :
            <>baghy</>
        }*/}

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
        if (feature.feature_id === "3231" || feature.feature_id === "3260") {
          return (
            <Row gutter={[16, 16]}>
              {
                Object.values(feature?.variants).map(variant => {
                  return(
                    <Col key={`features_variants_${variant.variant_id}`} className="certificationImages--container2">
                      <div className="certificationImages--image">
                        <ShowResponsiveImage
                          imagePath={ variant?.image }
                          imageFolder='detailed'
                          width={35}
                          height={35}
                          skeletonWidth={35}
                          skeletonHeight={35}
                          imageAlt={ variant?.variant }
                          object_id={variant?.variant_id}
                          object_type={`feature_img`}
                        />
                      </div>
                      <div className="certificationImages--title text-center">
                        { variant?.variant }
                      </div>
                    </Col>
                  );
                })
              }
            </Row>
          )
        } else {
          return <span>Multiple</span>
        }
      default: return <span className="textField">--</span>
    }

  }

  return (
    <Row className="productSpecifications--container">
      <Col span={24} className="productSpecifications--sections">
        {isLoading ?
          <>
            <Skeleton active={true} paragraph={{ rows: 6 }} />
            <Row className="mt-4">
              <Col span={12}>
                <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "calc(.5 * 65vw + 50%)", "--text-height": "2.55vh" }} active={true} size={"small"} />
              </Col>

              <Col span={12}>
                <Row gutter={[0, 10]} className="skeletons--circle">
                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "15vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "8vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "10vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "10vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "22vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Skeleton active={true} paragraph={{ rows: 3 }} />
            <Row className="mt-4">
              <Col span={12}>
                <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "25vw", "--text-height": "2.55vh" }} active={true} size={"small"} />
              </Col>

              <Col span={12}>
                <Row gutter={[0, 10]} className="skeletons--circle">
                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "25vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "7vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "14vw", "--text-height": "2vh" }} active={true} size={"small"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </> :
          <Row gutter={[0, 15]}>
            {(product?.variants_product.length || Object.values(product?.product_features).length) &&
              <Col span={24} className="text-70 font-weight-bold productSpecifications--title">{t(__('Technical Specifications'))}:</Col>
            }

            {(product?.variants_product.length) &&
              <Col span={24} className="variationsProducts--feature">
                <h1>Table</h1>
              </Col>
            }

            {Object.values(product?.product_features).length &&
              <Col span={24} className="products--features">
                <Row className="row-cols-2 row-cols-md-4" gutter={[7, 20]}>

                  {
                    Object.values(product?.product_features).filter(f => f.variations_product !== 'Y' && f.feature_type !== PrdFeatures_GROUP).map(feature => {

                      return(
                        <Fragment key={`features_${feature.feature_id}`}>
                          <Col className="features--variant">
                            { t(__(feature?.description)) }{ feature?.suffix && ` (${feature?.suffix})` } : {feature.feature_type}
                          </Col>

                          <Col className="features--value">
                            {FeatureVariant(feature)}
                          </Col>
                        </Fragment>
                      );

                    })
                  }

                </Row>
              </Col>
            }

          </Row>
        }
      </Col>
    </Row>
  );
};

export default ProductSpecifications;
