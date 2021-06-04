// Custom Styles:
import './styles/custom.less';

//import Style File:
import './styles/App.less';

// flag icons:
import 'flag-icon-css/less/flag-icon.less';

// Components:
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Design:
import { ConfigProvider, Layout } from 'antd';

// Pages:
import { Home, Factories } from "./components";

// import language context:
import { useGetLanguageState } from "./contexts/language/LanguageContext";

// Layouts:
import TopPanel from "./layouts/topPanel";
import { Header as SiteHeader } from "./layouts/header";
import { SiteFooter } from "./layouts/footer";
import React from "react";

function App() {

  const { language } = useGetLanguageState();

  const directionTheme = language === 'en' ? 'ltr' : 'rtl';

  const { Header, Footer, Content } = Layout;

  return (
    <ConfigProvider direction={ directionTheme }>
      <Layout className="layout">
        <Router>
          <TopPanel />
          <Header className="site--header">
            <SiteHeader />
          </Header>
          <Content>
            <div className="site-layout-content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/factories" component={Factories} />
              </Switch>
            </div>
          </Content>
          <Footer>
           <SiteFooter />
          </Footer>
        </Router>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
