import { useState } from "react";
import { Link } from "react-router-dom";

// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Divider, Space, Menu, Select , Button, Modal, Collapse } from 'antd';
import { UpOutlined } from "@ant-design/icons";

// import categories drop down:
import { CategoriesDropDownVertical as Categories } from "../../blocks/categories/CategoriesDropDownVertical";

// import images used:
import hornLogo from '../../../assets/images/logoXs.png';

// import helper functions used:
import { fn_handleLinkClick } from '../../../functions/Helper';


const DefaultTopPanel = () => {

  const { Panel } = Collapse;
  const { Option } = Select;

  const [visibleTopPanelMenuXs, setVisibleTopPanelMenuXs] = useState(false);
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');

  const showTopPanelMenuXs = () => {
    setVisibleTopPanelMenuXs(true);
  }

  const closeTopPanelMenuXs = () => {
    setVisibleTopPanelMenuXs(false);
  }

  const handleChangeLang = (e) => {
    setLang(e.target.value);
  }

  const handleChangeCurrency = (e) => {
    setCurrency(e.target.value);
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
        <Row className="topPanel--menuXs__container">
          <Col span={24} className="align-self-start topPanel--menuXs__topSection">
              <Col span={24} className="menuXs--bgTopSection__container">
                <Row className="h-100 px-4" align="middle" gutter={16}>
                  <Col>
                    <i className="fal fa-user text-white vv-font-size-4-5" />
                  </Col>
                  <Col>
                    <Row gutter={[0, 5]}>
                      <Col span={24} className="text-white vv-font-size-1-7 font-weight-bolder">
                        Hello
                      </Col>
                      <Col span={24}>
                        <a className="text-white vv-font-size-1-7 font-weight-600">Sign in</a>
                        <Divider type="vertical" className="border-70"/>
                        <a className="text-white vv-font-size-1-7 font-weight-600">Join Free</a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
          </Col>

          <Col span={24} className="topPanel--menuXs__middleSection">
            <Row className="pt-4 px-4">
              <Col className="menuXs--sideNavLinks__items" span={24}>
                <Space direction="vertical" size={"middle"} className="w-100">
                  <a className="menuXs--sideNavLinks__item d-block">
                    <Row justify={"space-between"}>
                      <Col className="text-center" span={5}>
                        <i className="fal fa-home text-primary vv-font-size-3" />
                      </Col>
                      <Col span={18} className="my-auto">
                        <span className="text-70 vv-font-size-1-6">Home</span>
                      </Col>
                    </Row>
                  </a>

                  <a className="menuXs--sideNavLinks__item languagesCurrencyCollapse d-block">
                    <Row justify={"space-between"}>
                      <Col className="text-center" span={5}>
                        <i className="fal fa-globe text-primary vv-font-size-3" />
                      </Col>
                      <Col style={{ paddingTop: '0.9rem' }} span={18}>
                        <Collapse
                          expandIconPosition={"right"}
                          ghost
                          expandIcon={({ isActive }) => <UpOutlined rotate={isActive ? 180 : 0} />}
                        >
                          <Panel header="Language & Currency" key="1">
                            <div className="mb-4">
                              <Row justify="space-between">
                                <Col className="my-auto">
                                  <span className="mr-2">Language</span>
                                </Col>
                                <Col className="my-auto" span={12}>
                                  <select
                                    value={lang}
                                    onChange={e => handleChangeLang(e)}
                                    className="w-100 text-red-a0 select-box-remove-arrow border-0 vv-font-size-1-5 p-0 mobileChangeLangSelect">
                                    <option value="en"
                                            selected="">English
                                    </option>
                                    <option value="ar">العربية
                                    </option>
                                    <option value="fa">فارسی
                                    </option>
                                  </select>
                                </Col>
                              </Row>
                            </div>

                            <div>
                              <Row justify="space-between">
                                <Col className="my-auto" span={12}>
                                  <span className="mr-2">Currency</span>
                                </Col>
                                <Col className="my-auto" span={12}>
                                  <select
                                    value={currency}
                                    onChange={e => handleChangeCurrency(e)}
                                    className="w-100 text-red-a0 select-box-remove-arrow border-0 vv-font-size-1-5 p-0 mobileChangeCurrencySelect">
                                    <option value="USD">US dollars</option>
                                    <option value="AED" selected="">United
                                      arab emirates dirham
                                    </option>
                                    <option value="IQD">Iraqi dinar
                                    </option>
                                    <option value="SAR">Saudi riyal
                                    </option>
                                    <option value="KWD">Kuwaiti dinar
                                    </option>
                                    <option value="BHD">Bahraini dinar
                                    </option>
                                    <option value="QAR">Qatari riyal
                                    </option>
                                  </select>
                                </Col>
                              </Row>
                            </div>
                          </Panel>
                        </Collapse>
                      </Col>
                    </Row>
                  </a>

                  <a className="menuXs--sideNavLinks__item d-block">
                    <Row justify={"space-between"}>
                      <Col className="text-center" span={5}>
                        <i className="fal fa-star text-primary vv-font-size-3" />
                      </Col>
                      <Col span={18} className="my-auto">
                        <span className="text-70 vv-font-size-1-6">Favorites</span>
                      </Col>
                    </Row>
                  </a>

                  <a className="menuXs--sideNavLinks__item d-block">
                    <Row justify={"space-between"}>
                      <Col className="text-center" span={5}>
                        <i className="icon-vv-compare text-primary vv-font-size-2-5" />
                      </Col>
                      <Col span={18} className="my-auto">
                        <span className="text-70 vv-font-size-1-6">Comparison</span>
                      </Col>
                    </Row>
                  </a>

                  <a className="menuXs--sideNavLinks__item d-block">
                    <Row justify={"space-between"}>
                      <Col className="text-center" span={5}>
                        <i className="fal fa-envelope text-primary vv-font-size-3" />
                      </Col>
                      <Col span={18} className="my-auto">
                        <span className="text-70 vv-font-size-1-6">Messages</span>
                      </Col>
                    </Row>
                  </a>
                </Space>
              </Col>
              <Divider className="border-bc" />
              <Col className="px-4 menuXs--sideNavBtn__items" span={24}>
                <Space direction="vertical" size={15}>
                  <Button className="border-primary text-primary w-100">International Exhibition</Button>

                  <Button className="border-primary text-primary w-100">Trading Guide</Button>
                </Space>
              </Col>
            </Row>
          </Col>

          <Col span={24} className="bg-footer p-4 w-100 topPanel--menuXs__bottomSection">
            <Space size={15}>
              <div className="d-inline-block">
                <i className="fad fa-download text-primary display-4" />
              </div>
              <div className="d-inline-block">
                <div className="text-white vv-font-size-1-5 font-weight-bold">
                  Download the Horn app
                </div>
                <div className="text-white vv-font-size-1-2 mt-2">
                  For 10x Faster
                </div>
              </div>
            </Space>
          </Col>
        </Row>
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
                <span className="topPanel--item__text" onClick={() => { fn_handleLinkClick('https://calendar.iranfair.com/en/', '_blank') }}>
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
          <Col className="d-lg-none my-auto vv-cursor-pointer topPanel--col__logoXS">
            <Link to={"/"} >
              <img src={hornLogo} alt="Horn"/>
            </Link>
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