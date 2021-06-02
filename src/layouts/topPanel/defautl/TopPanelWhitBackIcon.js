import { useHistory } from "react-router-dom";

// import Styles For TopPanelWhitBackIcon:
import './styles.less';

// Ant Design Import:
import { Row, Col } from 'antd';


const TopPanelWhitBackIcon = ({ scrolledClass }) => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return (
    <Row className={ `bg-top-panel topPanel--container TopPanelWhitBackIcon ${scrolledClass}` }>
      <Col span={24} className="topPanel--col">
        <Row className="h-100" gutter={24}>
          <Col className="d-lg-none my-auto vv-cursor-pointer topPanel--col__logoXS" onClick={() => { goBack() }}>
            <i className="far fa-long-arrow-left text-white display-4" />
          </Col>
          <Col className="d-lg-none my-auto text-white vv-font-size-2 font-weight-bold font-italic topPanel--col__titleXS">
            Premium OEM Factories
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TopPanelWhitBackIcon;