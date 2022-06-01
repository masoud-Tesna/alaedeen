import "../styles/Requests.less";
import {Col, Row} from "antd";
import RequestsList from "./components/RequestsList";
import RequestForm from "./components/RequestForm";

const Requests = () => {
  return (
    <Row className="requests--container" align="middle">
      <Col span={24} style={{ overflowX: "hidden" }}>
        <Row gutter={100}>
          <Col span={12}>
            <Row>
              <Col span={24} className="--list">
                <RequestsList />
              </Col>
            </Row>
          </Col>
          
          <Col span={12} className="--form">
            <RequestForm />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Requests;
