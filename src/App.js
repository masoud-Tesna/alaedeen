// Styles:
import './styles/custom.less';

// Components:
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Design:
import { Layout, Menu, Breadcrumb } from 'antd';

// Pages:
import { Home } from "./pages";

// Layouts:
import TopPanel from "./layouts/topPanel";
import { Header as SiteHeader } from "./layouts/header";

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
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Router>
    </Layout>
  );
}

export default App;
