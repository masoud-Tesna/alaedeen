import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import Style File:
import './styles/Factories.less';

// import ANT Design Components Used:
import { Col, Row, Space } from "antd";

// import bg image:
import topSectionBg from '../assets/images/factoriezTopSectionBg.png';

// import helper functions:
import { __ } from '../functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetApi, useQueryString } from "../functions";
import { Helmet } from "react-helmet";

// import Factories Show Component:
import FactoriesShow from "../layouts/blocks/static_templates/FactoriesShow";

const Factories = () => {

  const { t } = useTranslation();

  const { pathname } = useLocation();

  const factory_id = useQueryString().get('factory');

  // get factories from API:
  const { isLoading, data: { factories } } = useGetApi(`factories-api`, '', `factories`);

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="bg-footer factories--pageSection">
      <Helmet>
        <title>{ `Alaedeen.com | ${ t(__('Premium OEM Factories')) }` }</title>
        <link rel="canonical" href= "https://alaedeen.com/factories" />
      </Helmet>
      <Row className="factories--container">
        <Col span={24} className="factories--topSection bottomShadow clipShadow">
          <Row justify={"space-between"}>
            <Col span={14}>
              <div><h1 className="text-white font-weight-bold font-italic factories--topSection__caption1">{ t(__('Premium OEM Factories')) }</h1></div>
              <div className="text-white font-weight-600 mt-3 factories--topSection__caption2">{ t(__('Manufacturers assessed by independent third parties')) }</div>
              <div className="d-none d-lg-block mt-4">
                <Space size={"middle"} >
                  <i className="fas fa-lightbulb text-white display-3 font-weight-bold" />
                  <span className="text-white vv-font-size-2 font-weight-600">{ t(__('High-performance manufacturing capacity')) }</span>
                </Space>
              </div>
              <div className="d-none d-lg-block mt-4">
                <Space size={"middle"} >
                  <i className="fas fa-cog text-white display-3 font-weight-bold" />
                  <span className="text-white vv-font-size-2 font-weight-600">{ t(__('R&D capability for customization')) }</span>
                </Space>
              </div>
              <div className="d-none d-lg-block mt-4">
                <Space size={"middle"} >
                  <i className="fas fa-file-certificate text-white display-3 font-weight-bold" />
                  <span className="text-white vv-font-size-2 font-weight-600">{ t(__('Professional certifications and approvals')) }</span>
                </Space>
              </div>
            </Col>
            <Col span={9} className="text-left factories--topSection__image">
              <img src={topSectionBg} alt="Premium OEM Factories"/>
            </Col>
          </Row>
        </Col>

        <Col span={24} className="factories--bottomSection mb-5">
          <Row gutter={[0, 50]} className="factories--items">
            <FactoriesShow
              factories={factories}
              isLoading={isLoading}
              factory_id={factory_id}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Factories;