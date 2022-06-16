import "./styles/RecommendedProductsBox.less";
import {Col, Row} from "antd";

const RecommendedProductsBox = () => {
  return (
    <Row className="recommendedProductsBox--container">
      <Col span={24} className="--caption">
        Recommended Products
      </Col>
    </Row>
  );
};

export default RecommendedProductsBox;
