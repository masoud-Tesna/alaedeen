// import style file:
import './styles/ProductTab.less';

import { Col, Row, Tabs } from 'antd';
import { useGetConfig } from "../../../contexts/config/ConfigContext";
import { useTranslation } from "react-i18next";
import { __ } from "../../../functions/Helper";


const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const ProductTab = ({ features, product_description }) => {

  // get initial config:
  const { config } = useGetConfig();

  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24}>
        <Tabs defaultActiveKey="1" onChange={callback} type="card">
          <TabPane tab={t(__('Product Specifications'))} key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab={t(__('company'))} key="2">

          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default ProductTab;
