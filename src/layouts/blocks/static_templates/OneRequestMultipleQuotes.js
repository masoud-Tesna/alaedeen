import React from 'react';

// import style file:
import './styles/OneRequestMultipleQuotes.less';

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

// import ant design:
import { Col, Row, Form, Input, Button, Select, InputNumber} from "antd";

const { Option } = Select;

const OneRequestMultipleQuotes = () => {

  const { t } = useTranslation();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="px-4 border border-secondary-2 border-w-5 rounded-lg h-100 oneRequest--container">
      <Form
        className="h-100 oneRequest--formContent"
        name="nest-messages"
        onFinish={onFinish}>
        <Row className="h-100" align="middle">
          <Col span={24}>
            <div className="font-weight-bold vv-font-size-2-2 text-black oneRequest--formContent__caption">{ t(__('One Request Multiple Quotes')) }</div>
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
              <Input placeholder={ t(__('What are you looking for...')) } />
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
                  <InputNumber placeholder={ t(__('Quantity')) } min={1} />
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
                    placeholder={ t(__('Piece/Pieces')) }
                    allowClear
                  >
                    <Option value="piece1">Piece1</Option>
                    <Option value="piece2">Piece2</Option>
                    <Option value="piece3">Piece3</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className="text-center mt-2" span={24}>
            <Form.Item className="oneRequest--formContent__btn">
              <Button className="border border-secondary-2 rounded-3 bg-secondary-2 text-white vv-font-size-1 font-weight-500 p-0" size="large" htmlType="submit">
                { t(__('Request a Quote')) }
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export { OneRequestMultipleQuotes };