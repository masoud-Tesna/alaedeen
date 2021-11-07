import { Suspense, lazy } from 'react';

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

import "@babel/polyfill";
import { appendQueryParameter } from "./functions/Helper";
import { Helmet } from "react-helmet";
import LoadSpinner from "./layouts/blocks/static_templates/LoadSpinner";

// Pages:
const Home = lazy(() => import('./components/Home'));
const Factories = lazy(() => import('./components/Factories'));
const SignIn = lazy(() => import('./components/SignIn'));
const AllCategories = lazy(() => import('./components/AllCategories'));
const Categories = lazy(() => import('./components/Categories'));
const Register = lazy(() => import('./components/Register'));
const Product = lazy(() => import('./components/Product'));
const RecommendedS = lazy(() => import('./components/RecommendedS'));


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
        { languageLinks?.map(languageLink => {
          return(
            <link
              title = { languageLink.title }
              dir = { languageLink.dir }
              type = "text/html"
              rel = "alternate"
              hrefLang = { languageLink.hrefLang }
              href = { languageLink.href }
            />
          )
        }) }

      </Helmet>

      <Layout className="layout">
        <Router>
          <TopPanel />

          <SiteHeader />
          <Content>
            <div className="site-layout-content" id="siteLayoutContent">
              <Suspense fallback={<LoadSpinner />}>
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
                  <Route path="/recommendedS" component={RecommendedS} />
                </Switch>
              </Suspense>
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
