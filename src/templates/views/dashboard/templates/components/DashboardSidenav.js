import React, { useEffect, useState } from "react";

import "./styles/DashboardSidenav.less";

import {Badge, Col, Menu, Row, Skeleton} from 'antd';

// import alaedeen character:
import alaedeenChar from '../../../../assets/images/alaedeen-char.png';

import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useConfigDispatch, useGetConfig, changeLanguageAction } from "../../../../../contexts/config/ConfigContext";
import {changeLanguage, useWindowSize} from "../../../../../utilities/functions";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../contexts/spiner/SpinnerContext";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import ShowResponsiveImage from "../../../../common/ShowResponsiveImage";

const DashboardSidenav = ({ dashboardToggleDrawer }) => {

  const { Item, SubMenu } = Menu;

  // initial state for language:
  const { config } = useGetConfig();
  const { configDispatch } = useConfigDispatch();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  // get window width
  const { width } = useWindowSize();

  const { pathname } = useLocation();

  const { user_data } = useGetAuthState();

  const userType = user_data?.auth?.user_type;

  const planId = user_data?.auth?.plan_id || null;

  const isPersonalStore = user_data?.auth?.pay_for_store === "Y";

  const urlPath = pathname?.split("/").filter(Boolean);

  // remove first item of array (first item is "dashboard"):
  urlPath.shift();

  if (urlPath[0] === "requests") {
    if (urlPath[1] === "sent") {
      urlPath[2] = urlPath[2] === "public" ? "public_sent" : urlPath[2] === "private" ? "private_sent" : null;
    }

    if (urlPath[1] === "received") {
      urlPath[2] = urlPath[2] === "public" ? "public_received" : urlPath[2] === "private" ? "private_received" : null;
    }
  }

  else if (urlPath[0] === "account") {
    urlPath[1] = urlPath[1] === "settings" ? "account-settings" : "manufacturer-information";
  }

  else if (urlPath[0] === "personal-store") {
    urlPath[1] =
      urlPath[1] === "manage-information" ?
        "store-information" :
        urlPath[1];
  }

  // if remove first item and url is: /dashboard => array is empty => That's why we add the dashboard to the array:
  if (!urlPath.length) {
    urlPath[0] = "dashboard"
  }

  const { t } = useTranslation();

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
          if (width < 993) {
            dashboardToggleDrawer();
          }
        }) // drawer close if width < 993
        .then(() => {
          spinnerDispatch(isLoadingAction(false));
        }); // hide spinner (spinner context)
    }
  }

  // submenu keys of first level
  const rootSubmenuKeys = ['dashboard', 'notifications' , 'account', 'personal-store', 'support', 'requests', 'products', 'business-promotion', 'affiliate', 'invoice'];

  const [openKeys, setOpenKeys] = useState(urlPath);

  useEffect(() => {
    setOpenKeys(urlPath);
  }, [pathname]);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const requestShowCondition = userType => {
    switch (userType) {
      case "V" :
        return(
          <>
            <SubMenu key="sent" title={ t('sent') }>
              <Item key="public_sent">
                <Link to="/dashboard/requests/sent/public" className="side--link">
                  { t('public') }
                </Link>
              </Item>
              <Item key="private_sent">
                <Link to="/dashboard/requests/sent/private" className="side--link">
                  { t('private') }
                </Link>
              </Item>
            </SubMenu>

            <SubMenu key="received" title={ t('received') }>
              <Item key="public_received">
                <Link to="/dashboard/requests/received/public" className="side--link">
                  { t('public') }
                </Link>
              </Item>
              <Item key="private_received">
                <Link to="/dashboard/requests/received/private" className="side--link">
                  { t('private') }
                </Link>
              </Item>
            </SubMenu>
          </>
        )

      case "C" :
        return (
          <SubMenu key="sent" title={ t('sent') }>
            <Item key="public_sent">
              <Link to="/dashboard/requests/sent/public" className="side--link">
                { t('public') }
              </Link>
            </Item>
            <Item key="private_sent">
              <Link to="/dashboard/requests/sent/private" className="side--link">
                { t('private') }
              </Link>
            </Item>
          </SubMenu>
        );
    }
  }

  return (
    <Row className="dashboard--side__container">
      <Col span={24} className="alaedeen--logo">
        <div className="logo">
          <Link to={"/"} className="d-block">
            <Row justify="center">
              <Col flex="26px" className="logo--character">
                <img src={alaedeenChar} alt=""/>
              </Col>
              <Col flex="1 1" className="pl-2">
                <Row className="h-100">
                  <Col span={24} className="my-auto logo--alaedeenCom">
                    <i className="logo-icon-alaedeen-com" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Link>
        </div>
      </Col>

      <Col span={24} className="dashboard--menu">
        {user_data?.load ?
          <div className="px-5 menuLoading">
            <Skeleton className="--avatar" active paragraph={{ rows: 0 }} avatar />
            <Skeleton className="--menu" active paragraph={{ rows: 11 }} title={false} />
          </div> :
          <Row gutter={[0, 20]}>
            <Col span={24} className="user--details">
              <Row gutter={10}>
                <Col flex="55px" className="--avatar">
                  { (user_data?.auth?.company_logo && user_data?.auth?.company_logo.length !== 0) ?
                    <ShowResponsiveImage
                      imagePath={ user_data?.auth?.company_logo?.logo_path }
                      imageFolder='company_logo'
                      width={45}
                      height={45}
                      skeletonWidth="45px"
                      skeletonHeight="45px"
                      skeletonRadius="45%"
                      skeletonSvgWidth="30px"
                      imageAlt={ user_data?.auth?.company ? user_data?.auth?.company : ` ${user_data?.auth?.firstname} ${user_data?.auth?.lastname} `}
                      object_id={user_data?.auth?.company_id}
                      object_type={`company_logo_${config.language}`}
                    /> :
                    <i className="fal fa-user display-3 text-70 d-block" />
                  }
                </Col>

                <Col flex="1 1" className="--details">
                  { user_data?.auth?.company || `${user_data?.auth?.firstname} ${user_data?.auth?.lastname}` }
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
                className="side--menu"
                onOpenChange={onOpenChange}
                openKeys={openKeys}
                defaultOpenKeys={openKeys}
                selectedKeys={openKeys}
              >
                <Menu.Item key="dashboard" icon={ <i className="fa-light fa-house" />}>
                  <Link to="/dashboard" className="side--link">
                    { t('dashboard') }
                  </Link>
                </Menu.Item>

                <SubMenu key="language" icon={<i className="fa-light fa-earth-asia" />} title={ t('language') }>
                  <Item onClick={() => handleChangeLanguage('fa')} key="1">فارسی</Item>
                  <Item onClick={() => handleChangeLanguage('en')} key="2">English</Item>
                  <Item onClick={() => handleChangeLanguage('ar')} key="3">عربی</Item>
                  <Item onClick={() => handleChangeLanguage('zh')} key="3">Chinese</Item>
                  <Item onClick={() => handleChangeLanguage('ru')} key="3">Russian</Item>
                </SubMenu>
  
                <Menu.Item key="notifications"  icon={<Badge count={0} offset={[0, -4]}><i className="fa-light fa-bullhorn" /></Badge> }>
                  <Link to="/dashboard/notifications" className="side--link">
                    { t('notifications') }
                  </Link>
                </Menu.Item>

                <SubMenu key="account" icon={<i className="fa-light fa-user-cog" />} title={ t('account') }>
                  <Item key="account-settings">
                    <Link to="/dashboard/account/settings" className="side--link">
                      { t('account_settings') }
                    </Link>
                  </Item>

                  {userType === "V" &&
                    <Item key="manufacturer-information">
                      <Link to="/dashboard/account/manufacturer-information" className="side--link">
                        { t('manufacturer_information') }
                      </Link>
                    </Item>
                  }
                </SubMenu>

                {isPersonalStore &&
                  <SubMenu key="personal-store" icon={<i className="fa-light fa-store" />} title={ t('personal_store') }>
                    <Item key="store-information">
                      <Link to="/dashboard/personal-store/manage-information" className="side--link">
                        { t('manage_information') }
                      </Link>
                    </Item>

                    <Item key="categories">
                      <Link to="/dashboard/personal-store/categories" className="side--link">
                        { t('manage_categories') }
                      </Link>
                    </Item>
                  </SubMenu>
                }

                <Menu.Item key="support" icon={ <i className="fa-light fa-user-headset" /> }>
                  <a href="https://alaedeen.com/horn/my-tickets/" className="side--link">
                    { t('support') }
                  </a>
                </Menu.Item>

                <SubMenu key="requests" icon={ <i className="fa-light fa-comment-quote" /> } title={ t('requests') }>

                  {requestShowCondition(userType)}

                </SubMenu>

                <Menu.Item key="products" icon={<i className="fa-brands fa-product-hunt" />}>
                  <Link to="/dashboard/products" className="side--link">
                    { t('products') }
                  </Link>
                </Menu.Item>

                <Menu.Item key="business-promotion"  icon={ <i className="fa-light fa-arrow-trend-up" /> }> {/* TODO: this is old icon <i className="fal fa-box-check" />*/}
                  <Link to="/dashboard/business-promotion" className="side--link">
                    { t('business_promotion') }
                  </Link>
                </Menu.Item>

                {planId === "14" &&
                  <Menu.Item key="affiliate"  icon={ <i className="fa-regular fa-users-medical" /> }>
                    <Link to="/dashboard/affiliate" className="side--link">
                      { t('affiliate') }
                    </Link>
                  </Menu.Item>
                }

                <Menu.Item key="invoices"  icon={ <i className="fa-light fa-file-invoice-dollar" /> }>
                  <Link to="/dashboard/invoices" className="side--link">
                    { t('invoices') }
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        }
      </Col>
    </Row>
  );
};

export default DashboardSidenav;
