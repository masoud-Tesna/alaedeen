import React from 'react';

// import styles:
import './styles/ShipProductsBanner.less';

// import Ant Design Components:
import { Button, Col, Row } from "antd";

const ShipProductsBanner = () => {
  return (
    <div className="h-100 shipProductsBanner--container">
      <Row className="h-100 px-5 pt-4 shipProductsBanner--content">
        <Col className="shipProductsBanner--content__topSection" span={24}>
          <div className="text-black vv-font-size-2-2 font-weight-bold shipProductsBanner--content__caption1">Ready-to-ship products</div>
          <div className="text-black vv-font-size-1-9 font-weight-500 mt-3 shipProductsBanner--content__caption2">
            Source from products that are ready to ship, and leave the facility within 15 days.
          </div>
        </Col>
        <Col span={24} className="text-center shipProductsBanner--content__btn">
          <Button className="p-0 bg-white border-0" type="primary" shape="round" size="large">
            View more
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ShipProductsBanner;