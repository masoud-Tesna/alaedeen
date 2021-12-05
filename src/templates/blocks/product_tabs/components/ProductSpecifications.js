// import ant design components:
import { Col, Row, Skeleton, Table  } from "antd";

import { useGetConfig } from "../../../../contexts/config/ConfigContext";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../../../functions";
import { __ } from "../../../../functions/Helper";
import React from "react";


const ProductSpecifications = ({ product, isLoading }) => {


  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  // get screen width:
  const { width } = useWindowSize();

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
            <Col span={24} className="text-70 font-weight-bold productSpecifications--title">{t(__('Technical Specifications'))}:</Col>

            {(product?.has_options && product?.variants_product.length) &&
              <Col span={24} className="variationsProducts--feature">
                <h1>Table</h1>
              </Col>
            }
          </Row>
        }
      </Col>
    </Row>
  );
};

export default ProductSpecifications;
