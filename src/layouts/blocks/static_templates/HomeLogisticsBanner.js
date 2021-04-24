import React from 'react';

// import Style File:
import './styles/HomeLogisticsBanner.less';
import { Button, Col, Row } from "antd";

const HomeLogisticsBanner = () => {
  return (
    <div className="homeLogisticsBanner--container h-100">
      <Row className="homeLogisticsBanner--content h-100">
        <Col className="homeLogisticsBanner--caption" span={11}>
          <div className="py-3 text-secondary font-weight-600 text-center homeLogisticsBanner--caption__text1">Logistics</div>
          <div className="px-3 py-3 text-white vv-font-size-1-2 homeLogisticsBanner--caption__text2">
            <div className="caption--text2__top pb-4">
              Worried about shipping?
            </div>
            <div className="caption--text2__middle pb-4">
              Send your goods through the most reliable shipping service providers.
            </div>
            <div className="caption--text2__bottom">
              Get the best price now!
            </div>
          </div>
          <div className="py-3 text-center homeLogisticsBanner--caption__btn">
            <Button className="text-white vv-font-size-1-2 px-4 py-0 rounded-lg bg-secondary border-0" size="large">
              Download
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeLogisticsBanner;