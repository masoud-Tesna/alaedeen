import React from 'react';

//import Style:
import './styles/Stats.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

const Stats = () => {
  return (
    <div className="stats--container">
      <Row className="h-100 stats--content" justify="space-around" align="middle">
        <Col className="text-center text-white" span={5}>
          <div className="stats--content__title font-weight-600 text-shadow">Registered Users</div>
          <div className="stats--content__value font-weight-bold text-shadow">1527</div>
        </Col>
        <Col className="text-center text-white" span={5}>
          <div className="stats--content__title font-weight-600 text-shadow">Total Products</div>
          <div className="stats--content__value font-weight-bold text-shadow">1646</div>
        </Col>
        <Col className="text-center text-white" span={5}>
          <div className="stats--content__title font-weight-600 text-shadow">Total Stores</div>
          <div className="stats--content__value font-weight-bold text-shadow">26</div>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;