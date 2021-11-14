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

// import Config context:
import { useGetConfig } from "./contexts/config/ConfigContext";

// Layouts:
import TopPanel from "./layouts/topPanel";
import { Header as SiteHeader } from "./layouts/header";
import { SiteFooter } from "./layouts/footer";

import { appendQueryParameter } from "./functions/Helper";
import { Helmet } from "react-helmet";

// Pages:
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Factories from "./components/Factories";
import AllCategories from "./components/AllCategories";
import Categories from "./components/Categories";
import Product from "./components/Product";
import Recommended from "./components/Recommended";

import "@babel/polyfill";

function App() {

  // get initial config:
  const { config } = useGetConfig();

  const directionTheme = config.language === 'en' ? 'ltr' : 'rtl';

  const { Footer, Content } = Layout;


  // object for languages link tag:
  const languageLinks = [
    {title: "English", dir: 'ltr', hrefLang: 'x-default', href: window.location.href},
    {title: "English", dir: 'ltr', hrefLang: 'en', href: appendQueryParameter("lang_code", "en")},
    {title: "العربية", dir: 'rtl', hrefLang: 'ar-IQ', href: appendQueryParameter("lang_code", "ar")},
    {title: "فارسی", dir: 'rtl', hrefLang: 'fa-IR', href: appendQueryParameter("lang_code", "fa")},
  ];

  return (
    <ConfigProvider direction={ directionTheme }>

      <Helmet>
        { languageLinks?.map((languageLink, i) => {
          return(
            <link
              key={`langTag_${i}`}
              title = { languageLink.title }
              dir = { languageLink.dir }
              type = "text/html"
              rel = "alternate"
              hrefLang = { languageLink.hrefLang }
              href = { languageLink.href }
            />
          )
        }) }
        <html lang={ config.language } />
      </Helmet>

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
                {/*RecommendedS details Route*/}
                <Route path="/recommended" component={Recommended} />
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
