import { useState } from "react";

// import style file:
import './styles/OneRequestMultipleQuotes.less';

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

import { useGetApi } from '../../../functions';

// import ant design:
import { Col, Row, Form, Input, Button, Select, InputNumber, Modal, Checkbox, Radio } from "antd";

import axios from "axios";

const { Option } = Select;

const OneRequestMultipleQuotesModal = ({ isRequestModalVisible, handleClosRequestModal, productNameBefore, quantityBefore, pieceBefore }) => {

  const { t } = useTranslation();

  const request_check = useGetApi('request-check-api', 'table=?:vv_products_request&column=request_check', 'request_check', false, false);

  const quantity_units = useGetApi('request-content-api', 'variant=quantity_units', 'request_contents', false);

  const order_values = useGetApi('request-content-api', 'variant=order_values', 'request_contents', false);

  const supp_locations = useGetApi('request-content-api', 'variant=supp_locations', 'request_contents', false);

  const regular_types = useGetApi('request-content-api', 'variant=regular_types', 'request_contents', false);

  const requirement_urgencies = useGetApi('request-content-api', 'variant=requirement_urgencies', 'request_contents', false);

  const country_code = useGetApi('country-code-api', '', 'country_code', false, false);


  const [firstFormContent, setFirstFormContent] = useState('d-block');
  const [lastFormContent, setLastFormContent] = useState('d-none');



  const onFinish = (values) => {
    axios.post(`https://hornb2b.com/horn/send-request-api`, { values });
  };

  const phoneCodeShow = (<Form.Item name="phone_code" noStyle>
    <Select
      dropdownClassName="phoneCodeSelect"
      dropdownStyle = {{
        width: 200
      }}
      showSearch
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      style={{
        width: 70,
      }}
    >
      <>
        {country_code.items.map((item, index) => {
          return (
            <Option key={index + 20} value={item.code_number} >{ `${item.description} ${item.code_number}` }</Option>
          );
        })}
      </>
    </Select>
  </Form.Item>);

  return (
    <Modal
      title={ t(__('Post Your buy Requirement')) }
      visible={isRequestModalVisible}
      onCancel={handleClosRequestModal}
      destroyOnClose={true}
      footer={null}
      className="RequestModal"
    >
      <Form
        className="h-100 oneRequest--formContent"
        name="request-form"
        initialValues={{
          request_check: request_check.items,
          product_name: productNameBefore || undefined,
          quantity: quantityBefore || undefined,
          quantity_unit: pieceBefore || undefined,
        }}
        onFinish={onFinish}
      >
        <Row>
          <Col span={10} className="oneRequest--formContent__left">
            <Row className="h-100 oneRequest--left__description">
              <Col span={24} className="align-self-start text-center text-white vv-font-size-2">
                { t(__('How to Get Quotation Quickly?')) }
              </Col>
              <Col span={24} className="align-self-end text-center oneRequest--description__features">
                <ul>
                  <li>Submit RFQ</li>
                  <li>Compare Quotes</li>
                  <li>Contact Supplier</li>
                </ul>
              </Col>
            </Row>
          </Col>

          <Col span={14} className="bg-f6 oneRequest--formContent__right">
            <div className={`requestFirstFormContent ${firstFormContent}`}>


              <Row className="h-100" align="middle" gutter={[0, 16]}>

                <Col className="d-none" span={24}>
                  <Form.Item
                    name="request_check"
                    className="d-none"
                  >
                    <Input className="d-none" />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="product_name"
                    className="oneRequest--formContent__searchInput"
                    label={ t(__('product name')) }
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                      },
                    ]}>
                    <Input
                      placeholder={ t(__('What are you looking for...')) }
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="description"
                    className="oneRequest--formContent__searchInput"
                    label={ t(__('Describe your buy requirement')) }
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        min: 20,
                      },
                    ]}>
                    <Input.TextArea
                      placeholder={ t(__('Describe your buy requirement')) }
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__quantity"
                        name="auth_email"
                        label={ t(__('email')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                            type: 'email',
                          },
                        ]}>
                        <Input
                          placeholder={ t(__('Enter Your email')) }
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__quantity"
                        name="phone_number"
                        label={ t(__('Mobile No.')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          addonBefore={phoneCodeShow}
                          placeholder={ t(__('Enter your mobile number')) }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__quantity"
                        name="auth_name"
                        label={ t(__('Your name')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}>
                        <Input
                          placeholder={ t(__('Enter Your Name')) }
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__quantity"
                        name="auth_company"
                        label={ t(__('Company name')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}>
                        <Input
                          placeholder={ t(__('Enter Your Company name')) }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__quantity"
                        name="auth_city"
                        label={ t(__('city')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}>
                        <Input
                          placeholder={ t(__('Enter Your city')) }
                        />
                      </Form.Item>
                    </Col>

                    <Col className="align-self-end" span={12}>
                      <Form.Item
                        className="oneRequest--formContent__terms"
                        name="terms"
                        valuePropName="checked"
                        rules={[
                          {
                            validator: (_, value) =>
                              value ? Promise.resolve() : Promise.reject(new Error( t(__('Should accept terms')) )),
                          },
                        ]}
                      >
                        <Checkbox
                          value="yes"
                        >
                          { t(__('I Agree to Terms and Conditions')) }
                        </Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>


            </div>

            <div className={`requestLastFormContent ${lastFormContent}`}>


              <Row className="h-100" align="middle" gutter={[0, 16]}>
                <Col span={24} className="text-center vv-font-size-1-5" style={{ color: '#2c8839' }}>
                  { t(__(' Tell us little more about your requirement ')) }
                </Col>

                <Col span={24}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__quantity"
                        name="quantity"
                        label={ t(__('quantity')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}>
                        <InputNumber
                          placeholder={ t(__('Quantity')) }
                          min={1}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__piece"
                        name="quantity_unit"
                        label={ t(__('piece')) }
                        labelCol={{ span: 24 }}
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
                          <>
                            {quantity_units.items.map((item) => {
                              return (
                                <Option key={item.key} value={item.key} >{ item.value }</Option>
                              );
                            })}
                          </>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__currency"
                        name="currency"
                        label={ t(__('Approximate order value')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Radio.Group>
                          <Radio
                            value="rial"
                          >{ t(__('Iranian Rial')) }</Radio>
                          <Radio
                            value="dollar"
                          >{ t(__('US Dollar')) }</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__piece"
                        name="order_value"
                        label={ t(__('order_values')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          placeholder={ t(__('order_values')) }
                          allowClear
                        >
                          <>
                            {order_values.items.map((item, index) => {
                              return (
                                <Option key={index * 20} value={item.key} >{ item.name }</Option>
                              );
                            })}
                          </>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__piece"
                        name="supp_location"
                        label={ t(__('supp_locations')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          placeholder={ t(__('supp_locations')) }
                          allowClear
                        >
                          <>
                            {supp_locations.items.map((item, index) => {
                              return (
                                <Option key={index * 20} value={item.key} >{ item.value }</Option>
                              );
                            })}
                          </>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__piece"
                        name="requirement_urgency"
                        label={ t(__('requirement_urgency')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          placeholder={ t(__('requirement_urgency')) }
                          allowClear
                        >
                          <>
                            {requirement_urgencies.items.map((item, index) => {
                              return (
                                <Option key={index * 20} value={item.key} >{ item.value }</Option>
                              );
                            })}
                          </>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__currency"
                        name="requirement_frequency"
                        label={ t(__('Requirement frequency')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Radio.Group>
                          <Radio
                            value="one_time"
                          >{ t(__('one_time')) }</Radio>
                          <Radio
                            value="regular"
                          >{ t(__('Regular')) }</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        className="oneRequest--formContent__piece"
                        name="regular_type"
                        label={ t(__('regular_type')) }
                        labelCol={{ span: 24 }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          placeholder={ t(__('regular_type')) }
                          allowClear
                        >
                          <>
                            {regular_types.items.map((item, index) => {
                              return (
                                <Option key={index * 25} value={item.key} >{ item.value }</Option>
                              );
                            })}
                          </>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col className="text-center mt-2 d-none" span={24}>
                  <Form.Item className="oneRequest--formContent__btn">
                    <Button className="border border-secondary-2 rounded-3 bg-secondary-2 text-white vv-font-size-1 font-weight-500 p-0" size="large" htmlType="submit">
                      { t(__('Request a Quote')) }
                    </Button>
                  </Form.Item>
                </Col>
              </Row>


            </div>

            <div className="steps-action mt-4 text-center">
              {lastFormContent === 'd-none' && (
                <Button
                  className="oneRequest--formContent__nextBtn"
                  onClick={() => {
                  setLastFormContent('d-block');
                  setFirstFormContent('d-none');
                }}>
                  { t(__('Next')) }
                </Button>
              )}

              {lastFormContent === 'd-block' && (
                <Button
                  style={{ margin: '0 8px' }}
                  className="oneRequest--formContent__previousBtn"
                  onClick={() => {
                    setLastFormContent('d-none');
                    setFirstFormContent('d-block');
                  }}>
                  { t(__('Previous')) }
                </Button>
              )}

              {lastFormContent === 'd-block' && (
                <Button className="oneRequest--formContent__doneBtn" htmlType="submit">
                  { t(__('submit')) }
                </Button>
              )}

            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default OneRequestMultipleQuotesModal;