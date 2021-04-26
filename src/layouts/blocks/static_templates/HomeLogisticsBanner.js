import React from 'react';

// import Style File:
import './styles/HomeLogisticsBanner.less';
import { Button, Col, Row } from "antd";

const HomeLogisticsBanner = () => {
  return (
    <div className="homeLogisticsBanner--container">
      <Row className="homeLogisticsBanner--content h-100">
        <Col className="homeLogisticsBanner--caption" span={11}>
          <Row className="h-100" align="middle">
            <Col span={24} className="py-3 text-secondary font-weight-600 text-center vv-font-size-4 homeLogisticsBanner--caption__text1">Logistics</Col>
            <Col span={24} className="px-3 py-3 text-white vv-font-size-1-2 homeLogisticsBanner--caption__text2">
              <div className="caption--text2__top vv-font-size-2 pb-5">
                Worried about shipping?
              </div>
              <div className="caption--text2__middle vv-font-size-2 pb-5">
                Send your goods through the most reliable shipping service providers.
              </div>
              <div className="caption--text2__bottom vv-font-size-2">
                Get the best price now!
              </div>
            </Col>
            <Col span={24} className="py-3 text-center homeLogisticsBanner--caption__btn">
              <Button className="text-white vv-font-size-1-2 rounded-lg bg-secondary border-0" size="large">
                Go to page
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomeLogisticsBanner;