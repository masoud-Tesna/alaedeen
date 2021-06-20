import { useState } from "react";

// import style file:
import './styles/OneRequestMultipleQuotes.less';

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

import { useGetApi } from '../../../functions';

// import ant design:
import { Col, Row, Form, Input, Button, Select, InputNumber, Modal, Checkbox, Radio, Result, Spin } from "antd";

import axios from "axios";

const { Option } = Select;

const OneRequestMultipleQuotesModal = ({ isRequestModalVisible, setIsRequestModalVisible, productNameBefore, quantityBefore, pieceBefore }) => {

  const { t } = useTranslation();

  const quantity_units = useGetApi('request-content-api', 'variant=quantity_units', 'request_contents', false);

  const country_lists = useGetApi('country-lists-api', '', 'country_lists', false);

  const order_values = useGetApi('request-content-api', 'variant=order_values', 'request_contents', false);

  const supp_locations = useGetApi('request-content-api', 'variant=supp_locations', 'request_contents', false);

  const regular_types = useGetApi('request-content-api', 'variant=regular_types', 'request_contents', false);

  const requirement_urgencies = useGetApi('request-content-api', 'variant=requirement_urgencies', 'request_contents', false);

  const country_code = useGetApi('country-code-api', '', 'country_code', false, false);



  const [isSpinSend, setIsSpinSend] = useState(false);

  const [firstFormContent, setFirstFormContent] = useState('d-block');
  const [lastFormContent, setLastFormContent] = useState('d-none');

  const [successFormContent, setSuccessFormContent] = useState('d-none');

  const [trackingCode, setTrackingCode] = useState();

  const [countryCode, setCountryCode] = useState('IR');

  const [isRegularType, setIsRegularType] = useState(false);

  const cityLists = useGetApi('city-lists-api', `country_code=${countryCode}`, 'city_lists', false);

  async function getRequestCheck() {
    return await axios.get("https://hornb2b.com/horn/request-check-api/?table=?:vv_products_request&column=request_check");
  }

  const handleClosRequestModal = () => {
    setIsRequestModalVisible(false);
    setTrackingCode('');
    setFirstFormContent('d-block');
    setLastFormContent('d-none');
    setSuccessFormContent('d-none');

  };

  const onFinish = (values) => {
    setIsSpinSend(true);
    getRequestCheck()
      .then(res => {
        values.request_check = res.data.request_check;
      })
      .then(() => {
        axios.post(`https://hornb2b.com/horn/send-request-api`, { values })
          .then(res => {
            setTrackingCode(res.data.tracking_code);
            setIsSpinSend(false);
            setLastFormContent('d-none');
            setSuccessFormContent('d-block');
          });
      });
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

  const regularShow = e => {
    const val = e.target.value;
    if (val === 'one_time') {
      setIsRegularType(false);
    } else if (val === 'regular') {
      setIsRegularType(true);
    }
  }

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
                  <li>{ t(__('Submit RFQ')) }</li>
                  <li>{ t(__('Compare Quotes')) }</li>
                  <li>{ t(__('Contact Supplier')) }</li>
                </ul>
              </Col>
            </Row>
          </Col>


          <Col span={14} className="bg-f6 oneRequest--formContent__right">
            <Spin spinning={isSpinSend} tip={ `${ t(__('send_request')) }...` }>
              <div>

                <div className={`requestFirstFormContent ${firstFormContent}`}>


                  <Row className="h-100" align="middle" gutter={[0, 16]}>

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
                            className="oneRequest--formContent__quantity request--email__container"
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
                            className="oneRequest--formContent__quantity request--phone__container"
                            name="phone_number"
                            label={ t(__('Mobile No.')) }
                            labelCol={{ span: 24 }}
                            /*rules={[
                              {
                                required: true,
                              },
                            ]}*/
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
                            /*rules={[
                              {
                                required: true,
                              },
                            ]}*/>
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
                            className="oneRequest--formContent__piece"
                            name="auth_country"
                            label={ t(__('country')) }
                            labelCol={{ span: 24 }}
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Select
                              placeholder={ t(__('country')) }
                              allowClear
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={e => setCountryCode(e)}
                            >
                              <>
                                {country_lists.items.map((item) => {
                                  return (
                                    <Option key={item.code} value={item.code} >{ item.country }</Option>
                                  );
                                })}
                              </>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            className="oneRequest--formContent__piece"
                            name="auth_city"
                            label={ t(__('city')) }
                            labelCol={{ span: 24 }}
                            /*rules={[
                              {
                                required: true,
                              },
                            ]}*/
                          >
                            <Select
                              placeholder={ t(__('city')) }
                              allowClear
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              <>
                                {cityLists.items.map((item) => {
                                  return (
                                    <Option key={item.code} value={item.code} >{ item.state }</Option>
                                  );
                                })}
                              </>
                            </Select>
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
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                                {quantity_units.items.map((item) => {
                                  return (
                                    <Option value={item.key} >{ item.value }</Option>
                                  );
                                })}
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
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
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
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
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
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
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
                            <Radio.Group onChange={regularShow}>
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
                                required: isRegularType,
                              },
                            ]}
                          >
                            <Select
                              placeholder={ t(__('regular_type')) }
                              allowClear
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                              disabled={isRegularType ? false : true}
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

                    <Col className="align-self-end" span={24}>
                      <Form.Item
                        className="oneRequest--formContent__terms"
                        name="terms"
                        valuePropName="checked"
                        rules={[
                          /*{
                            validator: (_, value) =>
                              value ? Promise.resolve() : Promise.reject(new Error( t(__('Should accept terms')) )),
                          },*/
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

                </div>

                <div className={`requestSuccessFormContent ${successFormContent}`}>
                  <Result
                    className="requestSendSuccess--container"
                    status="success"
                    title={ t(__('send request success message')) }
                    subTitle={ ` ${ t(__('your request tracking code')) } : HORN-${ trackingCode } ` }
                    extra={[
                      <Button className="closeRequestModalBtn" key="close_modal" onClick={handleClosRequestModal}>{ t(__('close')) }</Button>,
                    ]}
                  />
                </div>

                <div className="steps-action mt-4 text-center">
                  {lastFormContent === 'd-none' && firstFormContent === 'd-block' && (
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

              </div>
            </Spin>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default OneRequestMultipleQuotesModal;