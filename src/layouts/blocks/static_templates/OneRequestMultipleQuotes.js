import React from 'react';

// import style file:
import './styles/OneRequestMultipleQuotes.less';

// import ant design:
import { Col, Row,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch } from "antd";
const { Option } = Select;

const OneRequestMultipleQuotes = () => {

  const [form] = Form.useForm();

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="px-4 py-1 border border-secondary-2 border-w-5 rounded-lg h-100 oneRequest--container">
      <Form
        className="h-100 oneRequest--formContent"
        name="nest-messages"
        onFinish={onFinish}>
        <Row className="h-100" align="middle">
          <Col span={24}>
            <div className="font-weight-600 vv-font-size-1-6 text-black oneRequest--caption">One Request Multiple Quotes</div>
          </Col>
          <Col className="mt-2" span={24}>
            <Form.Item
              name="search"
              className="oneRequest--formContent__searchInput"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input placeholder="What are you looking for... " />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  className="oneRequest--formContent__quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                    },
                  ]}>
                  <InputNumber placeholder="Quantity" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  className="oneRequest--formContent__piece"
                  name="Piece"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Piece/Pieces"
                    onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="Piece1">Piece1</Option>
                    <Option value="Piece2">Piece2</Option>
                    <Option value="Piece3">Piece3</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className="text-center" span={24}>
            <Form.Item className="oneRequest--formContent__btn">
              <Button className="border border-secondary-2 rounded-3 bg-secondary-2 text-white vv-font-size-1 font-weight-500 px-5" size="large" htmlType="submit">
                Request a Quote
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export { OneRequestMultipleQuotes };