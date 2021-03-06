// import style file:
import './styles/ProductTab.less';

import { Col, Row, Tabs } from 'antd';
import { useTranslation } from "react-i18next";
import { __ } from "../../../utilities/functions/Helper";
import ProductSpecifications from "./components/ProductSpecifications";


const { TabPane } = Tabs;

function callback(key) {
  //console.log(key);
}

const ProductTab = ({ product, isLoading }) => {

  const { t } = useTranslation();

  return (
    <Row className="productTab--container">
      <Col span={24}>
        <Tabs defaultActiveKey="1" onChange={callback} type="card" className="productTab--tab" destroyInactiveTabPane={true}>
          <TabPane tab={t(__('product Specifications'))} key="1">
            <ProductSpecifications product={product} isLoading={isLoading}/>
          </TabPane>
          <TabPane tab={t(__('company'))} key="2">
            Company Profile
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default ProductTab;
