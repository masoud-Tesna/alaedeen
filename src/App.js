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
import {
  Home,
  Factories,
  SignIn,
  AllCategories,
  Categories,
  Register
} from "./components";

// import language context:
import { useGetLanguageState } from "./contexts/language/LanguageContext";

// Layouts:
import TopPanel from "./layouts/topPanel";
import { Header as SiteHeader } from "./layouts/header";
import { SiteFooter } from "./layouts/footer";

function App() {

  const { language } = useGetLanguageState();

  const directionTheme = language === 'en' ? 'ltr' : 'rtl';

  const { Footer, Content } = Layout;

  return (
    <ConfigProvider direction={ directionTheme }>
      <Layout className="layout">
        <Router>
          <TopPanel />

          <SiteHeader />
          <Content>
            <div className="site-layout-content" id="siteLayoutContent">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/register" component={Register} />
                <Route path="/factories" component={Factories} />
                <Route exact path="/categories" component={AllCategories} />
                <Route path="/categories/:category" component={Categories} />
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
