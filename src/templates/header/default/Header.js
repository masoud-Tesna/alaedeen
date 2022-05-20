import "./styles/Header.less";
import {Col, Divider, Row} from "antd";
import AlaedeenCharacter from "./components/AlaedeenCharacter";

const Header = () => {
  
  return (
    <Row className="header--container">
      <Col span={24} className="--header">
        <Row gutter={{ md: 8, lg: 16, xl: 50 }}>
          <Col span={6}>
            <AlaedeenCharacter />
          </Col>
        </Row>
      </Col>
      
      <Divider />
  
      <Col span={24} className="--menu">
        Menu
      </Col>
    </Row>
  );
};

export default Header;
