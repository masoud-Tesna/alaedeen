import "./styles/Notifications.less";
import {Col, Row} from "antd";
import {SeoGenerator} from "../../../../../functions/Helper";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";

const Notifications = () => {
  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Notifications"
      />
      
      <Col span={24}>
        <DashboardContentHeader page={"Notifications"}/>
      </Col>
      
      <Col span={24} className="notifications--container">
        Notifications
      </Col>
    </Row>
  );
};

export default Notifications;
