import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import Style File:
import './styles/Factories.less';

// import ANT Design Components Used:
import { Col, Row, Space } from "antd";

// import bg image:
import topSectionBg from '../assets/images/factoriezTopSectionBg.png';

// import Factories Show Component:
import FactoriesShow from "../layouts/blocks/static_templates/FactoriesShow";

const Factories = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-footer factories--pageSection">
      <Row className="factories--container">
        <Col span={24} className="factories--topSection bottomShadow clipShadow">
          <Row justify={"space-between"}>
            <Col span={14} className="text-white">
              <div className="font-weight-bold font-italic factories--topSection__caption1">Premium OEM Factories</div>
              <div className="font-weight-600 mt-3 factories--topSection__caption2">Manufacturers assessed by independent third parties</div>
              <div className="d-none d-lg-block mt-4">
                <Space size={"middle"} >
                  <i className="fas fa-lightbulb display-3 font-weight-bold" />
                  <span className="vv-font-size-2 font-weight-600">High-performance manufacturing capacity</span>
                </Space>
              </div>
              <div className="d-none d-lg-block mt-4">
                <Space size={"middle"} >
                  <i className="fas fa-cog display-3 font-weight-bold" />
                  <span className="vv-font-size-2 font-weight-600">R&D capability  for customization</span>
                </Space>
              </div>
              <div className="d-none d-lg-block mt-4">
                <Space size={"middle"} >
                  <i className="fas fa-file-certificate display-3 font-weight-bold" />
                  <span className="vv-font-size-2 font-weight-600">Professional certifications and approvals</span>
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
            <FactoriesShow />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export { Factories };