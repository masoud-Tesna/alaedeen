import React from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';

// import style file:
import './styles/RequestsList.less';

// import ant design:
import { Col, Row } from "antd";

const RequestsList = () => {
  return (
    <div className="h-100 requestsList--container">
      <Row className="rounded-lg h-100 requestsList--content" align="middle">
        <Col className="px-4" span={24}>
          <div className="font-weight-600 vv-font-size-1-6 text-black">Request for Quotation</div>
        </Col>
        <Col className="px-2 requestsList--items" span={24}>
          <ScrollContainer className="text-select-none d-flex requestsList--scrollContainer">
            <div className="d-inline requestsList--item__content">
              <Row className="p-2 bg-white rounded-lg requestsList--item">
                <Col span={12} className="text-left text-black vv-font-size-1-1rem my-auto">
                  Red Carpet
                </Col>
                <Col span={12} className="text-right text-primary vv-font-size-0-9 my-auto">
                  27 March, 2021
                </Col>
                <Col span={24} className="text-70 vv-font-size-0-9">
                  Buyer is looking for 'Red Carpet'.
                </Col>
                <Col span={24} className="mt-3 px-2 pb-1 border-bottom border-8b">
                  <Row justify="space-between">
                    <Col>
                      <i className="fal fa-map-marker-alt text-primary" />
                      <span className="text-47 vv-font-size-0-9">Damascus, Syria</span>
                    </Col>
                    <Col>
                      2
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="d-inline requestsList--item__content">
              <Row className="p-2 bg-white rounded-lg requestsList--item">
                <Col span={12} className="text-left text-black vv-font-size-1">
                  Red Carpet
                </Col>
                <Col span={12} className="text-right text-primary vv-font-size-1">
                  27 March, 2021
                </Col>
              </Row>
            </div>

            <div className="d-inline requestsList--item__content">
              <Row className="p-2 bg-white rounded-lg requestsList--item">
                <Col span={12} className="text-left text-black vv-font-size-1">
                  Red Carpet
                </Col>
                <Col span={12} className="text-right text-primary vv-font-size-1">
                  27 March, 2021
                </Col>
              </Row>
            </div>
          </ScrollContainer>
        </Col>
      </Row>
    </div>
  );
};

export default RequestsList;