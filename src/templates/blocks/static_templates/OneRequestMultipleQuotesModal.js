import { useState } from "react";

// import style file:
import './styles/OneRequestMultipleQuotes.less';

// import helper functions:
import { __ } from '../../../functions/Helper';

import { useTranslation } from "react-i18next";

import { useGetApi, useWindowSize } from '../../../functions';

// import ant design:
import { Col, Row, Form, Input, Button, Select, InputNumber, Modal, Checkbox, Radio, Result, Spin } from "antd";

import axios from "axios";
import { useGetConfig } from "../../../contexts/config/ConfigContext";

const { Option } = Select;

const OneRequestMultipleQuotesModal = ({ isRequestModalVisible, setIsRequestModalVisible, productNameBefore, quantityBefore, pieceBefore, section }) => {

  // get initial config
  const { config } = useGetConfig();

  const { width } = useWindowSize();

  const { t } = useTranslation();

  // get quantity Units list from API:
  const { data: quantityUnits } = useGetApi(`request-content-api`, 'variant=quantity_units', `quantityUnits`, { enabled: isRequestModalVisible });

  // get country lists from API:
  const { data: countryLists } = useGetApi(`country-lists-api`, '', `countryLists`, { enabled: isRequestModalVisible });

  // get order values lists from API:
  const { data: orderValues } = useGetApi(`request-content-api`, 'variant=order_values', `orderValues`, { enabled: isRequestModalVisible });

  // get supp Locations lists from API:
  const { data: suppLocations } = useGetApi(`request-content-api`, 'variant=supp_locations', `suppLocations`, { enabled: isRequestModalVisible });

  // get regular Types lists from API:
  const { data: regularTypes } = useGetApi(`request-content-api`, 'variant=regular_types', `regularTypes`, { enabled: isRequestModalVisible });

  // get requirement Urgencies lists from API:
  const { data: requirementUrgencies } = useGetApi(`request-content-api`, 'variant=requirement_urgencies', `requirementUrgencies`, { enabled: isRequestModalVisible });

  // get country codes from API:
  const { data: countryCodes } = useGetApi(`country-code-api`, `lang_code=${config.language}`, `countryCodes`, { enabled: isRequestModalVisible });

  const [isSpinSend, setIsSpinSend] = useState(false);

  const [firstFormContent, setFirstFormContent] = useState('d-block');
  const [lastFormContent, setLastFormContent] = useState('d-none');

  const [successFormContent, setSuccessFormContent] = useState('d-none');

  const [trackingCode, setTrackingCode] = useState();

  const [countryCode, setCountryCode] = useState('IR');

  const [isRegularType, setIsRegularType] = useState(false);

  // get cities list from API:
  const { data: cityLists } = useGetApi(`city-lists-api`, `country_code=${countryCode}`, `citiesList_${countryCode}`);

  async function getRequestCheck() {
    return await axios.get("https://alaedeen.com/horn/request-check-api/?table=?:vv_products_request&column=request_check");
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
        axios.post(`https://alaedeen.com/horn/send-request-api`, { values })
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
        {countryCodes?.country_code?.map((countryCode, index) => {
          return (
            <Option key={ `country_code_${ index +20 }` } value={countryCode?.code_number} >{ `${countryCode?.country} ${countryCode?.code_number}` }</Option>
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
      style={{ top: width < 992 && 10 }}
      visible={isRequestModalVisible}
      onCancel={handleClosRequestModal}
      destroyOnClose={true}
      footer={false}
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

          {section !== 'topPanel' &&
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
          }

          <Col span={section !== 'topPanel' ? 14 : 24} className="bg-f6 oneRequest--formContent__right">
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
                                {countryLists?.country_lists?.map((countryList) => {
                                  return (
                                    <Option key={ `country_lists_${ countryList?.code }` } value={countryList?.code} >{ countryList?.country }</Option>
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
                                {cityLists?.city_lists?.map((cityList) => {
                                  return (
                                    <Option key={ `cityLists_${ cityList?.code }` } value={cityList?.code} >{ cityList?.state }</Option>
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
                              placeholder={ t(__('Piece')) }
                              allowClear
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {quantityUnits?.request_contents?.map((quantityUnit) => {
                                return (
                                  <Option key={ `quantity_units_${ quantityUnit?.key }` } value={ quantityUnit?.key } >{ quantityUnit?.value }</Option>
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
                                {orderValues?.request_contents?.map((orderValue, index) => {
                                  return (
                                    <Option key={ `order_values_${ index * 20 }` } value={orderValue?.key} >{ orderValue?.name }</Option>
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
                                {suppLocations?.request_contents?.map((suppLocation, index) => {
                                  return (
                                    <Option key={ `supp_locations_${ index * 20 }` } value={suppLocation?.key} >{ suppLocation?.value }</Option>
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
                                {requirementUrgencies?.request_contents?.map((requirementUrgency, index) => {
                                  return (
                                    <Option key={ `requirement_urgencies_${ index * 20 }` } value={requirementUrgency?.key} >{ requirementUrgency?.value }</Option>
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
                                {regularTypes?.request_contents?.map((regularType, index) => {
                                  return (
                                    <Option key={ `regular_types_${ index * 25 }` } value={regularType?.key} >{ regularType?.value }</Option>
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