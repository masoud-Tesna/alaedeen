// Custom Styles:
import './templates/styles/custom.less';

//import Style File:
import './templates/styles/App.less';

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
import { asyncComponent } from "./functions/Helper";

// Pages:
/*import Home from "./templates/views/Home";
import SignIn from "./templates/views/SignIn";
import Register from "./templates/views/Register";
import Factories from "./templates/views/Factories";
import AllCategories from "./templates/views/AllCategories";
import Categories from "./templates/views/Categories";
import Product from "./templates/views/Product";
import Recommended from "./templates/views/Recommended";
import ReadyToShip from "./templates/views/ReadyToShip";*/

import "@babel/polyfill";

const Home = asyncComponent(() =>
  import('./templates/views/Home').then(module => module.default)
);

const SignIn = asyncComponent(() =>
  import('./templates/views/SignIn').then(module => module.default)
);

const Register = asyncComponent(() =>
  import('./templates/views/Register').then(module => module.default)
);

const Factories = asyncComponent(() =>
  import('./templates/views/Factories').then(module => module.default)
);

const AllCategories = asyncComponent(() =>
  import('./templates/views/AllCategories').then(module => module.default)
);

const Categories = asyncComponent(() =>
  import('./templates/views/Categories').then(module => module.default)
);

const Product = asyncComponent(() =>
  import('./templates/views/Product').then(module => module.default)
);

const Recommended = asyncComponent(() =>
  import('./templates/views/Recommended').then(module => module.default)
);

const ReadyToShip = asyncComponent(() =>
  import('./templates/views/ReadyToShip').then(module => module.default)
);

function App() {

  // get initial config:
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
