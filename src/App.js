// Custom Styles:
import './styles/custom.less';

//import Style File:
import './styles/App.less';

// flag icons:
import 'flag-icon-css/less/flag-icon.less';

// Components:
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Design:
import { ConfigProvider, Layout } from 'antd';

// import Config context:
import { useGetConfig } from "./contexts/config/ConfigContext";

// Templates:
import TopPanel from "./templates/topPanel";
import { Header as SiteHeader } from "./templates/header";
import { SiteFooter } from "./templates/footer";

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
import ReadyToShip from "./components/ReadyToShip";

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
    {title: "العربية", dir: 'rtl', hrefLang: 'ar', href: appendQueryParameter("lang_code", "ar")},
    {title: "فارسی", dir: 'rtl', hrefLang: 'fa', href: appendQueryParameter("lang_code", "fa")},
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
              <Routes>
                {/* Home Route */}
                <Route exact path="/" element={<Home />} />

                {/* Sign in Route */}
                <Route path="/sign-in" element={<SignIn />} />

                {/* Register Route */}
                <Route path="/register" element={<Register />} />

                {/* Factories Route */}
                <Route path="/factories" element={<Factories />} />

                {/* All Categories Route */}
                <Route path="/all-categories" element={<AllCategories />} />

                {/* if open categories page without category path, redirect to all-category route */}
                <Route exact path="/categories" element={<Navigate to="/all-categories" />} />

                {/* categories Route (categories/electronic) */}
                <Route path="/categories/:category" element={<Categories />} />

                {/* if open product details page without product path, redirect to all-category route */}
                <Route exact path="/product" element={<Navigate to="/all-categories" />} />

                {/* Product details Route */}
                <Route path="/product/:product" element={<Product />} />

                {/* Recommended details Route */}
                <Route path="/recommended" element={<Recommended />} />

                {/* Ready To Ship details Route */}
                <Route path="/ready-to-ship" element={<ReadyToShip />} />
              </Routes>
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
