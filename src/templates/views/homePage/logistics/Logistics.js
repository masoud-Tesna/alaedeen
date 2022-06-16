import "../styles/Logistics.less";
import {Col, Row} from "antd";

const Logistics = () => {
  return (
    <Row className="logistics--container" gutter={[0, 16]}>
      <Col span={24} className="--topSection align-self-start">
        <Row gutter={[0, 24]}>
          <Col span={24} className="--caption">
            Alaedeen Logistics
          </Col>
          
          <Col className="--formBox" span={24}>
            Form
          </Col>
        </Row>
      </Col>
      
      <Col span={24} className="--bottomSection align-self-end">
        Bottom Section
      </Col>
    </Row>
  );
};

export default Logistics;
