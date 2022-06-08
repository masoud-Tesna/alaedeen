import "../../styles/RequestForm.less";
import {Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import {useTranslation} from "react-i18next";
import {__} from "../../../../../utilities/functions/Helper";
import React, {useCallback, useState} from "react";
import {useGetApiOld} from "../../../../../utilities/functions";
import SvgIcon from "../../../../common/SvgIcon";

const RequestForm = () => {
  
  const { Option } = Select;
  
  const { t } = useTranslation();
  
  // useForm for request forms(first and in modal):
  const [ requestFirstForm ] = Form.useForm();
  const [ requestForm ] = Form.useForm();
  
  // watch for changes in first form:
  const productName = Form.useWatch('product_name', requestFirstForm);
  const quantity = Form.useWatch('quantity', requestFirstForm);
  const quantityUnit = Form.useWatch('quantity_unit', requestFirstForm);
  const authEmail = Form.useWatch('auth_email', requestFirstForm);
  const terms = Form.useWatch('terms', requestFirstForm);
  
  // get quantity Units list from API:
  const { data: quantityUnitsData } = useGetApiOld(
    `request-content-api`,
    'variant=quantity_units',
    `quantityUnits`,
    {
      refetchOnWindowFocus: false
    }
  );
  const quantityUnits = quantityUnitsData || {};
  
  // Modal:
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  
  // Open Modal
  const openRequestModal = () => {
    setIsRequestModalVisible(true);
  };
  
  // Close Modal:
  
  const closeRequestModal = () => {
    setIsRequestModalVisible(false);
  };
  
  const handleSubmitRequest = v => {
    const values = {
      ...v,
      product_name: productName,
      quantity: quantity,
      quantity_unit: quantityUnit,
      auth_email: authEmail,
      terms: terms
    };
  
    console.log(values)
  }
  
  const ModalRequest = () => {
    return (
      <Modal
        title={t(__('Post Your buy Requirement'))}
        visible={isRequestModalVisible}
        onCancel={closeRequestModal}
        destroyOnClose={true}
        footer={false}
        className="request--modal"
      >
        <Form
          className="--form"
          name="request-form"
          form={requestForm}
          onFinish={handleSubmitRequest}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                name="product_name2"
                label={t(__('Product or Service2'))}
                labelCol={{span: 24}}
                rules={[
                  {
                    required: true,
                    message: (
                      <div className="--error">
                        <SvgIcon icon="circle-exclamation" color="#C62606" width={16}
                                 height={16}/> {t(__("Please complete the input"))}
                      </div>
                    ),
                  }
                ]}
              >
                <Input
                  placeholder={t(__('What are you looking for...'))}
                  allowClear
                />
              </Form.Item>
            </Col>
          
            <Col span={24}>
              <Form.Item noStyle>
                <Button
                  htmlType="submit"
                  className="__openRequestModalBtn"
                >
                  {t(__('Request for Quotation'))}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
  
  
  return (
    <Row className="requestForm--container">
      <Col span={24}>
        <Form
          className="--form"
          form={requestFirstForm}
          onFinish={openRequestModal}
        >
          <Row>
            <Col span={24} className="--caption">
              {t(__("One Request Multiple Quotes"))}
            </Col>
      
            <Col span={24}>
              <Form.Item
                name="product_name"
                label={ t(__('Product or Service')) }
                labelCol={ { span: 24 } }
                rules={[
                  {
                    required: true,
                    message: (
                      <div className="--error">
                        <SvgIcon icon="circle-exclamation" color="#C62606" width={16} height={16} /> {t(__("Please complete the input"))}
                      </div>
                    ),
                  }
                ]}
              >
                <Input
                  placeholder={ t(__('What are you looking for...')) }
                  allowClear
                />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="quantity"
                    label={ t(__('Quantity')) }
                    labelCol={ { span: 24 } }
                    rules={[
                      {
                        required: true,
                        message: (
                          <div className="--error">
                            <SvgIcon icon="circle-exclamation" color="#C62606" width={16} height={16} /> {t(__("Please complete the input"))}
                          </div>
                        ),
                      }
                    ]}
                  >
                    <InputNumber
                      placeholder={ t(__('Quantity')) }
                      min={1}
                    />
                  </Form.Item>
                </Col>
  
                <Col span={12}>
                  <Form.Item
                    className="__piece"
                    name="quantity_unit"
                    label=" "
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: (
                          <div className="--error">
                            <SvgIcon icon="circle-exclamation" color="#C62606" width={16} height={16} /> {t(__("Please pick an item"))}
                          </div>
                        ),
                      }
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
              <Form.Item
                name="auth_email"
                className="__email"
                label={ t(__('email')) }
                labelCol={ { span: 24 } }
                rules={[
                  {
                    type: 'email',
                    message: (
                      <div className="--error __emailError">
                        {t(__("The input is not valid E-mail"))}
                      </div>
                    ),
                  },
                  {
                    required: true,
                    message: (
                      <div className="--error">
                        <SvgIcon icon="circle-exclamation" color="#C62606" width={16} height={16} /> {t(__("Please complete the input"))}
                      </div>
                    ),
                  }
                ]}>
                <Input
                  placeholder="example@mail.com"
                  allowClear
                />
              </Form.Item>
            </Col>
  
            <Col span={24}>
              <Form.Item
                className="__terms"
                name="terms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(),
                  }
                ]}
              >
                <Checkbox>
                  { t(__('I Agree to Terms and Conditions')) }
                </Checkbox>
              </Form.Item>
            </Col>
  
            <Col span={24}>
              <Form.Item noStyle>
                <Button className="__openRequestModalBtn" htmlType="submit">
                  { t(__('Request for Quotation')) }
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
      
      {!!isRequestModalVisible && <ModalRequest />}
    </Row>
  );
};

export default RequestForm;
