import {useState} from "react";
import "../styles/AccountActions.less";
import {Button, Col, Dropdown, Menu, Row, Skeleton} from "antd";
import ShowResponsiveImage from "../../../common/ShowResponsiveImage";
import {DownOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {__} from "../../../../utilities/functions/Helper";
import {useGetConfig} from "../../../../contexts/config/ConfigContext";
import {logout, useDispatchAuthState, useGetAuthState} from "../../../../contexts/user/UserContext";
import {useTranslation} from "react-i18next";
import TextTruncate from "react-text-truncate";
import SvgIcon from "../../../common/SvgIcon";

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
                    gutter={12}
                    onClick={e => e.preventDefault()}
                  >
                    <Col flex="58px">
                      { (user_data?.auth?.company_logo && user_data?.auth?.company_logo.length !== 0) ?
                        <span className="content--account__companyLogo">
                          <ShowResponsiveImage
                            imagePath={ user_data?.auth?.company_logo?.logo_path }
                            imageFolder='company_logo'
                            width={46}
                            height={46}
                            skeletonWidth="46px"
                            skeletonHeight="46px"
                            skeletonRadius="46%"
                            skeletonSvgWidth="24px"
                            imageAlt={ user_data?.auth?.company ? user_data?.auth?.company : ` ${user_data?.auth?.firstname} ${user_data?.auth?.lastname} `}
                            object_id={user_data?.auth?.company_id}
                            object_type={`company_logo${config.language}`}
                          />
                        </span> :
                        <SvgIcon icon="profile" width={46} height={46} />
                      }
                    </Col>
      
                    <Col flex="1 1">
                      <Row>
                        <Col className="--accountName">
                          <TextTruncate
                            className="d-block w-100"
                            line={ 1 }
                            element="div"
                            text={ user_data?.auth?.company || `${user_data?.auth?.firstname} ${user_data?.auth?.lastname}` }
                          />
                        </Col>
          
                        <Col >
                          <DownOutlined rotate={ dropDownIsActive ? 180 : 0} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Dropdown>
              </Col>
            </> :
            <>
              <Col className="--accountImg">
                <SvgIcon icon="profile" width={30} height={37} />
              </Col>
              <Col className="header--account__link">
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
              </Col>
            </>
          }
      
        </>
      }
  
    </Row>
  );
};

export default AccountActions;
