import React, { Fragment } from 'react';

// import style file:
import './styles/FeaturesGrid.less';
import { Col, Image, Row, Skeleton, Space } from "antd";
import {useTranslation} from "react-i18next";
import {__} from "../../utilities/functions/Helper";

import ShowResponsiveImage from "./ShowResponsiveImage";

const FeaturesGrid = (props) => {

    const { t } = useTranslation();

    const { features, isLoading } = props;

    return (
        <>
          {/* show 6 feature in here */}
          <Row className="row-cols-4" gutter={[7, 20]}>

            {
              (isLoading || !features) ?
                Array.from({ length: 13 })?.map((_, i) => <Skeleton.Input key={`FeaturesGridLoading_${i}`} style={{ width: `calc(60% - ${i + 10}px)`, height: 22 }} active size={"small"} />) :

                (features && features.length !== 0) &&
                  Object.entries(features)
                    .filter(([key]) => key !== "3231" && key !== "3260" && key !== "3274" && key !== "3276")
                    .slice(0, 6)
                    .map(([key, feature]) => {
                      return(
                        <Fragment key={`FeaturesGrid_features_${key}`}>
                          <Col className="features--variant">
                            { t(__(feature?.description)) } { feature?.suffix && `(${feature?.suffix})` }
                          </Col>

                          <Col className="features--value">
                            { feature?.value && <span>{ t(__(feature?.value)) }</span> }

                            { feature?.value_int && <span>{ parseFloat(feature?.value_int).toFixed(0) }</span> }

                            {
                              (feature?.variants && feature?.variants?.length !== 0) &&
                                Object.entries(feature?.variants).map(([key, variant]) => {
                                  return (
                                    <span key={`features_variants_${key}`}>
                                      { t(__(variant?.variant)) }
                                    </span>
                                  );
                                })
                            }
                          </Col>
                        </Fragment>
                      );
                    })
            }

          </Row>

          {/* show Management Certification & Product Certification feature in here */}
          <Row className="row-cols-2 mt-5" gutter={[7, 25]}>

            {
              (isLoading || !features) ?
                Array.from({ length: 5 })?.map((_, i) => <Skeleton.Input key={`FeaturesGridLoading_${i}`} style={{ width: `calc(60% - ${i + 10}px)`, height: 22 }} active size={"small"} />) :

                (features && features.length !== 0) &&
                  Object.entries(features)
                    .filter(([key]) => key === "3231" || key === "3260")
                    .map(([key, feature]) => {
                      return(
                        <Fragment key={`FeaturesGrid_features_${key}`}>
                          <Col className="features--variant">
                            { t(__(feature?.description)) } { feature?.suffix && `(${feature?.suffix})` }
                          </Col>

                          <Col className="features--value">
                            <Space size={"large"}>
                              {
                                Object.entries(feature?.variants)
                                  .slice(0, 4)
                                  .map(([key, variant]) => {
                                    return (
                                      <div key={`features_variants_${key}`} className="certificationImages--container">
                                        <div className="certifi
                                        cationImages--image">
                                          { variant?.image ?
                                            <ShowResponsiveImage
                                              imagePath={ variant?.image }
                                              imageFolder='detailed'
                                              width={50}
                                              height={50}
                                              imageAlt={ variant?.variant }
                                              object_id={variant?.variant_id}
                                              object_type={`feature_img`}
                                            /> :
                                            <Image
                                              width={50}
                                              height={50}
                                              preview={false}
                                              src="error"
                                              fallback="data:image/png;base64,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"
                                            />
                                          }
                                        </div>
                                        <div className="certificationImages--title text-center">
                                          { variant?.variant }
                                        </div>
                                      </div>
                                    );
                                  })
                              }
                            </Space>
                          </Col>
                        </Fragment>
                      );
                    })
            }

          </Row>
        </>
    );
};

export default FeaturesGrid;