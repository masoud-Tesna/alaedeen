import { Col, Row } from "antd";
import DashboardContentHeader from "../templates/components/DashboardContentHeader";
import DashboardMain from "../templates/DashboardMain";

const ManageProducts = () => {
  return (
    <Row>
      <Col span={24}>
        <DashboardContentHeader page={"manage products"} />
      </Col>

      <Col span={24}>

      </Col>
    </Row>
  );
};

export default ManageProducts;
