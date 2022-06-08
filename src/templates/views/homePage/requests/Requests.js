import "../styles/Requests.less";
import {Col, Row} from "antd";
import RequestsList from "./components/RequestsList";
import RequestForm from "./components/RequestForm";

const Requests = () => {
  return (
    <Row className="requests--container" align="middle">
      <Col span={24} style={{ overflowX: "hidden", marginBottom: 125 }}>
        <Row gutter={0} justify="space-between">
          <Col span={10} className="--list">
            <RequestsList />
          </Col>
          
          <Col span={11} className="--form">
            <RequestForm />
          </Col>
        </Row>
      </Col>
      <Col span={24} className="--statRequests">Test</Col>
    </Row>
  );
};

export default Requests;
