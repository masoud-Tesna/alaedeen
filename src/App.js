import './styles/custom.less';
import {ConfigProvider, Row, Col, Space, Button} from 'antd';
import Icon, {FastBackwardOutlined, LeftCircleTwoTone, MessageOutlined, SearchOutlined} from '@ant-design/icons';

import { Layout } from 'antd';

function App() {

  const { Header, Footer, Content } = Layout;

  return (
      <Layout>
        <Header>Header</Header>
        <Content className="px-2">
          <Layout>
            <Row className="px-4" gutter={[16, 16]}>
              <Col xs={24} className="primary"><Button type="primary" icon={<LeftCircleTwoTone spin={true} twoToneColor="#eb2f96" />} shape="circle" size="large" /></Col>

              <Col xs={24} className="mt-5">
                <MessageOutlined style={{ fontSize: '16px', color: '#08c' }} />
                <br />
                <Icon type="message" style={{ fontSize: '16px', color: '#08c' }} theme="outlined" />
              </Col>
            </Row>
          </Layout>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
  );
}

export default App;
