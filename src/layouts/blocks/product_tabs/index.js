// import style file:
import './styles/ProductTab.less';

import { Col, Row, Tabs } from 'antd';
import { useTranslation } from "react-i18next";
import { __ } from "../../../functions/Helper";
import ProductSpecifications from "./components/ProductSpecifications";


const { TabPane } = Tabs;

function callback(key) {
  //console.log(key);
}

const ProductTab = (props) => {

  const { t } = useTranslation();

  return (
    <Row className="productTab--container">
      <Col span={24}>
        <Tabs defaultActiveKey="1" onChange={callback} type="card" className="productTab--tab" destroyInactiveTabPane={true}>
          <TabPane tab={t(__('product Specifications'))} key="1">
            <ProductSpecifications features={props.features} product_description={props.product_description} isLoading={props.isLoading}/>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores obcaecati quae ratione. Eligendi laboriosam libero minima nihil nostrum officia vel voluptas! Cum fugit illo ipsum quas qui quod repellendus sint ullam vero? Consequatur ex illo omnis provident sunt? Ab deleniti nesciunt recusandae repellendus tempore. Aliquid amet dolore doloribus dolorum eligendi ex laborum nemo obcaecati porro quo recusandae sint soluta, vero.
          </TabPane>
          <TabPane tab={t(__('company'))} key="2">

          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default ProductTab;
