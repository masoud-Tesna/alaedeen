import {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";

// import Styles For default:
import './styles/DefaultHeader.less';

// Ant Design Import:
import {AutoComplete, Button, Col, Dropdown, Input, Layout, Menu, Row, Select, Skeleton} from 'antd';
import { DownOutlined } from "@ant-design/icons";

// import alaedeen character:
import alaedeenChar from '../../assets/images/alaedeen-char.png';

// import helper functions:
import { __ } from "../../../functions/Helper";

// import i18next component:
import { useTranslation } from "react-i18next";

// import user context:
import { logout, useDispatchAuthState, useGetAuthState } from '../../../contexts/user/UserContext';

import { useGetConfig } from "../../../contexts/config/ConfigContext";

import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import axios from "axios";
import {useQuery} from "react-query";
import {useGetApi} from "../../../functions";

// import OneRequestMultipleQuotesModal component for show send request form modal:
/*import OneRequestMultipleQuotesModal from "../../blocks/static_templates/OneRequestMultipleQuotesModal";*/

const DefaultHeader = ({ pathName }) => {
  
  const { Header } = Layout;
  const { Option } = Select;

  // get initial config:
  const { config } = useGetConfig();

  // state for request form modal:
  /*const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);*/

  const [dropDownIsActive, setDropDownIsActive] = useState(false);

  const [searchValue, setSearchValue] = useState();

  const { t } = useTranslation();

  const { user_data } = useGetAuthState();

  const { AuthDispatch } = useDispatchAuthState();

  // function for handle sign out
  const handleLogOut = () => {
    AuthDispatch(logout(AuthDispatch));
  }

  const menu = (
    <Menu className="header--userMenu">
      <Menu.Item key="userFullName">
        <span className="font-weight-bold">
          {` ${user_data?.auth.firstname} ${user_data?.auth.lastname} `}
        </span>
      </Menu.Item>

      <Menu.Item key="dashboardLink">
        <Link to={ "/dashboard" }>
          { t(__('dashboard')) }
        </Link>
      </Menu.Item>

      <Menu.Item key="tickets">
        <a href="https://alaedeen.com/horn/my-tickets/">
          { t(__('my_tickets')) }
        </a>
      </Menu.Item>

      {/*<Menu.Item>
        <a href="https://alaedeen.com/horn/compare/">
          { t(__('Comparison')) }
        </a>
      </Menu.Item>*/}

      {/*<Menu.Item>
        <a href="https://alaedeen.com/horn/index.php?dispatch=vendor_communication.threads">
          { t(__('Messages')) }
        </a>
      </Menu.Item>*/}

      {/*<Menu.Item key="Favorites">
        <a href="https://alaedeen.com/horn/wishlist/">
          { t(__('Favorites')) }
        </a>
      </Menu.Item>*/}

      <Menu.Item className="header--userMenu__signOut" key="logOut">
        <Button className="header--userMenu__signOutBtn w-100 bg-primary-darken" onClick={handleLogOut}>
          { t(__('sign out')) }
        </Button>
      </Menu.Item>
    </Menu>
  );

  // show request form modal function:
  /*const showRequestModalHeader = () => {
    setIsRequestModalVisible(true);
  }*/
  
  
  const Search = () => {
  
    const [searchInput, setSearchInput] = useState("");
  
    const [searchType, setSearchType] = useState("P");
  
    const {
      data,
      isLoading
    } = useGetApi(
      "Search",
      {
        "search_type": searchType,
        "q": searchInput,
      },
      `search_${searchType}_${searchInput}`,
      {
        enabled: !!(searchInput.length > 3),
        refetchOnWindowFocus: false
      }
    );
    
    const results = data || [];
  
    const searchResult = results?.map(result => ({
      value: searchType === "P" ? result?.product_id : result?.company_id,
      label: (
        <div
          key={searchType === "P" ? result?.product_id : result?.company_id}
          className="text-truncate search--result__item"
        >
          {searchType === "P" ?
            <Link to={`/product/${result?.seo_name}`}>{result?.product}</Link> :
            (
              result?.store_type === "A" ?
                <a href={`https://store.alaedeen.com/?store_id=${result?.company_id}`}>{result?.company} ({result?.brand})</a> :
                <Link to={`/store/${result?.link}`}>{result?.company} ({result?.brand})</Link>
            )
          }
        </div>
      ),
    }));
    
    const notFoundContent = () => {
  
      if (searchInput?.length <= 3 && !isLoading) {
        return (
          <div className="search--status">{t(__("Please enter more than 3 words!"))}</div>
        );
      }
      
      if (isLoading) {
        return (
          <div className="search--status" style={{ width: "80%" }}>
            <Skeleton active paragraph={{ rows: 6, width: "50%" }} />
          </div>
        )
      }
      
      return (
        <div className="search--status">{t(__("Not Found!"))}</div>
      )
    }
  
    // Show suffix for search input:
    const searchBtn = (text) => {
      return(
        <span className="suffix-content vv-font-size-2">
          <i className="far fa-search vv-font-size-2" /> { text }
        </span>
      );
    }
  
    const SearchTypeSelect = () => {
      return <Select
        defaultValue={searchType}
        className="--searchType"
        dropdownClassName="--searchType__dropDown"
        bordered={false}
        onChange={(e) => {
          setSearchType(e);
          setSearchInput("");
        }}
      >
        <Option value="P">{t("products")}</Option>
        <Option value="C">{t("companies")}</Option>
      </Select>
    };
  
    return (
      <AutoComplete
        style={{
          width: "100%",
        }}
        options={searchResult}
        notFoundContent={notFoundContent()}
        dropdownClassName="search--result"
      >
        <Row className="--searchBox">
                <Col className="searchType--container" >
                  <SearchTypeSelect />
                </Col>
                
                <Col flex="1 1" className="searchInput--container">
                  <Input
                    value={searchInput}
                    placeholder={ t(__('What are you looking for...')) }
                    suffix={searchBtn(t(__('search')))}
                    onChange = {e => setSearchInput(e.target.value)}
                    onPressEnter={e => setSearchInput(e.target.value)}
                  />
                </Col>
              </Row>
      </AutoComplete>
    );
  };
  

  return (
    <Header className="site--header">
      <Row className="h-100 header--container">
        <Col span={24} className="header--col shadow-line d-none d-lg-block">
          <Row className="h-100 " gutter={{ md: 8, lg: 16, xl: 50 }} justify="space-between">
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

            <Col span={12} className="my-auto">
              <Search />
            </Col>

            <Col span={6} className="my-auto">
              <Row
                className="header--content__account"
                align="middle"
                gutter={12}
                justify={config?.language === "en" ? "end" : "start"}
              >

                { user_data.load ?
                  <>
                    <Skeleton avatar paragraph={{ rows: 1 }} />
                  </> :
                  <>
                    { user_data.auth.user_id ?
                      <>
                        <Dropdown overlay={menu} trigger={['click']} openClassName="content--account__DropDownIsOpen" onVisibleChange={visible => setDropDownIsActive(visible)} >

                          <Row
                            className="w-100"
                            align="middle"
                            justify={ config?.language === "en" ? "end" : "start" }
                            gutter={12}
                            onClick={e => e.preventDefault()}
                          >
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

                            <Col>
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
                        <Col>
                          <div className="header--account__link">
                            <Link className="text-70 vv-font-size-2" to={"/sign-in"} >
                              {t(__('Sign in'))}
                            </Link>
                          </div>

                          <div className="header--account__link">
                            <Link className="text-70 vv-font-size-2" to={"/register"} >
                              {t(__('Join Free'))}
                            </Link>
                          </div>
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
            {/*<Input placeholder={ t(__('What are you looking for...')) } prefix={searchTextPrefix} onChange={e => {setSearchValue(e.target.value)}} onPressEnter={() => { handleSubmitSearch() }} />*/}
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