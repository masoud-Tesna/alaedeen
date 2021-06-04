// import Style File:
import './styles/HomeLogisticsBanner.less';
import { Col, Row } from "antd";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

const HomeLogisticsBanner = () => {

  const { t } = useTranslation();

  return (
    <div className="homeLogisticsBanner--container">
      <Row className="homeLogisticsBanner--content h-100">
        <Col className="homeLogisticsBanner--caption" span={11}>
          <Row className="h-100 homeLogisticsBanner--details" align="middle">
            {/*Desktop*/}
            <Col span={24} className="d-none d-lg-block py-3 text-secondary font-weight-600 text-center vv-font-size-4 homeLogisticsBanner--caption__text1">{ t(__('Logistics')) }</Col>
            <Col span={24} className="d-none d-lg-block px-3 py-3 text-white vv-font-size-1-2 homeLogisticsBanner--caption__text2">
              <div className="caption--text2__top vv-font-size-2 pb-5">
                { t(__('Worried about shipping?')) }
              </div>
              <div className="caption--text2__middle vv-font-size-2 pb-5">
                { t(__('Send your goods through the most reliable shipping service providers.')) }
              </div>
              <div className="caption--text2__bottom vv-font-size-2">
                { t(__(' Get the best price now!')) }
              </div>
            </Col>
            {/*Mobile*/}
            <Col span={24} className="d-lg-none py-0 py-lg-3 text-secondary font-weight-600 text-center vv-font-size-2-5 homeLogisticsBanner--caption__text1">{ t(__('Logistics Services')) }</Col>
            <Col span={24} className="d-lg-none text-white font-weight-600 text-center vv-font-size-1-5 homeLogisticsBanner--caption__text1">{ t(__('Get the best price now!')) }</Col>
            {/*Desktop & Mobile*/}
            <Col span={24} className="py-3 text-center homeLogisticsBanner--caption__btn">
              <a href="https://hornb2b.com/horn/logistics/" className="text-black border-0 d-inline-block">
                { t(__('Go to page')) }
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomeLogisticsBanner;