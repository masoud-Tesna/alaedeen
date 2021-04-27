import React from 'react';

// import style file:
import './styles/TopRankingProducts.less';
import { Col, Row } from "antd";
import { RightOutlined } from "@ant-design/icons";

const TopRankingProducts = () => {
  return (
    <div className="TopRankingProducts--container">
      <Row>
        <Col span={24}>
          <Row justify="space-between" className="TopRankingProducts--caption__content">
            <Col className="text-33 text-uppercase vv-font-size-3 font-weight-bold">
              TOP-RANKING PRODUCTS
            </Col>
            <Col className="my-auto">
              <a className="vv-font-size-1-8 text-33">View More <i
                className="far fa-chevron-right vv-font-size-1-8 ml-3" /></a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TopRankingProducts;