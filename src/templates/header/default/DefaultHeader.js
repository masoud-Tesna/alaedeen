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

  const handleSubmitSearch = () => {
    if (searchValue) {
      /*window.location.href = `/horn/?subcats=Y&pcode_from_q=Y&pshort=Y&pfull=Y&pname=Y&pkeywords=Y&search_performed=Y&q=${ searchValue }&dispatch=products.search&security_hash=6f98c36fe3677b696695ad3ca456de51`;*/
  
      console.log(searchValue)
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
  
  
  const Complete = () => {
  
    const [searchInputValue, setSearchInputValue] = useState("");
  
    const [searchTypeValue, setSearchTypeValue] = useState("P");
  
    const [isLoading, setIsLoading] = useState(true);
  
    const [characters, setCharacters] = useState([])
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const {data} = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchInputValue}`)
          setCharacters(data.results)
        } catch (error) {
          console.error(error)
        }
      }
    
      fetchData()
    }, [searchInputValue]);
  
    const searchResult = characters.map((character) => ({
      value: character?.id,
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
            <span>
              Found {character?.name}
            </span>
          <span> results</span>
        </div>
      ),
    }));
    
    const onSelect = (value) => {
      console.log('onSelect', value);
    };
    
    const notFoundContent = () => {
      return (
        <h1>Not Found!</h1>
      )
    }
  
    const searchType = (
      <Select
        defaultValue="P"
        className="--searchType"
        dropdownClassName="--searchType__dropDown"
        bordered={false}
        onChange={(e) => {
          setSearchTypeValue(e);
          setSearchInputValue("");
          setCharacters([]);
        }}
      >
        <Option value="P">{t("products")}</Option>
        <Option value="C">{t("companies")}</Option>
      </Select>
    );
  
    return (
      <AutoComplete
        style={{
          width: "100%",
        }}
        options={searchResult}
        onSelect={onSelect}
        notFoundContent={notFoundContent()}
      >
        <Row className="--searchBox">
                <Col className="searchType--container" >
                  {searchType}
                </Col>
                
                <Col flex="1 1" className="searchInput--container">
                  <Input
                    value={searchInputValue}
                    placeholder={ t(__('What are you looking for...')) }
                    suffix={searchTextSuffix(t(__('search')))}
                    onChange = {e => setSearchInputValue(e.target.value)}
                    onPressEnter={e => setSearchInputValue(e.target.value)}
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
              {/*<Row className="--searchBox">
                <Col className="searchType--container" >
                  {searchType}
                </Col>
                
                <Col flex="1 1" className="searchInput--container">
                  <Input
                    placeholder={ t(__('What are you looking for...')) }
    
                    suffix={searchTextSuffix(t(__('search')))}
                    onChange={e => {setSearchValue(e.target.value)}}
                    onPressEnter={() => { handleSubmitSearch() }}
                  />
                </Col>
              </Row>*/}
              <Complete />
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