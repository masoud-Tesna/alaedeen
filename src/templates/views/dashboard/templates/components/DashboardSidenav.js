import { useState } from "react";

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

  // example: dashboard or dashboard/account/reset-password
  const page = pathname.replace("/", "");

  // example: account
  let mainPage = page.replace("dashboard", "").replace("/", "").split("/")[0];

  // example: reset-password
  let subPage = page.replace("dashboard", "").replace("/", "").split("/")[1];

  if (mainPage === 'products') { // if main page is "products/" subPage = "manageProducts"
    subPage = "manageProducts";
  }
  else if (mainPage === 'categories') { // if main page is "categories/" subPage = "manageCategories"
    subPage = "manageCategories";
  }

  if (mainPage === 'categories') { // if main page is "categories/" mainPage = "products"
    mainPage = "products";
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
  const rootSubmenuKeys = ['dashboard', 'language', 'account', 'products', 'plans'];

  const [openKeys, setOpenKeys] = useState([mainPage]);

  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Row gutter={[0, 20]} className="dashboard-side__container">
      <Col span={24} className="my-auto alaedeen-logo">
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

      <Col span={24}>
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          className="side--menu"
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          defaultSelectedKeys={[(page === 'dashboard' || page === 'dashboard/') ? 'dashboard' : subPage || mainPage]} /* if sub page isset (/product/manage) else main page (/plans) */
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
            <Item key="password-reset">
              <Link to="/dashboard/account/password-reset" className="side--link">
                { t('password_reset') }
              </Link>
            </Item>
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
        </Menu>
      </Col>
    </Row>
  );
};

export default DashboardSidenav;
