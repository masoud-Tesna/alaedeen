// Styles:
import './styles/custom.less';

// Components:
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Design:
import { Layout, Menu, Breadcrumb } from 'antd';

// Pages:
import { Home } from "./pages";

function App() {

  const { Header, Footer, Content } = Layout;

  return (
    <Layout className="layout">
      <Router>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
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
