import React from 'react';

//import Style:
import './styles/Stats.less';
import { Col, Row } from "antd";

const Stats = () => {
  return (
    <div className="stats--container">
      <Row className="h-100 stats--content" justify="space-around" align="middle">
        <Col className="text-center text-white" span={5}>
          <div className="vv-font-size-2-2 font-weight-600 text-shadow">Registered Users</div>
          <div className="vv-font-size-4 font-weight-bold text-shadow">1527</div>
        </Col>
        <Col className="text-center text-white" span={5}>
          <div className="vv-font-size-2-2 font-weight-600 text-shadow">Total Products</div>
          <div className="vv-font-size-4 font-weight-bold text-shadow">1646</div>
        </Col>
        <Col className="text-center text-white" span={5}>
          <div className="vv-font-size-2-2 font-weight-600 text-shadow">Total Categories</div>
          <div className="vv-font-size-4 font-weight-bold text-shadow">197</div>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;