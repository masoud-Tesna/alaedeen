import "../../styles/RequestForm.less";
import {Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select} from "antd";
import {useTranslation} from "react-i18next";
import {__} from "../../../../../utilities/functions/Helper";
import {useGetApiOld} from "../../../../../utilities/functions";
import SvgIcon from "../../../../common/SvgIcon";
import {useGetConfig} from "../../../../../contexts/config/ConfigContext";
import { Choose, When, Otherwise } from "control-statements";
import {useNavigate} from "react-router-dom";

const RequestForm = () => {
  
  const { Option } = Select;
  
  // user data context state:
  const { config } = useGetConfig();
  
  const countryCode = config.countryCode;
  
  const { t } = useTranslation();
  
  // useForm for request forms:
  const [ requestForm ] = Form.useForm();
  
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
  
  const navigate = useNavigate();
  
  const redirectToRfq = v => {
    return navigate('/rfq', { state: v });
  }
  
  return (
    <Row className="requestForm--container">
      <Col span={24}>
        <Form
          className="--form"
          form={requestForm}
          onFinish={redirectToRfq}
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
              <Choose>
                <When condition={countryCode === "IR"}>
                  <Form.Item
                    name="phone_number"
                    className="__phone"
                    label={ t(__('Mobile No')) }
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
                    ]}>
                    <Input
                      placeholder={ t(__('Enter your mobile number')) }
                      allowClear
                    />
                  </Form.Item>
                </When>
                
                <Otherwise>
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
                </Otherwise>
              </Choose>
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
    </Row>
  );
};

export default RequestForm;
