import 'antd/dist/antd.css';
import './styles/custom.css';
import {ConfigProvider, Row, Col, Space, Button} from 'antd';

import { Layout } from 'antd';

function App() {

  const { Header, Footer, Content } = Layout;

  return (
      <Layout>
        <Header>Header</Header>
        <Content className="px-2">
          <Layout>
            <Row>
              <Col xs={24}><Button type="primary">Primary Button</Button></Col>
            </Row>
            <Row>
              <Col xs={24} sm={12}><div className="space-align-container">
                <div className="space-align-block">
                  <Space align="center">
                    center
                    <Button type="primary">Primary</Button>
                    <span className="mock-block">Block</span>
                  </Space>
                </div>
                <div className="space-align-block">
                  <Space align="start">
                    start
                    <Button type="primary">Primary</Button>
                    <span className="mock-block">Block</span>
                  </Space>
                </div>
                <div className="space-align-block">
                  <Space align="end">
                    end
                    <Button type="primary">Primary</Button>
                    <span className="mock-block">Block</span>
                  </Space>
                </div>
                <div className="space-align-block">
                  <Space align="baseline">
                    baseline
                    <Button type="primary">Primary</Button>
                    <span className="mock-block">Block</span>
                  </Space>
                </div>
              </div></Col>
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
