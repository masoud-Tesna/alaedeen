import { useState } from "react";
import { Link } from "react-router-dom";

// import Styles For default:
import './styles.less';

// Ant Design Import:
import { Row, Col, Divider, Space, Button, Collapse, Drawer, Skeleton } from 'antd';
import { DownOutlined } from "@ant-design/icons";

// import categories drop down:
import { CategoriesDropDownVertical as Categories } from "../../blocks/categories/CategoriesDropDownVertical";

// import images used:
import hornLogo from '../../../assets/images/logoXs.png';

// import another components used:
import LoaderSpinner from '../../blocks/static_templates/LoadSpinner';

// import language context:
import { changeLanguageAction, useGetLanguageState, useDispatchLanguageState } from '../../../contexts/language/LanguageContext';

// import Custom hooks:
import { useWindowSize } from "../../../functions";

// import helper functions:
import { __ } from "../../../functions/Helper";

// import i18next component:
import { useTranslation } from "react-i18next";

// import user context:
import { logout, useDispatchAuthState, useGetAuthState } from "../../../contexts/user/UserContext";

const DefaultTopPanel = () => {

  const { user_data } = useGetAuthState();

  const { AuthDispatch } = useDispatchAuthState();

  const { t } = useTranslation();

  // get screen width:
  const { width } = useWindowSize();

  // initial state for language:
  const { language } = useGetLanguageState();
  const { languageDispatch } = useDispatchLanguageState();

  // initial state for currency:
  const [currency, setCurrency] = useState('USD');

  // initial state for drawer Menu (mobile version):
  const [visibleTopPanelMenuXs, setVisibleTopPanelMenuXs] = useState(false);

  // initial state for show spinner:
  const [ showLoadSpinner, setShowLoadSpinner ] = useState(false);

  // function for change language:
  const handleChangeLanguage = (lang) => {
    if (lang !== language) {
      setShowLoadSpinner(true);

      languageDispatch(changeLanguageAction(lang));
      setTimeout(() => {
        setShowLoadSpinner(false);
        setVisibleTopPanelMenuXs(false);
      }, 1000);

    }
  }

  // function for change currency:
  const handleChangeCurrency = (e) => {
    setCurrency(e.target.value);
    if (e.target.value !== currency) {
      setShowLoadSpinner(true);

      setCurrency(e.target.value);
      setTimeout(() => {
        setShowLoadSpinner(false);
        setVisibleTopPanelMenuXs(false);
      }, 1000);

    }
  }

  // function for show drawer Menu:
  const showTopPanelMenuXs = () => {
    setVisibleTopPanelMenuXs(true);
  }

  // function for close drawer Menu:
  const closeTopPanelMenuXs = () => {
    setVisibleTopPanelMenuXs(false);
  }

  // function for handle sign out
  const handleLogOut = () => {
    AuthDispatch(logout(AuthDispatch));
    closeTopPanelMenuXs();
  }

  // for show languages and currencies:
  const { Panel } = Collapse;

  return (
    <Row className="bg-top-panel topPanel--container">

      {/*Show Loading Spinner if Change language*/}
      <div className={ `${ showLoadSpinner ? 'd-block' : 'd-none' }` }>
        <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/>
      </div>

      {/* if Screen Width <= 992px (Mobile) render drawer Menu: */}
      {width <= 992 &&
        <Drawer
          placement="right"
          className="shadow-lg m-0 p-0 topPanel--menuXs"
          closable={false}
          width={"75%"}
          onClose={closeTopPanelMenuXs}
          visible={visibleTopPanelMenuXs}
        >
          <Row className="topPanel--menuXs__container">
            <Col span={24} className="align-self-start topPanel--menuXs__topSection">
              <Col span={24} className="menuXs--bgTopSection__container">
                <Row className="h-100 px-4" align="middle" gutter={16}>

                  { user_data.load ?
                    <>
                      <Skeleton avatar paragraph={{ rows: 1 }} />
                    </> :
                    <>
                      { user_data.auth.user_id ?
                        <>
                          <Col span={ user_data.auth.company_logo ? 7 : 5 }>
                            { user_data.auth.company_logo ?
                              <span className="content--account__companyLogo">
                                  <img src={user_data.auth.company_logo.logo_path} alt=""/>
                                </span> :
                              <i className="fal fa-user text-white vv-font-size-4-5" />
                            }
                          </Col>

                          <Col span={ user_data.auth.company_logo ? 17 : 19 }>
                            <Row gutter={[0, 5]}>
                              <Col span={24} className="text-white vv-font-size-1-7 font-weight-bolder">
                                {t(__('Hello'))}
                              </Col>
                              <Col span={24} className="d-flex">
                                <div className="text-white vv-font-size-1-5 font-weight-600 text-truncate" style={{ direction: 'rtl' }}>
                                  {user_data.auth.company ?
                                    <>{ user_data.auth.company }</> :
                                    <>{ ` ${user_data.auth.firstname} ${user_data.auth.lastname} ` }</>
                                  }
                                </div>

                                <Divider type="vertical" className="border-70 my-auto"/>

                                <div className="text-white vv-font-size-1-5 font-weight-600 cursor-pointer" onClick={handleLogOut}>
                                  { t(__('sign out')) }
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </> :
                        <>
                          <Col>
                            <i className="fal fa-user text-white vv-font-size-4-5" />
                          </Col>

                          <Col>
                            <Row gutter={[0, 5]}>
                              <Col span={24} className="text-white vv-font-size-1-7 font-weight-bolder">
                                {t(__('Hello'))}
                              </Col>
                              <Col span={24}>
                                <Link className="text-white vv-font-size-1-7 font-weight-600" to={"/sign-in"} >
                                  {t(__(' Sign in'))}
                                </Link>
                                <Divider type="vertical" className="border-70"/>
                                <a className="text-white vv-font-size-1-7 font-weight-600" href="https://hornb2b.com/horn/register/">
                                  {t(__('Join Free'))}
                                </a>
                              </Col>
                            </Row>
                          </Col>
                        </>
                      }
                    </>
                  }

                </Row>
              </Col>
            </Col>

            <Col span={24} className="topPanel--menuXs__middleSection">
              <Row className="pt-4 px-4">
                <Col className="menuXs--sideNavLinks__items" span={24}>
                  <Space direction="vertical" size={"middle"} className="w-100">
                    <Link className="menuXs--sideNavLinks__item d-block" to={"/"} >
                      <Row justify={"space-between"}>
                        <Col className="text-center" span={5}>
                          <i className="fal fa-home text-primary vv-font-size-3" />
                        </Col>
                        <Col span={18} className="my-auto">
                          <span className="text-70 vv-font-size-1-6">{t(__('Home'))}</span>
                        </Col>
                      </Row>
                    </Link>

                    <span className="menuXs--sideNavLinks__item languagesCurrencyCollapse d-block">
                      <Row justify={"space-between"}>
                        <Col className="text-center" span={5}>
                          <i className="fal fa-globe text-primary vv-font-size-3" />
                        </Col>
                        <Col style={{ paddingTop: '0.9rem' }} span={18}>
                          <Collapse
                            expandIconPosition={"right"}
                            ghost
                            expandIcon={({ isActive }) => <DownOutlined rotate={ language === 'en' ? (isActive ? 180 : 0) : (isActive ? 0 : 1)} />}
                          >
                            <Panel header={t(__('Language & Currency'))} key="1">
                              <div className="mb-4">
                                <Row justify="space-between">
                                  <Col className="my-auto">
                                    <span className="mr-2">{t(__('Language'))}</span>
                                  </Col>
                                  <Col className="my-auto" span={12}>
                                    <select
                                      value={language}
                                      onChange={e => handleChangeLanguage(e.target.value)}
                                      className="w-100 text-red-a0 select-box-remove-arrow border-0 vv-font-size-1-5 p-0 mobileChangeLangSelect">
                                      <option value="en">English</option>
                                      <option value="ar">عربی</option>
                                      <option value="fa">فارسی</option>
                                    </select>
                                  </Col>
                                </Row>
                              </div>

                              <div>
                                <Row justify="space-between">
                                  <Col className="my-auto" span={12}>
                                    <span className="mr-2">{t(__('Currency'))}</span>
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
                    </span>

                    <a className="menuXs--sideNavLinks__item d-block" href="https://hornb2b.com/horn/wishlist/" >
                      <Row justify={"space-between"}>
                        <Col className="text-center" span={5}>
                          <i className="fal fa-star text-primary vv-font-size-3" />
                        </Col>
                        <Col span={18} className="my-auto">
                          <span className="text-70 vv-font-size-1-6">{t(__('Favorites'))}</span>
                        </Col>
                      </Row>
                    </a>

                    <a className="menuXs--sideNavLinks__item d-block" href="https://hornb2b.com/horn/compare/">
                      <Row justify={"space-between"}>
                        <Col className="text-center" span={5}>
                          <i className="icon-vv-compare text-primary vv-font-size-2-5" />
                        </Col>
                        <Col span={18} className="my-auto">
                          <span className="text-70 vv-font-size-1-6">{t(__('Comparison'))}</span>
                        </Col>
                      </Row>
                    </a>

                    <a className="menuXs--sideNavLinks__item d-block" href="https://hornb2b.com/horn/index.php?dispatch=vendor_communication.threads">
                      <Row justify={"space-between"}>
                        <Col className="text-center" span={5}>
                          <i className="fal fa-envelope text-primary vv-font-size-3" />
                        </Col>
                        <Col span={18} className="my-auto">
                          <span className="text-70 vv-font-size-1-6">{t(__('Messages'))}</span>
                        </Col>
                      </Row>
                    </a>
                  </Space>
                </Col>
                <Divider className="border-bc" />
                <Col className="px-4 menuXs--sideNavBtn__items" span={24}>
                  <Space direction="vertical" size={15}>
                    <a href={`https://calendar.iranfair.com/${language === 'ar'? '' : language}`} target="_blank" rel="noreferrer" className="border border-primary text-primary w-100 d-block text-center">{t(__('International Exhibition'))}</a>
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
                    {t(__('Download the Horn app'))}
                  </div>
                  <div className="text-white vv-font-size-1-2 mt-2">
                    {t(__('For 10x Faster'))}
                  </div>
                </div>
              </Space>
            </Col>
          </Row>
        </Drawer>
      }

      <Col span={24} className="topPanel--col">
        <Row className="h-100" gutter={24} justify="space-between">
          <Col className="topPanel--content__left my-auto d-none d-lg-block">
            <Space size="middle" align={"center"}>
              <Categories userClass="categories--dropDown topPanel--content__item hover" />
              <Divider type="vertical" className="border-70"/>
              <Link className="topPanel--content__item hover" to={"/factories"} >
                <span className="topPanel--item__text">
                  {t(__('Stores'))}
                </span>
              </Link>

              <a className="topPanel--content__item hover" href="https://hornb2b.com/horn/logistics/">
                <span className="topPanel--item__text">
                  {t(__('Logistics'))}
                </span>
              </a>

              <a className="topPanel--content__item hover" href={`https://calendar.iranfair.com/${language === 'ar'? '' : language}`} target="_blank" rel="noreferrer">
                <span className="topPanel--item__text">
                  {t(__('International Exhibition'))}
                </span>
              </a>
            </Space>
          </Col>
          <Col className="topPanel--content__right my-auto d-none d-lg-block">
            <Space size={0.5}>
              <span
                className={ `vv-cursor-pointer topPanel--content__item ${ language === 'ar' ? 'active' : 'hover' }` }
                onClick={() => handleChangeLanguage('ar')}>
                <span className="topPanel--item__text">
                  عربی
                </span>
              </span>
              <Divider type="vertical" className="border-70"/>
              <span
                className={ `vv-cursor-pointer topPanel--content__item ${ language === 'en' ? 'active' : 'hover' }` }
                onClick={() => handleChangeLanguage('en')}>
                <span className="topPanel--item__text">
                  English
                </span>
              </span>
              <Divider type="vertical" className="border-70"/>
              <span
                className={ `vv-cursor-pointer topPanel--content__item ${ language === 'fa' ? 'active' : 'hover' }` }
                onClick={() => handleChangeLanguage('fa')}>
                <span className="topPanel--item__text">
                  فارسی
                </span>
              </span>

              <Link className="topPanel--content__item home-icon" to={"/"} >
                <span className="topPanel--item__text">
                  <i className="fal fa-home text-white vv-font-size-2"></i>
                </span>
              </Link>

              <Link className="topPanel--content__item question-icon" to={"/faq"} >
                <span className="topPanel--item__text">
                  <i className="fal fa-question-circle text-white vv-font-size-2"></i>
                </span>
              </Link>

            </Space>
          </Col>
          <Col className="d-lg-none my-auto vv-cursor-pointer topPanel--col__logoXS">
            <Link to={"/"} >
              <img src={hornLogo} alt="Horn"/>
            </Link>
          </Col>
          <Col className="d-lg-none my-auto topPanel--col__btnRequest">
            <Button className="border border-secondary-2 bg-secondary-2 border-w-2 text-white font-weight-600 p-0" size="large">{t(__('Request a Quote'))}</Button>
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