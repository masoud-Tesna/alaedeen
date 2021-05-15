import { useHistory } from "react-router-dom";

// import Styles For TopPanelWhitBackIcon:
import './styles.less';

// Ant Design Import:
import { Row, Col } from 'antd';


const TopPanelWhitBackIcon = () => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }
  return (
    <Row className="bg-top-panel topPanel--container">
      <Col span={24} className="topPanel--col">
        <Row className="h-100" gutter={24} justify="space-between">
          <Col className="d-lg-none my-auto vv-cursor-pointer topPanel--col__logoXS" onClick={() => { goBack() }}>
            <i className="far fa-long-arrow-left text-white display-4" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TopPanelWhitBackIcon;