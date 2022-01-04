import { useState, createContext } from "react";

import "./styles/DashboardMain.less";

import { Col, Drawer, Layout, Row } from 'antd';

import { useGetConfig } from "../../../../contexts/config/ConfigContext";

import DashboardSidenav from "./components/DashboardSidenav";
import { Content } from "antd/es/layout/layout";
import { useParsPathName } from "../../../../functions/Helper";

export const DashboardDrawerContext = createContext();

const DashboardMain = ({ children }) => {

  const { Sider } = Layout;

  // get initial config:
  const { config } = useGetConfig();

  const [DrawerVisible, setDrawerVisible] = useState(false);

  const dashboardToggleDrawer = () => setDrawerVisible(prev => !prev);

  // Get Location:
  const pathName = useParsPathName();

  if (pathName === 'dashboard') {
    return (
      <Row>
        <Col className="d-none d-lg-block side--section">
          <Drawer
            title={ false }
            placement={ config.language === 'en' ? 'left' : 'right' }
            closable={ false }
            onClose={ () => setDrawerVisible(false) }
            visible={ DrawerVisible }
            key={ config.language === 'en' ? 'left' : 'right' }
            width={ 250 }
            className="d-lg-none dashboard--drawer"
          >
            <Sider
              width={ 250 }
              style={ {
                height: '100vh',
              } }
              className="dashboard--side__xs"
              theme="light"
            >
              <DashboardSidenav dashboardToggleDrawer={ dashboardToggleDrawer }/>
            </Sider>
          </Drawer>

          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            className="dashboard--side__lg"
            theme="light"
          >
            <DashboardSidenav/>
          </Sider>
        </Col>

        <Col className="content--section">
          <Content>
            <DashboardDrawerContext.Provider value={ dashboardToggleDrawer }>
              { children }
            </DashboardDrawerContext.Provider>
          </Content>
        </Col>
      </Row>
    );
  }

  return (
    <>
      { children }
    </>
  );
};

export default DashboardMain;
