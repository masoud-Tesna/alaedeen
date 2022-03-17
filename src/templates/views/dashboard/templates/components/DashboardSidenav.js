import React, { useEffect, useState } from "react";

import "./styles/DashboardSidenav.less";

import { Col, Menu, Row } from 'antd';

import { GlobalOutlined, HomeOutlined } from '@ant-design/icons';

// import alaedeen character:
import alaedeenChar from '../../../../assets/images/alaedeen-char.svg';

import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useConfigDispatch, useGetConfig, changeLanguageAction } from "../../../../../contexts/config/ConfigContext";
import { useWindowSize } from "../../../../../functions";
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

  const urlPath = pathname?.split("/").filter(Boolean);

  // remove first item of array (first item is "dashboard") :
  urlPath.shift();

  if (urlPath[0] === "requests") {
    if (urlPath[1] === "public") {
      urlPath[2] = urlPath[2] === "sent" ? "public_sent" : urlPath[2] === "received" ? "public_received" : null;
    }

    if (urlPath[1] === "private") {
      urlPath[2] = urlPath[2] === "sent" ? "private_sent" : urlPath[2] === "received" ? "private_received" : null;
    }
  }

  else if (urlPath[0] === "products") {
    urlPath[1] = "manageProducts";
  }

  else if (urlPath[0] === "categories") {
    urlPath[0] = "products";
    urlPath[1] = "manageCategories";
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

      const changeLanguageTimer = setTimeout(() => {
        // change language:
        configDispatch(changeLanguageAction(lang));

        if (width < 993) {
          dashboardToggleDrawer();
        }

        // hidden spinner (spinner context):
        spinnerDispatch(isLoadingAction(false));
      }, 1000);
      return () => clearTimeout(changeLanguageTimer);

    }
  }

  // submenu keys of first level
  const rootSubmenuKeys = ['dashboard', 'language', 'account', 'support', 'requests', 'products', 'plans', 'affiliate', 'invoice'];

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
            <SubMenu key="public" title={ t('public') }>
              <Item key="public_sent">
                <Link to="/dashboard/requests/public/sent" className="side--link">
                  { t('sent') }
                </Link>
              </Item>
              <Item key="public_received">
                <Link to="/dashboard/requests/public/received" className="side--link">
                  { t('received') }
                </Link>
              </Item>
            </SubMenu>

            <SubMenu key="private" title={ t('private') }>
              <Item key="private_sent">
                <Link to="/dashboard/requests/private/sent" className="side--link">
                  { t('sent') }
                </Link>
              </Item>
              <Item key="private_received">
                <Link to="/dashboard/requests/private/received" className="side--link">
                  { t('received') }
                </Link>
              </Item>
            </SubMenu>
          </>
        )

      case "C" :
        return (
          <>
            <Item key="public_sent">
              <Link to="/dashboard/requests/public/sent" className="side--link">
                { t('public') }
              </Link>
            </Item>

            <Item key="private_sent">
              <Link to="/dashboard/requests/private/sent" className="side--link">
                { t('private') }
              </Link>
            </Item>
          </>
        );
    }
  }

  return (
    <Row className="dashboard--side__container">
      <Col span={24} className="my-auto alaedeen--logo">
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
        <Row gutter={[0, 20]}>
          <Col span={24} className="user--details">
            <Row gutter={10}>
              <Col flex="55px" className="--avatar">
                { (user_data?.auth?.company_logo && user_data?.auth?.company_logo.length !== 0) ?
                  <ShowResponsiveImage
                    imagePath={ user_data?.auth?.company_logo?.logo_path }
                    imageFolder='company_logo'
                    width={55}
                    height={55}
                    skeletonWidth="55px"
                    skeletonHeight="55px"
                    skeletonRadius="55%"
                    skeletonSvgWidth="30px"
                    imageAlt={ user_data?.auth?.company ? user_data?.auth?.company : ` ${user_data?.auth?.firstname} ${user_data?.auth?.lastname} `}
                    object_id={user_data?.auth?.company_id}
                    object_type={`company_logo${config.language}`}
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
              <Menu.Item key="dashboard"  icon={<HomeOutlined />}>
                <Link to="/dashboard" className="side--link">
                  { t('dashboard') }
                </Link>
              </Menu.Item>

              <SubMenu key="language" icon={<GlobalOutlined />} title={ t('language') }>
                <Item onClick={() => handleChangeLanguage('fa')} key="1">فارسی</Item>
                <Item onClick={() => handleChangeLanguage('en')} key="2">English</Item>
                <Item onClick={() => handleChangeLanguage('ar')} key="3">عربی</Item>
              </SubMenu>

              <SubMenu key="account" icon={<i className="fal fa-user-cog " />} title={ t('account_settings') }>
                <Item key="manufacturer-information">
                  <Link to="/dashboard/account/manufacturer-information" className="side--link">
                    { t('manufacturer_information') }
                  </Link>
                </Item>
                {/*<Item key="password-reset">
              <Link to="/dashboard/account/password-reset" className="side--link">
                { t('password_reset') }
              </Link>
            </Item>*/}
              </SubMenu>

              <Menu.Item key="support" icon={ <i className="fal fa-user-headset" /> }>
                <a href="https://alaedeen.com/horn/my-tickets/" className="side--link">
                  { t('support') }
                </a>
              </Menu.Item>

              <SubMenu key="requests" icon={ <i className="fa-light fa-comment-quote" /> } title={ t('requests') }>

                {requestShowCondition(userType)}

              </SubMenu>

              <SubMenu key="products" icon={<i className="fab fa-product-hunt " />} title={ t('products_and_categories') }>
                <Item key="manageProducts">
                  <Link to="/dashboard/products/manage" className="side--link">
                    { t('manage_products') }
                  </Link>
                </Item>
                <Item key="manageCategories">
                  <Link to="/dashboard/categories/manage" className="side--link">
                    { t('manage_categories') }
                  </Link>
                </Item>
              </SubMenu>

              <Menu.Item key="plans"  icon={ <i className="fal fa-box-check" /> }>
                <Link to="/dashboard/plans" className="side--link">
                  { t('plans_and_pricing') }
                </Link>
              </Menu.Item>

              {planId === "14" &&
              <Menu.Item key="affiliate"  icon={ <i className="fa-regular fa-users-medical" /> }>
                <Link to="/dashboard/affiliate" className="side--link">
                  { t('affiliate') }
                </Link>
              </Menu.Item>
              }

              <Menu.Item key="invoices"  icon={ <i className="fal fa-file-invoice-dollar" /> }>
                <Link to="/dashboard/invoices" className="side--link">
                  { t('invoices') }
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DashboardSidenav;
