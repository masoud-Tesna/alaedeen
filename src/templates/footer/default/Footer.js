import "./styles/Footer.less";
import {Col, Row} from "antd";
import Newsletters from "./components/Newsletters";

const Footer = () => {
  return (
    <Row>
      <Col span={24} className="footer--container">
        <Row>
          <Col span={24}>
            <Newsletters />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Footer;
