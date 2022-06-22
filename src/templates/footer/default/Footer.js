// import style:
import "./styles/Footer.less";

// import antd components:
import {Col, Row} from "antd";

// import components:
import Newsletters from "./components/Newsletters";
import Lists from "./components/Lists";
import AppDownload from "./components/AppDownload";
import Extra from "./components/Extra";
import Reserved from "./components/Reserved";

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
          
          <Col span={24} className="--extra">
            <Extra />
          </Col>
          
          <Col span={24} className="--reserved">
            <Reserved />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Footer;
