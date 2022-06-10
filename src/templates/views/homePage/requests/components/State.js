import "../../styles/State.less";
import {Col, Row, Skeleton} from "antd";
import {useGetApiOld} from "../../../../../utilities/functions";

const State = () => {
  
  const { isLoading, data } = useGetApiOld(
    `stats-api`,
    '',
    `stats`,
    {
      refetchOnWindowFocus: false
    }
  );
  
  const states = data?.stats || {};
  
  return (
    <Row className="state--container" align="middle" gutter={26}>
      <StateCol isLoading={isLoading} state={states?.total_store} type="Active Suppliers" />
      
      <StateCol isLoading={isLoading} state={states?.total_products} type="total products" />
      
      <StateCol isLoading={isLoading} state="+100" type="RFQs" />
      
      <StateCol isLoading={isLoading} state="+100" type="Industries" />
    </Row>
  );
};

const StateCol = ({ isLoading, type, state }) => {
  return (
    <Col span={6} className="--item">
      <Row align="middle" gutter={8}>
        <Col className="--state">
          {
            !!isLoading ?
              <Skeleton.Input active size={"small"} /> :
              state
          }
        </Col>
        <Col className="--type">
          {
            !!isLoading ?
              <Skeleton.Input active size={"small"} /> :
              type
          }
        </Col>
      </Row>
    </Col>
  );
}

export default State;
