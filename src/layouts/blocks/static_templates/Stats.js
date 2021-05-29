//import Style:
import './styles/Stats.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

// import custom hooks:
import { useGetApi } from "../../../functions";

const Stats = () => {
  const { items } = useGetApi('stats-api', '', 'stats', false, false);
  return (
    <div className="stats--container">
      <Row className="h-100 stats--content" justify="space-around" align="middle">
        <Col className="text-center text-white" span={5}>
          <div className="stats--content__title font-weight-600 text-shadow">Registered Users</div>
          <div className="stats--content__value font-weight-bold text-shadow">{ items.total_user }</div>
        </Col>
        <Col className="text-center text-white" span={5}>
          <div className="stats--content__title font-weight-600 text-shadow">Total Products</div>
          <div className="stats--content__value font-weight-bold text-shadow">{ items.total_products }</div>
        </Col>
        <Col className="text-center text-white" span={5}>
          <div className="stats--content__title font-weight-600 text-shadow">Total Stores</div>
          <div className="stats--content__value font-weight-bold text-shadow">{ items.total_store }</div>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;