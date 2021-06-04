import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

// import style file:
import './styles/RequestsList.less';

// import ant design:
import { Col, Row } from "antd";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

const RequestsList = () => {

  const { t } = useTranslation();

  return (
    <div className="h-100 requestsList--container">
      <Row className="rounded-lg h-100 requestsList--content py-4 py-lg-0" align="middle">
        <Col className="px-4 mb-3 mb-lg-0" span={24}>
          <div className="font-weight-bold vv-font-size-2-2 text-black requestsList--caption">{ t(__('Request for Quotation')) }</div>
        </Col>
        <Col className="px-2 requestsList--items" span={24}>
          <ScrollContainer className="text-select-none d-flex requestsList--scrollContainer">
            <div className="d-inline requestsList--item__content">
              <Row className="p-3 bg-white rounded-lg requestsList--item">
                <Col span={12} className="text-left text-black vv-font-size-1-9 my-auto">
                  Red Carpet
                </Col>
                <Col span={12} className="text-right text-primary vv-font-size-1-5 my-auto">
                  27 March, 2021
                </Col>
                <Col span={24} className="text-70 vv-font-size-1-5 requestsList--item__buyerLooking">
                  { t(__('Buyer is looking for')) } 'Red Carpet'.
                </Col>
                <Col span={24} className="mt-3 px-2 pb-1 border-bottom border-8b">
                  <Row justify="space-between">
                    <Col>
                      <i className="fal fa-map-marker-alt text-primary vv-font-size-1-9 mr-2" />
                      <span className="text-47 vv-font-size-1-6">Damascus, Syria</span>
                    </Col>
                    <Col className="align-self-end">
                      <i className="flag-icon flag-icon-iq vv-font-size-1-9" />
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="vv-font-size-1-7 text-center mt-2 requestsList--item__contact">
                  { t(__('Contact Buyer Now')) }
                </Col>
              </Row>
            </div>

            <div className="d-inline requestsList--item__content">
              <Row className="p-3 bg-white rounded-lg requestsList--item">
                <Col span={12} className="text-left text-black vv-font-size-1-9 my-auto">
                  Red Carpet
                </Col>
                <Col span={12} className="text-right text-primary vv-font-size-1-5 my-auto">
                  27 March, 2021
                </Col>
                <Col span={24} className="text-70 vv-font-size-1-5 requestsList--item__buyerLooking">
                  { t(__('Buyer is looking for')) } 'Red Carpet'.
                </Col>
                <Col span={24} className="mt-3 px-2 pb-1 border-bottom border-8b">
                  <Row justify="space-between">
                    <Col>
                      <i className="fal fa-map-marker-alt text-primary vv-font-size-1-9 mr-2" />
                      <span className="text-47 vv-font-size-1-6">Damascus, Syria</span>
                    </Col>
                    <Col className="align-self-end">
                      <i className="flag-icon flag-icon-iq vv-font-size-1-9" />
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="vv-font-size-1-7 text-center mt-2 requestsList--item__contact">
                  { t(__('Contact Buyer Now')) }
                </Col>
              </Row>
            </div>

            <div className="d-inline requestsList--item__content">
              <Row className="p-3 bg-white rounded-lg requestsList--item">
                <Col span={12} className="text-left text-black vv-font-size-1-9 my-auto">
                  Red Carpet
                </Col>
                <Col span={12} className="text-right text-primary vv-font-size-1-5 my-auto">
                  27 March, 2021
                </Col>
                <Col span={24} className="text-70 vv-font-size-1-5 requestsList--item__buyerLooking">
                  { t(__('Buyer is looking for')) } 'Red Carpet'.
                </Col>
                <Col span={24} className="mt-3 px-2 pb-1 border-bottom border-8b">
                  <Row justify="space-between">
                    <Col>
                      <i className="fal fa-map-marker-alt text-primary vv-font-size-1-9 mr-2" />
                      <span className="text-47 vv-font-size-1-6">Damascus, Syria</span>
                    </Col>
                    <Col className="align-self-end">
                      <i className="flag-icon flag-icon-iq vv-font-size-1-9" />
                    </Col>
                  </Row>
                </Col>
                <Col span={24} className="vv-font-size-1-7 text-center mt-2 requestsList--item__contact">
                  { t(__('Contact Buyer Now')) }
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