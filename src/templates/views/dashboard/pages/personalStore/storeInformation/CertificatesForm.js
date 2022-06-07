import { Button, Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../../utilities/functions/Helper";

const CertificatesForm = (
  {
    formRef,
    handleSubmitForm
  }
) => {
  const { t } = useTranslation();

  const handleBeforeSubmitForm = () => {
    formRef.validateFields()
      .then(values => {
        // append section name to value:
        values.section = "certificates";

        // submit form:
        handleSubmitForm(values);
      })
      .catch(errorInfo => {
        // if isset error show log:
        console.log(errorInfo)
      });
  }

  return (
    <Form
      className="h-100 manufactureInfo--formContent"
      name="certificates-form"
      scrollToFirstError
      form={formRef}
    >
      <Row className="manufactureInfoForm--certificates" justify="center">
        <Col xs={24} lg={22} className="formItems--content">
          <Form.Item
            label={t(__('Certification'))}
            labelCol={{span: 24}}
            className="formSwitch"
          />

          <Form.Item
            name={['profile_fields', "75"]}
            label={t(__('Issued By'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <Input
              allowClear
            />
          </Form.Item>

          <Form.Item
            label={t(__('Honor & Award Certifications'))}
            labelCol={{span: 24}}
            className="formSwitch"
          />

          <Form.Item
            name={['profile_fields', "79"]}
            label={t(__('Issued By'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <Input
              allowClear
            />
          </Form.Item>
        </Col>

        <Col span={24} className="stepChangeCurrent--content">
          <Button type="primary" onClick={() => handleBeforeSubmitForm()}>
            { t('submit_and_next') }
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CertificatesForm;
