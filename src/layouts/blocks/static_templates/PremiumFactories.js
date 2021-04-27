import React from 'react';

// import Style File:
import './styles/PremiumFactories.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

const PremiumFactories = () => {
  return (
    <div className="PremiumFactories--container">
      <Row>
        <Col className="PremiumFactories--caption__content" span={24}>
          <Row justify="space-between">
            <Col className="text-33 text-uppercase vv-font-size-3 font-weight-bold">
              Premium OEM Factories
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

export default PremiumFactories;