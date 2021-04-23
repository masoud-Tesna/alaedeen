import React from 'react';

// import Style LESS File:
import './home.less';

// import Design:
import { Col, Row } from "antd";

// import blocks:
import CategoriesMultiColumn from "../layouts/blocks/categories/CategoriesMultiColumn";
import HomeLogisticsBanner from "../layouts/blocks/static_templates/HomeCarousel";

const Home = () => {
  return (
    <div className="topSection--container">
      <Row gutter={24}>
        <Col span={6}>
          <CategoriesMultiColumn />
        </Col>

        <Col span={12}>
          <HomeLogisticsBanner />
        </Col>

        <Col span={6}>
          test
        </Col>
      </Row>
    </div>
  );
};

export { Home };