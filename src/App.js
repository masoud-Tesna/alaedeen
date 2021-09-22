// Custom Styles:
import './styles/custom.less';

//import Style File:
import './styles/App.less';

// flag icons:
import 'flag-icon-css/less/flag-icon.less';

// Components:
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// Design:
import { ConfigProvider, Layout } from 'antd';

// Pages:
import {
  Home,
  Factories,
  SignIn,
  AllCategories,
  Categories,
  Register,
  Product
} from "./components";

// import Config context:
import { useGetConfig } from "./contexts/config/ConfigContext";

// Layouts:
import TopPanel from "./layouts/topPanel";
import { Header as SiteHeader } from "./layouts/header";
import { SiteFooter } from "./layouts/footer";


function App() {

  const { config } = useGetConfig();

  const directionTheme = config.language === 'en' ? 'ltr' : 'rtl';

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
                {/*Home Route*/}
                <Route exact path="/" component={Home} />
                {/*Sign in Route*/}
                <Route path="/sign-in" component={SignIn} />
                {/*Register Route*/}
                <Route path="/register" component={Register} />
                {/*Factories Route*/}
                <Route path="/factories" component={Factories} />
                {/*All Categories Route*/}
                <Route path="/all-categories" component={AllCategories} />
                {/*if open categories page without category path, redirect to all-category route*/}
                <Route exact path="/categories" render={() => <Redirect to="/all-categories" />} />
                {/*categories Route (categories/electronic)*/}
                <Route path="/categories/:category" component={Categories} />
                {/*if open product details page without product path, redirect to all-category route*/}
                <Route exact path="/product" render={() => <Redirect to="/all-categories" />} />
                {/*Product details Route*/}
                <Route path="/product/:product" component={Product} />
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
