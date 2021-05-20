// Custom Styles:
import './styles/custom.less';

//import Style File:
import './styles/App.less';

// flag icons:
import 'flag-icon-css/less/flag-icon.less';

// Components:
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Design:
import { Layout } from 'antd';

// Pages:
import { Home, Factories } from "./components";

// Layouts:
import TopPanel from "./layouts/topPanel";
import { Header as SiteHeader } from "./layouts/header";
import { SiteFooter } from "./layouts/footer";

function App() {

  const { Header, Footer, Content } = Layout;

  return (
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
              <Route path="/home" component={Home} />
              <Route path="/factories" component={Factories} />
            </Switch>
          </div>
        </Content>
        <Footer>
         <SiteFooter />
        </Footer>
      </Router>
    </Layout>
  );
}

export default App;
