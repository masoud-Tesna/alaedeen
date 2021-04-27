import React from 'react';

// import Style File:
import './styles/PremiumFactories.less';

// import ANT Design Components Used:
import { Col, Row, Space } from "antd";

// import store icon:
import store_1 from '../../../assets/images/store-icon/1.png';
import store_2 from '../../../assets/images/store-icon/2.png';
import store_3 from '../../../assets/images/store-icon/3.png';

// import Factory Images:
import factoryImage_1 from '../../../assets/images/factoryImages/1.png';
import factoryImage_2 from '../../../assets/images/factoryImages/2.png';
import factoryImage_3 from '../../../assets/images/factoryImages/3.png';

// import Verified
import verifiedIcon from '../../../assets/images/verified.png';
import TextTruncate from 'react-text-truncate';

const PremiumFactories = () => {
  return (
    <div className="premiumFactories--container">
      <Row>
        <Col className="premiumFactories--caption__content" span={24}>
          <Row justify="space-between">
            <Col className="text-33 text-uppercase vv-font-size-3 font-weight-bold">
              Premium OEM Factories
            </Col>
            <Col className="my-auto">
              <a className="vv-font-size-1-8 text-33">View More <i
                className="far fa-chevron-right vv-font-size-1-8 ml-3" /></a>
            </Col>
          </Row>
        </Col>
        <Col className="premiumFactories--content" span={24}>
          <Row className="premiumFactories--items" justify="space-between" gutter={{ xs: 5, sm: 5, md: 5, lg: 8, xl: 10, xxl: 35 }}>
            <Col span={8}>
              <div className="premiumFactories--item rounded-10 shadow-y-2 bg-white">
                <div className="mb-4 d-flex align-items-center">
                  <div className="premiumFactories--item__image">
                    <img src={ store_2 } alt="store_2"/>
                  </div>
                  <div className="w-100 premiumFactories--item__caption">
                    <div className="vv-font-size-1-6 text-black premiumFactories--item__name">
                      <TextTruncate
                        line={1}
                        element="span"
                        truncateText="…"
                        text="Farahi carpet company"
                      />
                    </div>
                    <div className="premiumFactories--item__verified">
                      <img src={ verifiedIcon } alt="Verified"/>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="premiumFactories--factoryImages__item1">
                    <img src={ factoryImage_1 } alt="factoryImage_1"/>
                  </div>
                  <Row className="premiumFactories--factoryImages__item_2_3">
                    <Col span={24} className="premiumFactories--factoryImages__item2 align-self-start">
                      <img src={ factoryImage_2 } alt="factoryImage_2"/>
                    </Col>
                    <Col span={24} className="premiumFactories--factoryImages__item3 align-self-end">
                      <img src={ factoryImage_3 } alt="factoryImage_3"/>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col span={8}>
              <div className="premiumFactories--item rounded-10 shadow-y-2 bg-white">
                <div className="mb-4 d-flex align-items-center">
                  <div className="premiumFactories--item__image">
                    <img src={ store_3 } alt="store_3"/>
                  </div>
                  <div className="w-100 premiumFactories--item__caption">
                    <div className="vv-font-size-1-6 text-black premiumFactories--item__name">
                      <TextTruncate
                        line={1}
                        element="span"
                        truncateText="…"
                        text="Savin carpet company"
                      />
                    </div>
                    <div className="premiumFactories--item__verified">
                      <img src={ verifiedIcon } alt="Verified"/>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="premiumFactories--factoryImages__item1">
                    <img src={ factoryImage_2 } alt="factoryImage_2"/>
                  </div>
                  <Row className="premiumFactories--factoryImages__item_2_3">
                    <Col span={24} className="premiumFactories--factoryImages__item2 align-self-start">
                      <img src={ factoryImage_3 } alt="factoryImage_3"/>
                    </Col>
                    <Col span={24} className="premiumFactories--factoryImages__item3 align-self-end">
                      <img src={ factoryImage_1 } alt="factoryImage_1"/>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            <Col span={8}>
              <div className="premiumFactories--item rounded-10 shadow-y-2 bg-white">
                <div className="mb-4 d-flex align-items-center">
                  <div className="premiumFactories--item__image">
                    <img src={ store_1 } alt="store_1"/>
                  </div>
                  <div className="w-100 premiumFactories--item__caption">
                    <div className="vv-font-size-1-6 text-black premiumFactories--item__name">
                      <TextTruncate
                        line={1}
                        element="span"
                        truncateText="…"
                        text="Aghigh carpet company"
                      />
                    </div>
                    <div className="premiumFactories--item__verified">
                      <img src={ verifiedIcon } alt="Verified"/>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="premiumFactories--factoryImages__item1">
                    <img src={ factoryImage_3 } alt="factoryImage_3"/>
                  </div>
                  <Row className="premiumFactories--factoryImages__item_2_3">
                    <Col span={24} className="premiumFactories--factoryImages__item2 align-self-start">
                      <img src={ factoryImage_1 } alt="factoryImage_1"/>
                    </Col>
                    <Col span={24} className="premiumFactories--factoryImages__item3 align-self-end">
                      <img src={ factoryImage_2 } alt="factoryImage_2"/>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default PremiumFactories;