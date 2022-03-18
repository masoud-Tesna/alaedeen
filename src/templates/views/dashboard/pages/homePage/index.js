import { Col, Row } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { SeoGenerator } from "../../../../../functions/Helper";

const Index = () => {

  return (
    <Row>
      <SeoGenerator
        title="Dashboard"
      />

      <Col span={24}>
        <DashboardContentHeader page={"Dashboard"} />
      </Col>

      <Col span={24} className="dashboard--container"></Col>
    </Row>
  );
};

export default Index;
