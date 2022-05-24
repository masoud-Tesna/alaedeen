import "./styles/Footer.less";
import {Col, Row} from "antd";
import Newsletters from "./components/Newsletters";
import Lists from "./components/Lists";
import AppDownload from "./components/AppDownload";

const Footer = () => {
  return (
    <Row>
      <Col span={24} className="footer--container">
        <Row>
          <Col span={24}>
            <Newsletters />
          </Col>
          
          <Col span={24} className="--lists">
            <Lists />
          </Col>
          
          <Col span={24} className="--appDl">
            <AppDownload />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Footer;
