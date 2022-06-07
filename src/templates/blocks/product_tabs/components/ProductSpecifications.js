// import ant design components:
import { Col, Row, Skeleton } from "antd";

import { useTranslation } from "react-i18next";
import { __ } from "../../../../utilities/functions/Helper";

//import feature type const:
import {
  PrdFeatures_GROUP,
  PrdFeatures_SINGLE_CHECKBOX,
  PrdFeatures_MULTIPLE_CHECKBOX,
  PrdFeatures_NUMBER_FIELD,
  PrdFeatures_TEXT_FIELD,
  PrdFeatures_SELECTABLE
} from "../../../common/FeatureTypeConst";
import ShowResponsiveImage from "../../../common/ShowResponsiveImage";

const ProductSpecifications = ({ product, isLoading }) => {

  const { t } = useTranslation();

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
        if (feature.feature_id === "3231" || feature.feature_id === "3260") {
          return (
            <Row gutter={[16, 16]}>
              {
                Object.values(feature?.variants).map(variant => {
                  return(
                    <Col key={`ProductSpecifications_PrdFeatures_MULTIPLE_CHECKBOX${variant.variant_id}`}>
                      <div className="certificationImages--image text-center">
                        <ShowResponsiveImage
                          imagePath={ variant?.image }
                          imageFolder='detailed'
                          width={35}
                          height={35}
                          skeletonWidth="35px"
                          skeletonHeight="35px"
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
        }
        else if (feature.feature_id === "3247") {
          return (
            <Row gutter={[16, 16]}>
              {
                Object.values(feature?.variants).map(variant => {
                  const featureColor = (variant.variant_color).toString().trim().toLowerCase().replaceAll(" ", "-")
                  return(
                    <Col key={`ProductSpecifications_PrdFeatures_MULTIPLE_CHECKBOX${variant.variant_id}`}>
                      <span className={`colorFeature--icon ${featureColor} align-middle`} /> <span className="colorFeature--title align-middle">{variant.variant}</span>
                    </Col>
                  );
                })
              }
            </Row>
          )
        }
        else {
          return (
            <Row gutter={[16, 16]}>
              {
                Object.values(feature?.variants).map(variant => {
                  return(
                    <Col key={`ProductSpecifications_PrdFeatures_MULTIPLE_CHECKBOX${variant.variant_id}`}>
                      <span className="colorFeature--title align-middle">{variant.variant}</span>
                    </Col>
                  );
                })
              }
            </Row>
          )
        }
      default: return <span className="textField">--</span>
    }

  }

  let featureTableHeader = [];

  if (!isLoading && product?.variants_product) {
    featureTableHeader = product?.variants_product[0]?.product_features
  }

  return (
    <Row className="productSpecifications--container">
      <Col span={24} className="productSpecifications--sections">
        {isLoading ?
          <>
            <Skeleton active paragraph={{ rows: 6 }} />
            <Row className="mt-4">
              <Col span={12}>
                <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "calc(.5 * 65vw + 50%)", "--text-height": "2.55vh" }} active size="small" />
              </Col>

              <Col span={12}>
                <Row gutter={[0, 10]} className="skeletons--circle">
                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "15vw", "--text-height": "2vh" }} active size="small" />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "8vw", "--text-height": "2vh" }} active size="small" />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "10vw", "--text-height": "2vh" }} active size="small" />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "10vw", "--text-height": "2vh" }} active size="small" />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "22vw", "--text-height": "2vh" }} active size="small" />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Skeleton active paragraph={{ rows: 3 }} />
            <Row className="mt-4">
              <Col span={12}>
                <Skeleton.Input className="productSkeleton--text" style={{ "--text-width": "25vw", "--text-height": "2.55vh" }} active size="small" />
              </Col>

              <Col span={12}>
                <Row gutter={[0, 10]} className="skeletons--circle">
                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "25vw", "--text-height": "2vh" }} active size="small" />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "7vw", "--text-height": "2vh" }} active size="small" />
                  </Col>

                  <Col>
                    <Skeleton.Avatar className="productSkeleton--circle" active="true" size="small" shape="circle" style={{ "--circle-width": "5.6vw", "--circle-height": "5.6vw" }} />
                    <Skeleton.Input className="productSkeleton--text" style={{"--text-width": "14vw", "--text-height": "2vh" }} active size="small" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </> :
          <Row gutter={[0, 15]}>
            {(product?.variants_product?.length || Object?.values(product?.product_features)?.length) &&
              <Col span={24} className="text-70 font-weight-bold productSpecifications--title">{t(__('Technical Specifications'))}:</Col>
            }

            {(product?.variants_product?.length) &&
              <Col span={24} className="variationsProducts--feature">
                <table>
                  <thead>
                    <tr>
                      <th>{t(__('product / code'))}</th>
                      <th>{t(__('price'))}</th>
                      {
                        Object.values(featureTableHeader).map(feature => {
                          return (
                            <th key={`featureTableHeader_${feature.feature_id}`}>
                              {feature.description} &nbsp;
                              { Object.values(feature.subfeatures).filter(sub => sub.feature_code === 'S').map(sub => {
                                return(
                                  <span key={`featureTableHeader_${feature.feature_id}_span_${sub.variant_id}`}>({sub.variants[sub.variant_id].variant})</span>
                                );
                              }) }
                            </th>
                          );
                        })
                      }
                    </tr>
                  </thead>

                  <tbody>
                    {
                      product?.variants_product.map((product_variant, i) => {

                        const productVariantPrice = parseFloat(product_variant?.price).toFixed(2);

                        return(
                          <tr key={`featureTableBody_${i}`}>
                            <td>
                              {product_variant.product_code}
                            </td>

                            <td>
                              {productVariantPrice}
                            </td>

                            {
                              Object.values(product_variant.product_features).map(feature => {

                                return (
                                  <td key={`featureTableBody_${i}_item_${feature.feature_id}`}>
                                    { Object.values(feature.subfeatures).filter(sub => sub.feature_code === 'P').map(sub => {

                                      const toFloatInt = parseFloat(sub?.value_int).toFixed(0);

                                      return(
                                        <span key={`featureTableBody_${i}_item_${feature.feature_id}_${toFloatInt}`}>{toFloatInt}</span>
                                      );
                                    }) }
                                  </td>
                                );
                              })
                            }

                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </Col>
            }

            {Object.values(product?.product_features)?.length &&
              <Col span={24} className="products--features">
                <Row className="row-cols-1 row-cols-md-2" gutter={[0, 20]}>

                  {
                    Object.values(product?.product_features).filter(f => f.variations_product !== 'Y' && f.feature_type !== PrdFeatures_GROUP).map(feature => {

                      return(
                        <Col key={`ProductSpecifications_featuresList${feature.feature_id}`}>
                          <Row gutter={12}>
                            <Col className="features--variant">
                              { feature?.description }{ feature?.suffix && ` (${feature?.suffix})` } :
                            </Col>

                            <Col className="features--value">
                              {FeatureVariant(feature)}
                            </Col>
                          </Row>
                        </Col>
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
