// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Divider, Space, Menu, Dropdown } from 'antd';

// import logo:
import logoXs from '../../../assets/images/logoXs.png';





const DefaultHeader = () => {
  return (
    <Row className="header--container">
      <Col span={24} className="header--col">
        <Row className="h-100" gutter={24}>
          <Col className="topPanel--content__left my-auto" span={ 16 }>
            <div className="logo">
              <img src={logoXs} />
            </div>
          </Col>
          <Col className="topPanel--content__right my-auto" span={ 8 }>

          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DefaultHeader;