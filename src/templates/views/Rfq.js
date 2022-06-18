import {useLocation} from "react-router-dom";
import "./styles/Rfq.less";
import {Button, Checkbox, Col, Form, Input, InputNumber, Row, Select} from "antd";
import {__, Else, If, Then} from "../../utilities/functions/Helper";
import SvgIcon from "../common/SvgIcon";
import {useTranslation} from "react-i18next";
import {useGetConfig} from "../../contexts/config/ConfigContext";
import {useGetApiOld} from "../../utilities/functions";

const Rfq = () => {
  
  const { Option } = Select;
  
  // user data context state:
  const { config } = useGetConfig();
  
  const countryCode = config.countryCode;
  
  const { t } = useTranslation();
  
  const { state : requestFormState } = useLocation();
  
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
  
  return (
    <Form
      className="--form"
      form={requestForm}
      initialValues={requestFormState}
      onFinish={v => console.log(v)}
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
          <If condition={countryCode === "IR"}>
            <Then>
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
            </Then>
            
            <Else>
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
            </Else>
          </If>
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
  )
}

export default Rfq;