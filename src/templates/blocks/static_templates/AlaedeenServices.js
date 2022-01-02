// import Style File:
import './styles/AlaedeenServices.less';

// import ANT Design Components Used:
import { Col, Divider, Row } from "antd";

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetConfig } from "../../../contexts/config/ConfigContext";
import { useWindowSize } from "../../../functions";

const AlaedeenServices = () => {

  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  const { width } = useWindowSize();

  return (
    <div className="AlaedeenServices--container">
      <Row>
        <Col className="d-none d-lg-block AlaedeenServices--caption" span={24}>
          <Divider orientation={config.language === 'en' ? 'left' : 'right'} className="dividerText">
            { t(__('What does alaedeen do?')) }
          </Divider>
        </Col>

        <Col className="d-lg-none AlaedeenServices--caption" span={24}>
          { t(__('What does alaedeen do?')) }
        </Col>

        <Col className="AlaedeenServices--items" span={24}>
          {width >= 993 ?
            <Row className="row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3" justify="space-between" gutter={ { xs: 16, sm: 16, md: 16, lg: 0, xl: 0, xxl: 0 }}>
              <Col className="d-flex align-items-center justify-content-center text-center ">
                <Row>
                  <Col className="AlaedeenServices--item">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="d-flex align-items-center justify-content-center AlaedeenServices--item__logo">
                        <i className="icon-about-driver text-primary" />
                      </div>
                    </div>
                    <div className="vv-font-size-3 text-33 font-weight-bold text-center mt-2  AlaedeenServices--item__caption1">
                      { t(__('Experienced Guides')) }
                    </div>
                    <div className="vv-font-size-2-4 text-70 font-weight-600 text-center mt-1 AlaedeenServices--item__caption2">
                      { t(__('Experienced Guides description')) }
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col className="d-flex align-items-center justify-content-center text-center ">
                <Row>
                  <Col className="AlaedeenServices--item">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="d-flex align-items-center justify-content-center AlaedeenServices--item__logo">
                        <i className="icon-about-packs text-primary" />
                      </div>
                    </div>
                    <div className="vv-font-size-3 text-33 font-weight-bold text-center mt-2  AlaedeenServices--item__caption1">
                      { t(__('Introducing Top Brands')) }
                    </div>
                    <div className="vv-font-size-2-4 text-70 font-weight-600 text-center mt-1 AlaedeenServices--item__caption2">
                      { t(__('Introducing Top Brands description')) }
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col className="d-flex align-items-center justify-content-center text-center ">
                <Row>
                  <Col className="AlaedeenServices--item">
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="d-flex align-items-center justify-content-center AlaedeenServices--item__logo">
                        <i className="icon-about-logistics text-primary" />
                      </div>
                    </div>
                    <div className="vv-font-size-3 text-33 font-weight-bold text-center mt-2  AlaedeenServices--item__caption1">
                      { t(__('Freight Service')) }
                    </div>
                    <div className="vv-font-size-2-4 text-70 font-weight-600 text-center mt-1 AlaedeenServices--item__caption2">
                      { t(__('Freight Service description')) }
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row> :

            <Row className="AlaedeenServices--items__xs mt-3" gutter={[0, 20]}>
              <Col span={24}>
                <Row>
                  <Col className="my-auto AlaedeenServices--item__logo" flex="112px">
                    <i className="icon-about-driver text-primary" />
                  </Col>
                  <Col flex="1 1">
                    <Row className="h-100" gutter={[0, 5]}>
                      <Col span={24} className="vv-font-size-1-5 text-33 font-weight-bold AlaedeenServices--item__caption1">
                        { t(__('Experienced Guides')) }
                      </Col>
                      <Col span={24} className="vv-font-size-1-4 text-70 font-weight-600 AlaedeenServices--item__caption2">
                        { t(__('Experienced Guides description')) }
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Row>
                  <Col className="my-auto AlaedeenServices--item__logo" flex="112px">
                    <i className="icon-about-packs text-primary" />
                  </Col>
                  <Col flex="1 1">
                    <Row className="h-100" gutter={[0, 5]}>
                      <Col span={24} className="vv-font-size-1-5 text-33 font-weight-bold AlaedeenServices--item__caption1">
                        { t(__('Introducing Top Brands')) }
                      </Col>
                      <Col span={24} className="vv-font-size-1-4 text-70 font-weight-600 AlaedeenServices--item__caption2">
                        { t(__('Introducing Top Brands description')) }
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Row>
                  <Col className="my-auto AlaedeenServices--item__logo" flex="112px">
                    <i className="icon-about-logistics text-primary" />
                  </Col>
                  <Col flex="1 1">
                    <Row className="h-100" gutter={[0, 5]}>
                      <Col span={24} className="vv-font-size-1-5 text-33 font-weight-bold AlaedeenServices--item__caption1">
                        { t(__('Freight Service')) }
                      </Col>
                      <Col span={24} className="vv-font-size-1-4 text-70 font-weight-600 AlaedeenServices--item__caption2">
                        { t(__('Freight Service description')) }
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          }
        </Col>
      </Row>
    </div>
  );
};

export default AlaedeenServices;