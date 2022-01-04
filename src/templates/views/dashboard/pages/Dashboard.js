
import DashboardMain from "../templates/DashboardMain";
import { Col, Row } from "antd";
import DashboardContentHeader from "../templates/components/DashboardContentHeader";

const Dashboard = () => {

  return (
    <Row>
      <Col span={24}>
        <DashboardContentHeader page={"Dashboard"} />
      </Col>
    </Row>
  );
};

export default Dashboard;
