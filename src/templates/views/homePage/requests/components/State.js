import "../../styles/State.less";
import {Col, Row} from "antd";

const State = () => {
  return (
    <Row className="state--container" align="middle" gutter={26}>
      <StateCol state="+100" type="Active Suppliers" />
      
      <StateCol state="+100" type="Active Suppliers" />
      
      <StateCol state="+100" type="Active Suppliers" />
      
      <StateCol state="+100" type="Active Suppliers" />
    </Row>
  );
};

const StateCol = ({ type, state }) => {
  return (
    <Col span={6} className="--item">
      <Row align="middle" gutter={8}>
        <Col className="--state">
          {state}
        </Col>
        <Col className="--type">
          {type}
        </Col>
      </Row>
    </Col>
  );
}

export default State;
