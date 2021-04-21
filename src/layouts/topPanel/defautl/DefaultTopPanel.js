import React from 'react';

// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Divider } from 'antd';

const DefaultTopPanel = () => {
  return (
    <Row className="bg-top-panel topPanel--container">
      <Col span={24} className="topPanel--col">
        <i className="icon-vv-all-category" />
        <Divider type="vertical" className="bg-a5"/>
        <a href="#">Link</a>
        <Divider type="vertical" />
        <a href="#">Link</a>
      </Col>
    </Row>
  );
};

export default DefaultTopPanel;