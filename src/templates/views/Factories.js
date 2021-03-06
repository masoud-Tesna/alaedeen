import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import Style File:
import './styles/Factories.less';

// import ANT Design Components Used:
import { Col, Row, Space } from "antd";

// import bg image:
import topSectionBg from '../assets/images/factoriezTopSectionBg.png';

// import helper functions:
import { __, SeoGenerator } from '../../utilities/functions/Helper';

import { useTranslation } from "react-i18next";
import { useGetApiOld, useQueryString } from "../../utilities/functions";

// import Factories Show Component:
import FactoryOneColumn from "./factories/FactoryOneColumn";

const Factories = () => {

  const { t } = useTranslation();

  const { pathname } = useLocation();

  const selectedStoreId = useQueryString().get('selected_store_id');

  // get factories from API:
  const { isLoading, data } = useGetApiOld(
    "factories-page-api",
    `selected_store_id=${selectedStoreId || ''}`,
    `factories_${selectedStoreId}`,
    {
      refetchOnWindowFocus: false
    }
  );
  const { factories } = data || [];

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="bg-footer factories--pageSection">
      <SeoGenerator
        title={ t(__('Premium OEM Factories')) }
        description={ t('factories_description') }
        keywords={ t('factories_keywords') }
        canonical="https://alaedeen.com/factories"
      />
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
          <Row gutter={[10, 10]} className="factories--items" justify="center">
            <FactoryOneColumn
              factories={factories}
              isLoading={isLoading}
              selectedStoreId={selectedStoreId}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Factories;