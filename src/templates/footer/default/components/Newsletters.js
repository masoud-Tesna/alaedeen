import "../styles/Newsletters.less";
import {Button, Col, Form, Input, Row} from "antd";
import {useTranslation} from "react-i18next";
import {__} from "../../../../functions/Helper";
import {useState} from "react";

const Newsletters = () => {
  
  const [newslettersForm] = Form.useForm();
  
  const { t } = useTranslation();
  
  const [isOk, setIsOk] = useState(false);
  
  return (
    <Row justify="center" className="newsletters--container" gutter={[0, 24]}>
      <Col span={24} className="text-center --caption">
        {t("invite_newsletters_text")}
      </Col>
      <Col span={24} className="text-center">
        <Form
          layout="inline"
          form={newslettersForm}
          onValuesChange={() => setIsOk(false)}
          onFinish={v => {
            console.log(v);
            setIsOk(true);
          }}
          className="ant-row-center --form"
        >
          <Form.Item
            name="user_email" className="__input"
            rules={[
              {
                type: "email",
                message: t(__("The input is not valid E-mail"))
              },
              {
                required: true,
                message: t(__("Please enter your account E-mail"))
              }
            ]}
            extra={isOk && "Your email was successfully registered"}
          >
            <Input
              bordered={false}
              placeholder={ t(__('your_email')) }
            />
      
          </Form.Item>
          <Form.Item
            valuePropName="checked"
            className="__btn"
          >
            <Button type="primary" htmlType="submit">{t("subscribe")}</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Newsletters;
