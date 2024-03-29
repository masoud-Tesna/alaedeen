import "../styles/MobileHeader.less";
import {Col, Collapse, Divider, Drawer, Row, Skeleton, Space} from "antd";
import ShowResponsiveImage from "../../../common/ShowResponsiveImage";
import {__} from "../../../../utilities/functions/Helper";
import {Link} from "react-router-dom";
import {DownOutlined} from "@ant-design/icons";
import {useState} from "react";
import {logout, useDispatchAuthState, useGetAuthState} from "../../../../contexts/user/UserContext";
import {useTranslation} from "react-i18next";
import {
  changeCurrencyAction,
  changeLanguageAction,
  useConfigDispatch,
  useGetConfig
} from "../../../../contexts/config/ConfigContext";

import {isLoadingAction, useSpinnerDispatch} from "../../../../contexts/spiner/SpinnerContext";
import alaedeenChar from "../../../assets/images/alaedeen-char.png";
import {changeLanguage} from "../../../../utilities/functions";

const MobileHeader = () => {
  
  // for show languages and currencies:
  const { Panel } = Collapse;
  
  const { user_data } = useGetAuthState();
  
  const { AuthDispatch } = useDispatchAuthState();
  
  const { t } = useTranslation();
  
  // initial state for language:
  const { config } = useGetConfig();
  const { configDispatch } = useConfigDispatch();
  
  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();
  
  // initial state for drawer Menu (mobile version):
  const [visibleTopPanelMenu, setVisibleTopPanelMenu] = useState(false);
  
  // function for show drawer Menu:
  const showTopPanelMenu = () => {
    setVisibleTopPanelMenu(true);
  }
  
  // function for close drawer Menu:
  const closeTopPanelMenu = () => {
    setVisibleTopPanelMenu(false);
  }
  
  // function for handle sign out
  const handleLogOut = () => {
    AuthDispatch(logout(AuthDispatch));
    closeTopPanelMenu();
  }
  
  // function for change language:
  const handleChangeLanguage = (lang) => {
    if (lang !== config.language) {
      // show spinner (spinner context):
      spinnerDispatch(isLoadingAction(true));
  
      // call change language function:
      changeLanguage(lang)
        .then(() => {
          configDispatch(changeLanguageAction(lang));
        }) // call change language dispatch
        .then(() => {
          closeTopPanelMenu();
        }) // close top panel menu
        .then(() => {
          spinnerDispatch(isLoadingAction(false));
        }); // hide spinner (spinner context)
    }
  }
  
  // function for change currency:
  const handleChangeCurrency = (e) => {
    if (e.target.value !== config.currency) {
      // show spinner (spinner context):
      spinnerDispatch(isLoadingAction(true));
      
      configDispatch(changeCurrencyAction(e.target.value));
      
      const changeCurrencyTimer = setTimeout(() => {
        // hidden spinner (spinner context):
        spinnerDispatch(isLoadingAction(false));
        closeTopPanelMenu();
      }, 1000);
      return () => clearTimeout(changeCurrencyTimer);
      
    }
  }
  
  return (
    <Row className="bg-top-panel mobileHeader--container">
      <Drawer
        placement="right"
        className="shadow-lg m-0 p-0 topPanel--menuXs"
        closable={false}
        width={"75%"}
        onClose={closeTopPanelMenu}
        visible={visibleTopPanelMenu}
      >
        <Row className="topPanel--menuXs__container">
          <Col span={24} className="align-self-start topPanel--menuXs__topSection">
            <Col span={24} className="menuXs--bgTopSection__container">
              <Row className="h-100 px-4" align="middle">
            
                { user_data.load ?
                  <>
                    <Skeleton avatar paragraph={{ rows: 1 }} />
                  </> :
                  <>
                    { user_data.auth.user_id ?
                      <>
                        <Col flex={ user_data?.auth?.company_logo ? "76px" : "51px" }>
                          { user_data.auth.company_logo ?
                            <span className="content--account__companyLogo">
                                <ShowResponsiveImage
                                  imagePath={ user_data?.auth?.company_logo?.logo_path }
                                  imageFolder='company_logo'
                                  width={60}
                                  height={60}
                                  skeletonWidth="60px"
                                  skeletonHeight="60px"
                                  skeletonRadius="50%"
                                  skeletonSvgWidth="4rem"
                                  imageAlt={ user_data?.auth?.company ? user_data?.auth?.company : ` ${user_data?.auth?.firstname} ${user_data?.auth?.lastname} `}
                                  object_id={user_data?.auth?.company_id}
                                  object_type={`company_logo${config.language}`}
                                />
                              </span> :
                            <i className="fal fa-user text-white vv-font-size-4-5" />
                          }
                        </Col>
                    
                        <Col flex="1 1">
                          <Row gutter={[0, 5]}>
                            <Col span={24} className="text-white vv-font-size-1-6 font-weight-bolder">
                              {t(__('Hello'))}
                            </Col>
                            <Col span={24} className="d-flex">
                              <div className="text-white font-weight-600 text-truncate" style={{ direction: 'rtl' }}>
                                {user_data.auth.company ?
                                  <>{ user_data.auth.company }</> :
                                  <>{ ` ${user_data.auth.firstname} ${user_data.auth.lastname} ` }</>
                                }
                              </div>
                          
                              <Divider type="vertical" className="border-70 my-auto"/>
                          
                              <div className="text-white font-weight-600 cursor-pointer" onClick={handleLogOut}>
                                { t(__('sign out')) }
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </> :
                      <>
                        <Col flex="51px">
                          <i className="fal fa-user text-white vv-font-size-4-5" />
                        </Col>
                    
                        <Col flex="1 1">
                          <Row gutter={[0, 5]}>
                            <Col span={24} className="text-white vv-font-size-1-6 font-weight-bolder">
                              {t(__('Hello'))}
                            </Col>
                            <Col span={24}>
                              <Link className="text-white vv-font-size-1-5 font-weight-600" to={"/sign-in"} >
                                {t(__(' Sign in'))}
                              </Link>
                              <Divider type="vertical" className="border-70"/>
                              <Link className="text-white vv-font-size-1-5 font-weight-600" to={"/register"} >
                                {t(__('Join Free'))}
                              </Link>
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
                        <i className="fal fa-home text-primary vv-font-size-2-5" />
                      </Col>
                      <Col span={18} className="my-auto">
                        <span className="text-70">{t(__('Home'))}</span>
                      </Col>
                    </Row>
                  </Link>
              
                  <Link className="menuXs--sideNavLinks__item d-block" to={"/dashboard"} >
                    <Row justify={"space-between"}>
                      <Col className="text-center" span={5}>
                        <i className="fal fa-user-cog text-primary vv-font-size-2-5" />
                      </Col>
                      <Col span={18} className="my-auto">
                        <span className="text-70">{t(__('dashboard'))}</span>
                      </Col>
                    </Row>
                  </Link>
              
                  <a className="menuXs--sideNavLinks__item d-block" href="https://alaedeen.com/horn/my-tickets/" >
                    <Row justify={"space-between"}>
                      <Col className="text-center" span={5}>
                        <i className="fal fa-user-headset text-primary vv-font-size-2-5" />
                      </Col>
                      <Col span={18} className="my-auto">
                        <span className="text-70">{t(__('my tickets'))}</span>
                      </Col>
                    </Row>
                  </a>
              
                  <span className="menuXs--sideNavLinks__item languagesCurrencyCollapse d-block">
                      <Row justify={"space-between"}>
                        <Col className="text-center" span={5}>
                          <i className="fal fa-globe text-primary vv-font-size-2-5" />
                        </Col>
                        <Col style={{ paddingTop: '0.9rem' }} span={18}>
                          <Collapse
                            expandIconPosition={"right"}
                            ghost
                            expandIcon={({ isActive }) => <DownOutlined rotate={ ['fa', 'ar'].find(lng => lng === config.language) ? (isActive ? 0 : 1) : (isActive ? 180 : 0) } />}
                          >
                            <Panel header={t(__('Language & Currency'))} key="1">
                              <div className="mb-4">
                                <Row justify="space-between">
                                  <Col className="my-auto">
                                    <span className="mr-2">{t(__('Language'))}</span>
                                  </Col>
                                  <Col className="my-auto" span={12}>
                                    <select
                                      value={config.language}
                                      onChange={e => handleChangeLanguage(e.target.value)}
                                      className="w-100 text-red-a0 select-box-remove-arrow border-0  p-0 mobileChangeLangSelect">
                                      <option value="en">English</option>
                                      <option value="ar">عربی</option>
                                      <option value="fa">فارسی</option>
                                      <option value="zh">Chinese</option>
                                      <option value="ru">Russian</option>
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
                                      value={config.currency}
                                      onChange={e => handleChangeCurrency(e)}
                                      className="w-100 text-red-a0 select-box-remove-arrow border-0 p-0 mobileChangeCurrencySelect">
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
              
                  {/*<a className="menuXs--sideNavLinks__item d-block" href="https://alaedeen.com/horn/wishlist/" >
                      <Row justify={"space-between"}>
                        <Col className="text-center" span={5}>
                          <i className="fal fa-star text-primary vv-font-size-3" />
                        </Col>
                        <Col span={18} className="my-auto">
                          <span className="text-70 vv-font-size-1-6">{t(__('Favorites'))}</span>
                        </Col>
                      </Row>
                    </a>*/}
              
                  {/*<a className="menuXs--sideNavLinks__item d-block" href="https://alaedeen.com/horn/compare/">
                      <Row justify={"space-between"}>
                        <Col className="text-center" span={5}>
                          <i className="icon-vv-compare text-primary vv-font-size-2-5" />
                        </Col>
                        <Col span={18} className="my-auto">
                          <span className="text-70 vv-font-size-1-6">{t(__('Comparison'))}</span>
                        </Col>
                      </Row>
                    </a>*/}
              
                  {/*<a className="menuXs--sideNavLinks__item d-block" href="https://alaedeen.com/horn/index.php?dispatch=vendor_communication.threads">
                      <Row justify={"space-between"}>
                        <Col className="text-center" span={5}>
                          <i className="fal fa-envelope text-primary vv-font-size-3" />
                        </Col>
                        <Col span={18} className="my-auto">
                          <span className="text-70 vv-font-size-1-6">{t(__('Messages'))}</span>
                        </Col>
                      </Row>
                    </a>*/}
                </Space>
              </Col>
              <Divider className="border-bc" />
              <Col className="px-4 menuXs--sideNavBtn__items" span={24}>
                <Space direction="vertical" size={15}>
                  <a href={`https://calendar.iranfair.com/${config.language === 'ar'? '' : config.language}`} target="_blank" rel="noreferrer" className="border border-primary text-primary w-100 d-block text-center">{t(__('International Exhibition'))}</a>
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
                <div className="text-white vv-font-size-1-3 font-weight-bold">
                  {t(__('Download the alaedeen app'))}
                </div>
                <div className="text-white vv-font-size-1-2 mt-2">
                  {t('app_msg.mobile_menu')}
                </div>
              </div>
            </Space>
          </Col>
        </Row>
      </Drawer>
      
      <Col span={24} className="topPanel--col">
        <Row className="h-100" gutter={8} justify="space-between">
          <Col span={16} className="my-auto vv-cursor-pointer topPanel--col__logoXS">
            <Link to={"/"} className="d-block">
              <Row className="topPanel--col__logoXSRow">
                <Col flex="27px" className="logo--character">
                  <img src={alaedeenChar} alt=""/>
                </Col>
                <Col flex="1 1" className="logo-slug">
                  <Row className="h-100">
                    <Col span={24} className="logo--alaedeenCom">
                      <i className="logo-icon-alaedeen-com vv-font-size-1-8" />
                    </Col>
                    <Col span={24} className="logo--alaedeenSlug">
                      <p className="m-0 text-white">{ t(__('Alaedeen Slug Section')) }</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Link>
          </Col>
          {/*<Col span={11} className="my-auto text-center topPanel--col__btnRequest">
            <Button className="border border-secondary-2 bg-secondary-2 border-w-2 text-white font-weight-600 p-0" size="large" onClick={() => { showRequestModalHeader() }}>{t(__('Request a Quote'))}</Button>
          </Col>*/}
          <Col span={4} className="my-auto vv-cursor-pointer text-right" onClick={showTopPanelMenu}>
            <i className="fas fa-grip-lines cursor-pointer text-white display-3" />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MobileHeader;
