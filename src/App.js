import 'antd/dist/antd.less';
import './styles/custom.css';
import { ConfigProvider , Row, Col } from 'antd';

import enUS from 'antd/lib/locale/en_US';
import faIR from 'antd/lib/locale/fa_IR';

import { Layout } from 'antd';

function App() {

  const { Header, Footer, Content } = Layout;

  return (
      <Layout>
        <Header>Header</Header>
        <Content className="px-2">
          <Layout>
            <Row>
              <Col xs={24}>col</Col>
            </Row>
            <Row>
              <Col xs={24} sm={12}>col-12</Col>
              <Col xs={24} sm={12}>col-12</Col>
            </Row>
            <Row>
              <Col xs={24} sm={12}>col-8</Col>
              <Col xs={24} sm={12}>col-8</Col>
              <Col xs={24} sm={12}>col-8</Col>
              <Col xs={24} sm={12}>col-8</Col>
            </Row>
          </Layout>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
  );
}

export default App;
