import { useState } from "react";

// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Divider, Space, Menu, Dropdown, Button, Modal } from 'antd';

// import categories drop down:
import { CategoriesDropDownVertical as Categories } from "../../blocks/categories/CategoriesDropDownVertical";

// import images used:
import hornLogo from '../../../assets/images/logoXs.png';

const handleLinkClick = (url, target) => {
  window.open(url, target)
}

const DefaultTopPanel = () => {

  const [visibleTopPanelMenuXs, setVisibleTopPanelMenuXs] = useState(false);

  const showTopPanelMenuXs = () => {
    setVisibleTopPanelMenuXs(true);
  }
  const closeTopPanelMenuXs = () => {
    setVisibleTopPanelMenuXs(false);
  }
  return (
    <Row className="bg-top-panel topPanel--container">
      <Modal
        visible={visibleTopPanelMenuXs}
        onCancel={closeTopPanelMenuXs}
        className="bg-white shadow-lg w-75 m-0 p-0 topPanel--menuXs"
        closable={false}
        footer={null}
      >
        test
      </Modal>

      <Col span={24} className="topPanel--col">
        <Row className="h-100" gutter={24} justify="space-between">
          <Col className="topPanel--content__left my-auto d-none d-lg-block">
            <Space size="middle">
              <Categories userClass="categories--dropDown topPanel--content__item hover" />
              <Divider type="vertical" className="border-70"/>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  Stores
                </span>
              </a>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  Logistics
                </span>
              </a>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text" onClick={() => { handleLinkClick('https://calendar.iranfair.com/en/', '_blank') }}>
                  International Exhibition
                </span>
              </a>
            </Space>
          </Col>
          <Col className="topPanel--content__right my-auto d-none d-lg-block">
            <Space size={0.5}>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  عربی
                </span>
              </a>
              <Divider type="vertical" className="border-70"/>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  English
                </span>
              </a>
              <Divider type="vertical" className="border-70"/>
              <a className="topPanel--content__item hover">
                <span className="topPanel--item__text">
                  فارسی
                </span>
              </a>

              <a className="topPanel--content__item home-icon">
                <span className="topPanel--item__text">
                  <i className="fal fa-home text-white vv-font-size-2"></i>
                </span>
              </a>

              <a className="topPanel--content__item question-icon">
                <span className="topPanel--item__text">
                  <i className="fal fa-question-circle text-white vv-font-size-2"></i>
                </span>
              </a>

            </Space>
          </Col>
          <Col className="d-lg-none my-auto vv-cursor-pointer topPanel--col__logoXS" onClick={() => { handleLinkClick('/home', '_parent') }}>
            <img src={hornLogo} alt="Horn"/>
          </Col>
          <Col className="d-lg-none my-auto topPanel--col__btnRequest">
            <Button className="border border-secondary-2 bg-secondary-2 border-w-2 text-white font-weight-600 p-0" size="large">Request a Quote</Button>
          </Col>
          <Col className="d-lg-none my-auto vv-cursor-pointer" onClick={showTopPanelMenuXs}>
            <i className="fas fa-grip-lines cursor-pointer text-white display-3" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DefaultTopPanel;