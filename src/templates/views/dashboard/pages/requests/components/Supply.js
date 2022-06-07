import {Checkbox, Col, Form, Input, Row, Select, Switch, Radio, Space, Button, InputNumber, Spin, message} from "antd";
import { __ } from "../../../../../../utilities/functions/Helper";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useGetApiOld } from "../../../../../../utilities/functions";
import axios from "axios";

const Supply = (
  {
    conversationId,
    setConversationData,
    companyId
  }
) => {

  const { Option } = Select;
  const { TextArea } = Input;

  const { t } = useTranslation();

  const [ supplyForm ] = Form.useForm();

  const [isSupply, setIsSupply] = useState(true);

  const [isSpinSend, setIsSpinSend] = useState(false); // state for show spin after send form

  const { data: unitsData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=31",
    "units",
    {
      refetchOnWindowFocus: false
    }
  );
  const units = unitsData || [];

  const { data: paymentCurrenciesData } = useGetApiOld(
    "get-profile-field-value-api",
    "field_id=70",
    "paymentCurrencies",
    {
      refetchOnWindowFocus: false
    }
  );
  const paymentCurrencies = paymentCurrenciesData || [];

  const handleSubmitSupply = values => {
    setIsSpinSend(true); // show spin

    values.conversation_id = conversationId;
    values.sender = companyId;

    if (values.is_supply) {
      values.negotiable.terms_supply = values.negotiable.terms_supply || false;
      values.negotiable.terms_of_payment = values.negotiable.terms_of_payment || false;
      values.negotiable.currency_type = values.negotiable.currency_type || false;
    }

    axios.post(
      "https://alaedeen.com/horn/api/SupplyOrder",
      values,
      {
        headers: {
          "Content-Type": "text/plain"
        }
      }
    )
      .then((res) => {
        setIsSpinSend(false); // remove spin
        setConversationData(prev => {
          return { ...prev, isSupply: true }
        });
      })
      .then (() => {
        message.success({
          content: t(__("Form information sent successfully")),
          duration: 2,
        })
      })
      .catch(() => {
        setIsSpinSend(false);
      });
  }

  const [productsNotExist, setProductsNotExist] = useState(false);

  return (
    <Row className="supply--container">
      <Col span={24}>
        <Spin
          spinning={isSpinSend}
          tip={ isSpinSend && `${ t('send_data') }...`}
        >
          <Form
            className="--form"
            name="supply-form"
            onFinish={handleSubmitSupply}
            form={supplyForm}
            scrollToFirstError
            initialValues={
              {
                no_order_supply: {
                  type: "order_supply_from"
                },
                is_supply: true
              }
            }
          >
            <Row className="w-100" gutter={[0, 20]}>
              <Col span={24}>
                <Form.Item
                  name="is_supply"
                  rules={[
                    {
                      required: true,
                      message: t(__("Please pick an item")),
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={e => setIsSupply(e.target.value)}
                    buttonStyle="solid"
                  >
                    <Radio.Button value={true}>{t("product_required_is_not_available")}</Radio.Button>
                    <Radio.Button value={false}>{t("product_required_is_available")}</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col span={24}>
                {
                  isSupply ?
                    (
                      <Row gutter={[0, 20]}>
                        <Col span={24}>
                          <Row>
                            <Col span={ 24 } className="mb-4 border border-bc rounded-5 formCloneable">
                              <div className="mb-4 vv-font-size-1-5 font-weight-600"> {t(__("Terms of order supply"))}</div>
                              
                              <div className="mb-3">{`${t("part")} 1`}</div>
                              <Form.Item
                                name={ ["terms_supply", "1", "supply_time"] }
                                label={t("supply_time")}
                                labelCol={ { sm: 24, lg: 6 } }
                                rules={ [
                                  {
                                    required: true,
                                    message: t(__("Please complete the input.")),
                                  },
                                ] }
                                extra={t(__("supply_time", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("working day"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "1", "supply_amount"] }
                                label={t("supply_amount")}
                                labelCol={ { sm: 24, lg: 6 } }
                                rules={ [
                                  {
                                    required: true,
                                    message: t(__("Please complete the input.")),
                                  },
                                ] }
                                extra={t(__("supply_amount", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("percent"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "1", "approx_quantity"] }
                                label={t("approx_quantity")}
                                labelCol={ { sm: 24, lg: 6 } }
                                rules={ [
                                  {
                                    required: true,
                                    message: t(__("Please complete the input.")),
                                  },
                                ] }
                                extra={t(__("approx_quantity", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("quantity"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "1", "unit"] }
                                label={t(__("unit"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                rules={ [
                                  {
                                    required: true,
                                    message: t(__("Please complete the input.")),
                                  },
                                ] }
                                extra={t(__("unit", "desc"))}
                              >
                                <Select
                                  placeholder={ t(__('Select Unit Type')) }
                                  allowClear
                                  showSearch
                                  filterOption={ (input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                  onChange={value => {
                                    supplyForm?.setFieldsValue({
                                      terms_supply: {
                                        2: {
                                          unit: supplyForm.getFieldValue(["terms_supply", "2", "unit"]) || value
                                        },
                                        3: {
                                          unit: supplyForm.getFieldValue(["terms_supply", "3", "unit"]) || value
                                        },
                                        4: {
                                          unit: supplyForm.getFieldValue(["terms_supply", "4", "unit"]) || value
                                        }
                                      }
                                    });
                                  }}
                                >
                                  { units.length && units?.map(unit => {
                                    return (
                                      <Option
                                        key={ `units_${ unit?.value_id }` }
                                        value={ unit?.value_id }
                                      >
                                        { t(__(unit?.description)) }
                                      </Option>
                                    );
                                  }) }
                                </Select>
                              </Form.Item>

                              <div className="mb-3 border-top pt-3">{`${t("part")} 2`}</div>
                              <Form.Item
                                name={ ["terms_supply", "2", "supply_time"] }
                                label={t("supply_time")}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("supply_time", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("working day"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "2", "supply_amount"] }
                                label={t("supply_amount")}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("supply_amount", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("percent"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "2", "approx_quantity"] }
                                label={t("approx_quantity")}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("approx_quantity", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("quantity"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "2", "unit"] }
                                label={t(__("unit"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("unit", "desc"))}
                              >
                                <Select
                                  placeholder={ t(__('Select Unit Type')) }
                                  allowClear
                                  showSearch
                                  filterOption={ (input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  { units.length && units?.map(unit => {
                                    return (
                                      <Option
                                        key={ `units_${ unit?.value_id }` }
                                        value={ unit?.value_id }
                                      >
                                        { t(__(unit?.description)) }
                                      </Option>
                                    );
                                  }) }
                                </Select>
                              </Form.Item>

                              <div className="mb-3 border-top pt-3">{`${t("part")} 3`}</div>
                              <Form.Item
                                name={ ["terms_supply", "3", "supply_time"] }
                                label={t("supply_time")}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("supply_time", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("working day"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "3", "supply_amount"] }
                                label={t("supply_amount")}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("supply_amount", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("percent"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "3", "approx_quantity"] }
                                label={t("approx_quantity")}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("approx_quantity", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("quantity"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "3", "unit"] }
                                label={t(__("unit"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("unit", "desc"))}
                              >
                                <Select
                                  placeholder={ t(__('Select Unit Type')) }
                                  allowClear
                                  showSearch
                                  filterOption={ (input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  { units.length && units?.map(unit => {
                                    return (
                                      <Option
                                        key={ `units_${ unit?.value_id }` }
                                        value={ unit?.value_id }
                                      >
                                        { t(__(unit?.description)) }
                                      </Option>
                                    );
                                  }) }
                                </Select>
                              </Form.Item>

                              <div className="mb-3 border-top pt-3">{`${t("part")} 4`}</div>
                              <Form.Item
                                name={ ["terms_supply", "4", "supply_time"] }
                                label={t("supply_time")}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("supply_time", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("working day"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "4", "supply_amount"] }
                                label={t("supply_amount")}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("supply_amount", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("percent"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "4", "approx_quantity"] }
                                label={t("approx_quantity")}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("approx_quantity", "desc"))}
                              >
                                <InputNumber
                                  className="w-100"
                                  placeholder={t(__("quantity"))}
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "4", "unit"] }
                                label={t(__("unit"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                extra={t(__("unit", "desc"))}
                              >
                                <Select
                                  placeholder={ t(__('Select Unit Type')) }
                                  allowClear
                                  showSearch
                                  filterOption={ (input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  { units.length && units?.map(unit => {
                                    return (
                                      <Option
                                        key={ `units_${ unit?.value_id }` }
                                        value={ unit?.value_id }
                                      >
                                        { t(__(unit?.description)) }
                                      </Option>
                                    );
                                  }) }
                                </Select>
                              </Form.Item>

                              <Form.Item
                                name={["negotiable", "terms_supply"]}
                                valuePropName="checked"
                              >
                                <Checkbox>
                                  { t(__('The above conditions are negotiable')) }
                                </Checkbox>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row>
                            <Col span={ 24 } className="mb-4 border border-bc rounded-5 formCloneable termsOfPayment">
                              <div className="mb-4 vv-font-size-1-5 font-weight-600"> {t(__("Terms of payment"))}</div>
                              
                              <Col span={24}>
                                <Row>
                                  <Col span={13}>
                                    <Form.Item
                                      name={ ["terms_of_payment", "1", "percent"] }
                                      label={t(__("first stage"))}
                                      extra={t(__("enter the percentage of the amount payable"))}
                                      labelCol={ { sm: 24, lg: 11 } }
                                      rules={ [
                                        {
                                          required: true,
                                          message: t(__("Please complete the input.")),
                                        },
                                      ] }
                                    >
                                      <InputNumber
                                        className="w-75"
                                        placeholder={t(__("percent"))}
                                      />
                                    </Form.Item>
                                  </Col>
                                  
                                  <Col span={11}>
                                    <Form.Item
                                      name={ ["terms_of_payment", "1", "description"] }
                                      extra={t(__("Description of payment terms"))}
                                      rules={ [
                                        {
                                          required: true,
                                          message: t(__("Please complete the input.")),
                                        },
                                      ] }
                                    >
                                      <TextArea
                                        rows={3}
                                        className="w-100"
                                        placeholder={t(__("description"))}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Col>
  
                              <Col span={24}>
                                <Row>
                                  <Col span={13}>
                                    <Form.Item
                                      name={ ["terms_of_payment", "2", "percent"] }
                                      label={t(__("second stage"))}
                                      extra={t(__("enter the percentage of the amount payable"))}
                                      labelCol={ { sm: 24, lg: 11 } }
                                    >
                                      <InputNumber
                                        className="w-75"
                                        placeholder={t(__("percent"))}
                                      />
                                    </Form.Item>
                                  </Col>
      
                                  <Col span={11}>
                                    <Form.Item
                                      name={ ["terms_of_payment", "2", "description"] }
                                      extra={t(__("Description of payment terms"))}
                                    >
                                      <TextArea
                                        rows={3}
                                        className="w-100"
                                        placeholder={t(__("description"))}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Col>
  
                              <Col span={24}>
                                <Row>
                                  <Col span={13}>
                                    <Form.Item
                                      name={ ["terms_of_payment", "3", "percent"] }
                                      label={t(__("third stage"))}
                                      extra={t(__("enter the percentage of the amount payable"))}
                                      labelCol={ { sm: 24, lg: 11 } }
                                    >
                                      <InputNumber
                                        className="w-75"
                                        placeholder={t(__("percent"))}
                                      />
                                    </Form.Item>
                                  </Col>
      
                                  <Col span={11}>
                                    <Form.Item
                                      name={ ["terms_of_payment", "3", "description"] }
                                      extra={t(__("Description of payment terms"))}
                                    >
                                      <TextArea
                                        rows={3}
                                        className="w-100"
                                        placeholder={t(__("description"))}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Col>
  
                              <Col span={24}>
                                <Row>
                                  <Col span={13}>
                                    <Form.Item
                                      name={ ["terms_of_payment", "4", "percent"] }
                                      label={t(__("fourth stage"))}
                                      extra={t(__("enter the percentage of the amount payable"))}
                                      labelCol={ { sm: 24, lg: 11 } }
                                    >
                                      <InputNumber
                                        className="w-75"
                                        placeholder={t(__("percent"))}
                                      />
                                    </Form.Item>
                                  </Col>
      
                                  <Col span={11}>
                                    <Form.Item
                                      name={ ["terms_of_payment", "4", "description"] }
                                      extra={t(__("Description of payment terms"))}
                                    >
                                      <TextArea
                                        rows={3}
                                        className="w-100"
                                        placeholder={t(__("description"))}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Col>

                              <Form.Item
                                name={["negotiable", "terms_of_payment"]}
                                valuePropName="checked"
                              >
                                <Checkbox>
                                  { t(__('The above conditions are negotiable')) }
                                </Checkbox>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row>
                            <Col span={ 24 } className="mb-4 border border-bc rounded-5 formCloneable">
                              <Form.Item
                                name="currency_type"
                                label={t(__("receivable currency"))}
                                labelCol={{span: 24}}
                                className="--currency"
                                extra={t(__("currency_type", "desc"))}
                                rules={ [
                                  {
                                    required: true,
                                    message: t(__("Please select one or more options")),
                                  },
                                ] }
                              >
                                <Checkbox.Group className="w-100">
                                  <Row gutter={[40, 20]} className="px-6">
                                    {paymentCurrencies?.length && paymentCurrencies?.map(paymentCurrency => {
                                      return (
                                        <Col key={`paymentCurrencies_${paymentCurrency?.value_id}`}>
                                          <Checkbox
                                            value={paymentCurrency?.value_id}
                                          >
                                            { t(__(paymentCurrency?.description)) }
                                          </Checkbox>
                                        </Col>
                                      )
                                    })}
                                  </Row>
                                </Checkbox.Group>
                              </Form.Item>

                              <Form.Item
                                name={["negotiable", "currency_type"]}
                                valuePropName="checked"
                              >
                                <Checkbox>
                                  { t(__('The above conditions are negotiable')) }
                                </Checkbox>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row className="mt-4" justify="center" gutter={20}>
                            <Col span={24} className="text-center">
                              <Form.Item
                                className="--sendFormBtn"
                              >
                                <Button type="primary" htmlType="submit">
                                  { t(__('submit')) }
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ) :
                    (
                      <Row gutter={[0, 20]}>
                        <Col span={24}>
                          <Row>
                            <Col span={ 24 } className="formCloneable">
                              <Form.Item
                                name={["no_order_supply", "type"]}
                                className="--noOrderSupply"
                                rules={ [
                                  {
                                    required: true,
                                    message: t(__("Please select an option.")),
                                  },
                                ] }
                              >
                                <Radio.Group value={"order_supply_from"}>
                                  <Space direction="vertical">
                                    <Radio
                                      value="order_supply_from"
                                      onClick={() => {
                                        setProductsNotExist(false);
                                      }}
                                    >
                                      <Form.Item
                                        name={["no_order_supply", "order_supply_from"]}
                                        label={t(__("Order supply from"))}
                                        extra={t(__("Order supply from", "desc"))}
                                        onClick={() => {
                                          supplyForm?.setFieldsValue({
                                            no_order_supply: {
                                              type: "order_supply_from"
                                            },
                                          });
                                          setProductsNotExist(false);
                                        }}
                                        rules={ [
                                          {
                                            required: !productsNotExist,
                                            message: t(__("Please complete the input.")),
                                          },
                                        ] }
                                      >
                                        <InputNumber
                                          placeholder={t(__("month"))}
                                          allowClear
                                          disabled={!!productsNotExist}
                                          className="w-100"
                                        />
                                      </Form.Item>
                                    </Radio>
                                    <Radio
                                      value="not_exist"
                                      onClick={() => {
                                        supplyForm?.setFieldsValue({
                                          no_order_supply: {
                                            order_supply_from: ""
                                          },
                                        });
                                        setProductsNotExist(true);
                                      }}
                                    >
                                      {t("product_requested_not_exist.msg")}
                                    </Radio>
                                  </Space>
                                </Radio.Group>
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Row className="mt-4" justify="center" gutter={20}>
                                <Col span={24} className="text-center">
                                  <Form.Item
                                    className="--sendFormBtn"
                                  >
                                    <Button type="primary" htmlType="submit">
                                      { t(__('submit')) }
                                    </Button>
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )
                }
              </Col>
            </Row>
          </Form>
        </Spin>
      </Col>
    </Row>
  );
};

export default Supply;
