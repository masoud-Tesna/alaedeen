import { useState } from "react";
import { Link } from "react-router-dom";

// import Styles For default:
import './styles/DefaultHeader.less';

// Ant Design Import:
import { Button, Col, Dropdown, Input, Layout, Menu, Row, Skeleton } from 'antd';
import { DownOutlined } from "@ant-design/icons";

// import alaedeen character:
import alaedeenChar from '../../assets/images/alaedeen-char.svg';

// import helper functions:
import { __ } from "../../../functions/Helper";

// import i18next component:
import { useTranslation } from "react-i18next";

// import user context:
import { logout, useDispatchAuthState, useGetAuthState } from '../../../contexts/user/UserContext';

import { useGetConfig } from "../../../contexts/config/ConfigContext";

import ShowResponsiveImage from "../../common/ShowResponsiveImage";

// import OneRequestMultipleQuotesModal component for show send request form modal:
/*import OneRequestMultipleQuotesModal from "../../blocks/static_templates/OneRequestMultipleQuotesModal";*/

const DefaultHeader = ({ pathName }) => {

  // get initial config:
  const { config } = useGetConfig();

  // state for request form modal:
  /*const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);*/

  const [dropDownIsActive, setDropDownIsActive] = useState(false);

  const [searchValue, setSearchValue] = useState();

  const { Header } = Layout;

  const { t } = useTranslation();

  const { user_data } = useGetAuthState();

  const { AuthDispatch } = useDispatchAuthState();

  // function for handle sign out
  const handleLogOut = () => {
    AuthDispatch(logout(AuthDispatch));
  }

  const menu = (
    <Menu className="header--userMenu">
      <Menu.Item>
        <span className="font-weight-bold">
          {` ${user_data?.auth.firstname} ${user_data?.auth.lastname} `}
        </span>
      </Menu.Item>

      {(user_data?.auth?.company_id === "488" && user_data?.auth?.plan_id === "8") &&
        <Menu.Item>
          <Link to={ "/dashboard" }>
            { t(__('dashboard')) }
          </Link>
        </Menu.Item>
      }

      <Menu.Item>
        <a href="https://alaedeen.com/horn/profile-settings/">
          { t(__('profile settings')) }
        </a>
      </Menu.Item>

      <Menu.Item>
        <a href="https://alaedeen.com/horn/my-tickets/">
          { t(__('my_tickets')) }
        </a>
      </Menu.Item>

      {/*<Menu.Item>
        <a href="https://alaedeen.com/horn/compare/">
          { t(__('Comparison')) }
        </a>
      </Menu.Item>*/}

      <Menu.Item>
        <a href="https://alaedeen.com/horn/index.php?dispatch=vendor_communication.threads">
          { t(__('Messages')) }
        </a>
      </Menu.Item>

      <Menu.Item>
        <a href="https://alaedeen.com/horn/wishlist/">
          { t(__('Favorites')) }
        </a>
      </Menu.Item>

      <Menu.Item className="header--userMenu__signOut">
        <Button className="header--userMenu__signOutBtn w-100 bg-primary-darken" onClick={handleLogOut}>
          { t(__('sign out')) }
        </Button>
      </Menu.Item>
    </Menu>
  );

  const handleSubmitSearch = () => {
    if (searchValue) {
      window.location.href = `/horn/?subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=${ searchValue }&dispatch=products.search&security_hash=6f98c36fe3677b696695ad3ca456de51`;
    }
  }

  // Show suffix for search input:
  const searchTextSuffix = (text) => {
    return(
      <span className="suffix-content vv-font-size-2" onClick={() => { handleSubmitSearch() }}>
      <i className="far fa-search vv-font-size-2" /> { text }
    </span>
    );
  }

  // Show prefix for search input:
  const searchTextPrefix = <i className="far fa-search text-primary vv-font-size-2 cursor-pointer" onClick={() => { handleSubmitSearch() }} />

  // show request form modal function:
  /*const showRequestModalHeader = () => {
    setIsRequestModalVisible(true);
  }*/

  return (
    <Header className="site--header">
      <Row className="h-100 header--container">
        <Col span={24} className="header--col shadow-line d-none d-lg-block">
          <Row className="h-100 " gutter={{ md: 8, lg: 16, xl: 50 }} justify="space-between">
            {/*<Col className="header--content__left" md={ 18 } lg={ 18 } xl={ 18 }>
              <Row className="h-100">
                <Col className="my-auto" md={10} lg={10} xl={9} xxl={7}>
                  <div className="logo">
                    <Link to={"/"} className="d-block">
                      <Row>
                        <Col flex="26px" className="logo--character">
                          <img src={alaedeenChar} alt=""/>
                        </Col>
                        <Col flex="1 1" className="pl-2">
                          <Row className="h-100">
                            <Col span={24} className="logo--alaedeenCom">
                              <i className="logo-icon-alaedeen-com" />
                            </Col>
                            <Col span={24} className="logo--alaedeenSlug">
                              <p className={ `m-0 text-47 vv-font-size-1-4` }>{ t(__('Alaedeen Slug Section')) }</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Link>
                  </div>
                </Col>
                <Col className="my-auto header--left__searchBox" md={14} lg={14} xl={15} xxl={17}>
                  <Input placeholder={ t(__('What are you looking for...')) } suffix={searchTextSuffix(t(__('search')))} onChange={e => {setSearchValue(e.target.value)}} onPressEnter={() => { handleSubmitSearch() }} />
                </Col>
              </Row>
            </Col>
            <Col className="header--content__right my-auto" md={ 6 } lg={ 6 } xl={ 5 }>
              <Row className="h-100" gutter={12}>
                <Col span={24}>
                  <Row className="header--content__account" align="middle" gutter={12}>

                    { user_data.load ?
                      <>
                        <Skeleton avatar paragraph={{ rows: 1 }} />
                      </> :
                      <>
                        { user_data.auth.user_id ?
                          <>
                            <Dropdown overlay={menu} trigger={['click']} openClassName="content--account__DropDownIsOpen" onVisibleChange={visible => setDropDownIsActive(visible)} >

                              <Row className="w-100" align="middle" gutter={12} onClick={e => e.preventDefault()}>
                                <Col>
                                  { (user_data?.auth?.company_logo && user_data?.auth?.company_logo.length !== 0) ?
                                    <span className="content--account__companyLogo">
                                      <ShowResponsiveImage
                                        imagePath={ user_data?.auth?.company_logo?.logo_path }
                                        imageFolder='company_logo'
                                        width={50}
                                        height={50}
                                        skeletonWidth="50px"
                                        skeletonHeight="50px"
                                        skeletonRadius="50%"
                                        skeletonSvgWidth="30px"
                                        imageAlt={ user_data?.auth?.company ? user_data?.auth?.company : ` ${user_data?.auth?.firstname} ${user_data?.auth?.lastname} `}
                                        object_id={user_data?.auth?.company_id}
                                        object_type={`company_logo${config.language}`}
                                      />
                                    </span> :
                                    <i className="fal fa-user display-3 text-70 d-block" />
                                  }
                                </Col>

                                <Col span={16}>
                                  <span className="font-weight-600 content--account__companyName">
                                    { user_data?.auth?.company || `${user_data?.auth?.firstname} ${user_data?.auth?.lastname}` }
                                  </span>
                                  <DownOutlined rotate={ dropDownIsActive ? 180 : 0} />
                                </Col>
                              </Row>

                            </Dropdown>
                          </> :
                          <>
                            <Col>
                              <i className="fal fa-user display-3 text-70 d-block" />
                            </Col>
                            <Col span={16}>
                              <Row gutter={[0, 24]}>
                                <Col span={24} className="header--account__link">
                                  <Link className="text-70 vv-font-size-2" to={"/sign-in"} >
                                    {t(__('Sign in'))}
                                  </Link>
                                </Col>
                                <Col span={24} className="header--account__link">
                                  <Link className="text-70 vv-font-size-2" to={"/register"} >
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
                <Col span={13} className="pr-0 pr-lg-5 btn-request my-auto">
                  <Button className="border border-primary-darken border-w-2 text-primary-darken  font-weight-600 p-0" size="large" onClick={() => { showRequestModalHeader() }}>{t(__('Request a Quote'))}</Button>
                </Col>
              </Row>
            </Col>*/}

            <Col span={6} className="my-auto">
              <div className="logo">
                <Link to={"/"} className="d-block">
                  <Row>
                    <Col flex="26px" className="logo--character">
                      <img src={alaedeenChar} alt=""/>
                    </Col>
                    <Col flex="1 1" className="pl-2">
                      <Row className="h-100">
                        <Col span={24} className="logo--alaedeenCom">
                          <i className="logo-icon-alaedeen-com" />
                        </Col>
                        <Col span={24} className="logo--alaedeenSlug">
                          <p className={ `m-0 text-47 vv-font-size-1-4` }>{ t(__('Alaedeen Slug Section')) }</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Link>
              </div>
            </Col>

            <Col span={12} className="my-auto header--left__searchBox">
              {(pathName !== 'page' && pathName !== 'blog') &&
              <Input placeholder={ t(__('What are you looking for...')) } suffix={searchTextSuffix(t(__('search')))} onChange={e => {setSearchValue(e.target.value)}} onPressEnter={() => { handleSubmitSearch() }} />
              }
            </Col>

            <Col span={6} className="my-auto">
              <Row className="header--content__account" align="middle" gutter={12}>

                { user_data.load ?
                  <>
                    <Skeleton avatar paragraph={{ rows: 1 }} />
                  </> :
                  <>
                    { user_data.auth.user_id ?
                      <>
                        <Dropdown overlay={menu} trigger={['click']} openClassName="content--account__DropDownIsOpen" onVisibleChange={visible => setDropDownIsActive(visible)} >

                          <Row className="w-100" align="middle" gutter={12} onClick={e => e.preventDefault()}>
                            <Col>
                              { (user_data?.auth?.company_logo && user_data?.auth?.company_logo.length !== 0) ?
                                <span className="content--account__companyLogo">
                                      <ShowResponsiveImage
                                        imagePath={ user_data?.auth?.company_logo?.logo_path }
                                        imageFolder='company_logo'
                                        width={50}
                                        height={50}
                                        skeletonWidth="50px"
                                        skeletonHeight="50px"
                                        skeletonRadius="50%"
                                        skeletonSvgWidth="30px"
                                        imageAlt={ user_data?.auth?.company ? user_data?.auth?.company : ` ${user_data?.auth?.firstname} ${user_data?.auth?.lastname} `}
                                        object_id={user_data?.auth?.company_id}
                                        object_type={`company_logo${config.language}`}
                                      />
                                    </span> :
                                <i className="fal fa-user display-3 text-70 d-block" />
                              }
                            </Col>

                            <Col span={16}>
                                  <span className="font-weight-600 content--account__companyName">
                                    { user_data?.auth?.company || `${user_data?.auth?.firstname} ${user_data?.auth?.lastname}` }
                                  </span>
                              <DownOutlined rotate={ dropDownIsActive ? 180 : 0} />
                            </Col>
                          </Row>

                        </Dropdown>
                      </> :
                      <>
                        <Col>
                          <i className="fal fa-user display-3 text-70 d-block" />
                        </Col>
                        <Col span={16}>
                          <Row gutter={[0, 24]}>
                            <Col span={24} className="header--account__link">
                              <Link className="text-70 vv-font-size-2" to={"/sign-in"} >
                                {t(__('Sign in'))}
                              </Link>
                            </Col>
                            <Col span={24} className="header--account__link">
                              <Link className="text-70 vv-font-size-2" to={"/register"} >
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
          </Row>
        </Col>

        {(pathName !== 'page' && pathName !== 'blog') &&
          <Col span={24} className="d-lg-none header--mobile__searchBox">
            <Input placeholder={ t(__('What are you looking for...')) } prefix={searchTextPrefix} onChange={e => {setSearchValue(e.target.value)}} onPressEnter={() => { handleSubmitSearch() }} />
          </Col>
        }
      </Row>
      {/*<OneRequestMultipleQuotesModal
        isRequestModalVisible = {isRequestModalVisible}
        setIsRequestModalVisible = {setIsRequestModalVisible}
      />*/}

    </Header>
  );
};

export default DefaultHeader;