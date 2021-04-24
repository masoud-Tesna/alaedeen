import React from 'react';

// import Style LESS File:
import './home.less';

// import Design:
import { Col, Row } from "antd";

// import blocks:
import CategoriesMultiColumn from "../layouts/blocks/categories/CategoriesMultiColumn";
import HomeLogisticsBanner from "../layouts/blocks/static_templates/HomeLogisticsBanner";
import { OneRequestMultipleQuotes as RequestForm } from "../layouts/blocks/static_templates/OneRequestMultipleQuotes";
import RequestsList from "../layouts/blocks/static_templates/RequestsList";

const Home = () => {
  return (
    <div className="topSection--container bg-white">
      <Row gutter={24}>
        <Col span={6}>
          <CategoriesMultiColumn />
        </Col>

        <Col span={12}>
          <HomeLogisticsBanner />
        </Col>

        <Col span={6}>
          <Row className="h-100">
            <Col className="topSection--requestForm" span={24}>
              <RequestForm />
            </Col>
            <Col className="topSection--requestsList" span={24}>
              <RequestsList />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export { Home };