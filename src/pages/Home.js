import React from 'react';

// import Design:
import { Col, Row } from "antd";

// import blocks:
/*import CategoriesMultiColumn from "../layouts/blocks/categories/CategoriesMultiColumn";*/

const Home = () => {
  return (
    <Row >
      <Col span={6}>
        test
      </Col>

      <Col span={12}>
        test
      </Col>

      <Col span={6}>
        test
      </Col>
    </Row>
  );
};

export { Home };