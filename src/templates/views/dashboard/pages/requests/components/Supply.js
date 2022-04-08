import { Checkbox, Col, Form, Input, Row, Select, Switch, Radio, Space, Button, InputNumber, Spin } from "antd";
import { __ } from "../../../../../../functions/Helper";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useGetApiOld } from "../../../../../../functions";
import axios from "axios";

const Supply = (
  {
    conversationId,
    setConversationData
  }
) => {

  const { Option } = Select;

  const { t } = useTranslation();

  const [ supplyForm ] = Form.useForm();

  const [isSupply, setIsSupply] = useState(true);

  const [isSpinSend, setIsSpinSend] = useState(false); // state for show spin after send form

  const { data: unitsData } = useGetApiOld("get-profile-field-value-api", "field_id=31", "units", { refetchOnWindowFocus: false });
  const units = unitsData || [];

  const { data: paymentCurrenciesData } = useGetApiOld("get-profile-field-value-api", "field_id=70", "paymentCurrencies", { refetchOnWindowFocus: false });
  const paymentCurrencies = paymentCurrenciesData || [];

  const handleSubmitSupply = values => {
    setIsSpinSend(true); // show spin

    values.conversation_id = conversationId;

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
        /*setConversationData(prev => {
          return { ...prev, isSupply: true }
        });*/
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
                  label={t(__('Terms of order supply'))}
                  className="formSwitch"
                >
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    defaultChecked
                    className="formSwitch--switch"
                    onChange={value => setIsSupply(value)}
                  />
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
                              <div className="mb-3"> {`${t(__("part"))} 1:`}</div>
                              <Form.Item
                                name={ ["terms_supply", "1", "working_day"] }
                                label={t(__("working day"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                rules={ [
                                  {
                                    required: true,
                                    message: t(__("Please complete the input.")),
                                  },
                                ] }
                              >
                                <Input
                                  placeholder={t(__("working day"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "1", "percent"] }
                                label={t(__("percent"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                rules={ [
                                  {
                                    required: true,
                                    message: t(__("Please complete the input.")),
                                  },
                                ] }
                              >
                                <Input
                                  placeholder={t(__("percent"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "1", "amount"] }
                                label={t(__("Approximate amount"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                rules={ [
                                  {
                                    required: true,
                                    message: t(__("Please complete the input.")),
                                  },
                                ] }
                              >
                                <Input
                                  placeholder={t(__("amount"))}
                                  allowClear
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

                              <div className="mb-3 border-top pt-3"> {`${t(__("part"))} 2:`}</div>
                              <Form.Item
                                name={ ["terms_supply", "2", "working_day"] }
                                label={t(__("working day"))}
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  placeholder={t(__("working day"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "2", "percent"] }
                                label={t(__("percent"))}
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  placeholder={t(__("percent"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "2", "amount"] }
                                label={t(__("Approximate amount"))}
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  placeholder={t(__("amount"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "2", "unit"] }
                                label={t(__("unit"))}
                                labelCol={ { sm: 24, lg: 6 } }
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

                              <div className="mb-3 border-top pt-3"> {`${t(__("part"))} 3:`}</div>
                              <Form.Item
                                name={ ["terms_supply", "3", "working_day"] }
                                label={t(__("working day"))}
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  placeholder={t(__("working day"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "3", "percent"] }
                                label={t(__("percent"))}
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  placeholder={t(__("percent"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "3", "amount"] }
                                label={t(__("Approximate amount"))}
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  placeholder={t(__("amount"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "3", "unit"] }
                                label={t(__("unit"))}
                                labelCol={ { sm: 24, lg: 6 } }
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

                              <div className="mb-3 border-top pt-3"> {`${t(__("part"))} 4:`}</div>
                              <Form.Item
                                name={ ["terms_supply", "4", "working_day"] }
                                label={t(__("working day"))}
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  placeholder={t(__("working day"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "4", "percent"] }
                                label={t(__("percent"))}
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  placeholder={t(__("percent"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "4", "amount"] }
                                label={t(__("Approximate amount"))}
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  placeholder={t(__("amount"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_supply", "4", "unit"] }
                                label={t(__("unit"))}
                                labelCol={ { sm: 24, lg: 6 } }
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
                            <Col span={ 24 } className="mb-4 border border-bc rounded-5 formCloneable">
                              <div className="mb-3"> {t(__("Terms of payment"))}</div>

                              <Form.Item
                                name={ ["terms_of_payment", "prepayment"] }
                                label={t(__("prepayment"))}
                                extra={t(__("percent"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                className="--extra"
                              >
                                <Input
                                  placeholder={t(__("percent"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_of_payment", "complete_order"] }
                                label={t(__("Complete the order"))}
                                extra={t(__("percent"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                className="--extra"
                              >
                                <Input
                                  placeholder={t(__("percent"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_of_payment", "delivery_border"] }
                                label={t(__("Delivery at the border"))}
                                extra={t(__("percent"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                className="--extra"
                              >
                                <Input
                                  placeholder={t(__("percent"))}
                                  allowClear
                                />
                              </Form.Item>

                              <Form.Item
                                name={ ["terms_of_payment", "delivery_destination"] }
                                label={t(__("Delivery in destination"))}
                                extra={t(__("percent"))}
                                labelCol={ { sm: 24, lg: 6 } }
                                className="--extra"
                              >
                                <Input
                                  placeholder={t(__("percent"))}
                                  allowClear
                                />
                              </Form.Item>

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
                              <div className="mb-3"> {t(__("currency type"))}</div>

                              <Form.Item
                                name="currency_type"
                                className="--currency"
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
                                        extra={t(__("month"))}
                                        className="--extra"
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
