import { Col, Row } from "antd";
import DashboardContentHeader from "../templates/components/DashboardContentHeader";
import { SeoGenerator } from "../../../../functions/Helper";

const Dashboard = () => {

  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Stats"
      />

      <Col span={24}>
        <DashboardContentHeader page={"Dashboard"} />
      </Col>
    </Row>
  );
};

export default Dashboard;
