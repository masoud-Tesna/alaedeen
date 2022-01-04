import "./styles/AddProduct.less";
import { Col, Row } from "antd";
import DashboardContentHeader from "../templates/components/DashboardContentHeader";

const AddProduct = () => {
  return (
    <Row gutter={[0, 30]}>
      <Col span={24}>
        <DashboardContentHeader page={"create new product"} />
      </Col>
    </Row>
  );
};

export default AddProduct;
