// import Style File:
import './styles/WhatHorn.less';

// import ANT Design Components Used:
import { Col, Divider, Row } from "antd";

const WhatHorn = () => {

  return (
    <div className="whatHorn--container">
      <Row>
        <Col className="whatHorn--caption__content" span={24}>
          <Divider orientation="left" className="dividerText">What does Horn do?</Divider>
        </Col>
        <Col className="whatHorn--items" span={24}>
          <Row className="row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-3" justify="space-between" gutter={ { xs: 16, sm: 16, md: 16, lg: 0, xl: 0, xxl: 0 }}>


            <Col className="d-flex align-items-center justify-content-center text-center ">
              <Row>
                <Col className="whatHorn--item">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="bg-white d-flex align-items-center justify-content-center whatHorn--item__logo">
                      <i className="icon-about-driver text-primary" />
                    </div>
                  </div>
                  <div className="vv-font-size-3 text-33 font-weight-bold text-center mt-2  whatHorn--item__caption1">
                    Experienced Guides
                  </div>
                  <div className="vv-font-size-2-4 text-70 font-weight-600 text-center mt-1 whatHorn--item__caption2">
                    Lorem ipsum dolor sit amet, consectetuer consectetuer  elit adipiscing.
                  </div>
                </Col>
              </Row>
            </Col>



            <Col className="d-flex align-items-center justify-content-center text-center ">
              <Row>
                <Col className="whatHorn--item">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="bg-white d-flex align-items-center justify-content-center whatHorn--item__logo">
                      <i className="icon-about-packs text-primary" />
                    </div>
                  </div>
                  <div className="vv-font-size-3 text-33 font-weight-bold text-center mt-2  whatHorn--item__caption1">
                    Freight Service
                  </div>
                  <div className="vv-font-size-2-4 text-70 font-weight-600 text-center mt-1 whatHorn--item__caption2">
                    Lorem ipsum dolor sit amet, consectetuer consectetuer  elit adipiscing.
                  </div>
                </Col>
              </Row>
            </Col>



            <Col className="d-flex align-items-center justify-content-center text-center ">
              <Row>
                <Col className="whatHorn--item">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="bg-white d-flex align-items-center justify-content-center whatHorn--item__logo">
                      <i className="icon-about-logistics text-primary" />
                    </div>
                  </div>
                  <div className="vv-font-size-3 text-33 font-weight-bold text-center mt-2  whatHorn--item__caption1">
                    Freight Service
                  </div>
                  <div className="vv-font-size-2-4 text-70 font-weight-600 text-center mt-1 whatHorn--item__caption2">
                    Lorem ipsum dolor sit amet, consectetuer consectetuer  elit adipiscing.
                  </div>
                </Col>
              </Row>
            </Col>


          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WhatHorn;