// react hooks:
import {useState} from "react";

// antd components:
import {Button, Col, Dropdown, Menu, Row, Skeleton} from "antd";

// extra hooks and context function:
import {Link} from "react-router-dom";
import {__} from "../../../../utilities/functions/Helper";
import {useGetConfig} from "../../../../contexts/config/ConfigContext";
import {logout, useDispatchAuthState, useGetAuthState} from "../../../../contexts/user/UserContext";
import {useTranslation} from "react-i18next";
import SvgIcon from "../../../common/SvgIcon";
import styled from "styled-components";
import rtl from "styled-components-rtl";

// extra components:
import ShowResponsiveImage from "../../../common/ShowResponsiveImage";
import {DownOutlined} from "@ant-design/icons";

// style:
import "../styles/AccountActions.less";

// create styled components (AccountLink, MyAlaedeen)
const AccountLink = styled(Col)`
  ${rtl`
    padding-left: 6px;
  `};
`;

const MyAlaedeen = styled(Col)`
  ${rtl`
    padding-right: 9px;
  `};
`;

const AccountActions = () => {
  
  // get initial config:
  const { config } = useGetConfig();
  
  const { t } = useTranslation();
  
  const { user_data } = useGetAuthState();
  
  const { AuthDispatch } = useDispatchAuthState();
  
  const [dropDownIsActive, setDropDownIsActive] = useState(false);
  
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
  
  return (
    <Row className="accountActions--container" align="middle">
    
      { user_data.load ?
        <>
          <Skeleton avatar paragraph={{ rows: 1 }} />
        </> :
        <>
          { user_data.auth.user_id ?
            <>
              <Col span={24}>
                <Dropdown
                  overlay={menu}
                  trigger={['click']}
                  className="accountDropDown"
                  openClassName="content--account__DropDownIsOpen"
                  onVisibleChange={visible => setDropDownIsActive(visible)}
                >
                  <Row
                    className="w-100"
                    align="middle"
                    gutter={8}
                    onClick={e => e.preventDefault()}
                  >
                    <Col style={{width: 48}}>
                      { (user_data?.auth?.company_logo && user_data?.auth?.company_logo.length !== 0) ?
                        <span className="content--account__companyLogo">
                          <ShowResponsiveImage
                            imagePath={ user_data?.auth?.company_logo?.logo_path }
                            imageFolder='company_logo'
                            width={40}
                            height={40}
                            skeletonWidth="40px"
                            skeletonHeight="40px"
                            skeletonRadius="50%"
                            skeletonSvgWidth="20px"
                            imageAlt={ user_data?.auth?.company ? user_data?.auth?.company : ` ${user_data?.auth?.firstname} ${user_data?.auth?.lastname} `}
                            object_id={user_data?.auth?.company_id}
                            object_type={`company_logo${config.language}`}
                          />
                        </span> :
                        <SvgIcon icon="profile" width={40} height={40} />
                      }
                    </Col>
      
                    <Col style={{width: "calc(100% - 48px)", marginTop: 3}}>
                      <Row>
                        <MyAlaedeen className="--myAlaedeen">
                          {t("my_alaedeen")}
                        </MyAlaedeen>
          
                        <Col>
                          <DownOutlined rotate={ dropDownIsActive ? 180 : 0} style={{marginTop: 3}} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Dropdown>
              </Col>
            </> :
            <>
              <Col className="--accountImg">
                <SvgIcon icon="profile" width={40} height={40} />
              </Col>
              <AccountLink className="--accountLink">
                <div>
                  <Link to={"/sign-in"} >
                    {t(__('Sign in'))}
                  </Link>
                </div>
              
                <div>
                  <Link to={"/register"} >
                    {t(__('Join Free'))}
                  </Link>
                </div>
              </AccountLink>
            </>
          }
      
        </>
      }
  
    </Row>
  );
};

export default AccountActions;
