import "./styles/ProductsMultiColumn.less";
import {Col, Row} from "antd";

const ProductsMultiColumn = () => {
  return (
    <Row className="productsMultiColumn--container">
      <SeoGenerator
        title="ProductsMultiColumn"
      />
      
      <Col span={24}>
        ProductsMultiColumn
      </Col>
    </Row>
  );
};

export default ProductsMultiColumn;
