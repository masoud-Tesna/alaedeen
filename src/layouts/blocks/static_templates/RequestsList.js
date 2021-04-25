import React from 'react';

// import style file:
import './styles/RequestsList.less';

// import ant design:
import { Col, Row } from "antd";

const RequestsList = () => {
  return (
    <div className="h-100 requestsList--container">
      <Row className="rounded-lg h-100 px-4 requestsList--content" align="middle">
        <Col span={24}>
          <div className="font-weight-600 vv-font-size-1-6 text-black">Request for Quotation</div>
        </Col>
        <Col span={24}>

        </Col>
      </Row>
    </div>
  );
};

export default RequestsList;