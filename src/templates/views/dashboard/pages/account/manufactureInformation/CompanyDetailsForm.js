import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { __ } from "../../../../../../functions/Helper";
import { useTranslation } from "react-i18next";

const CompanyDetailsForm = (
  {
    formRef,
    handleSubmitForm,
    employees,
    officeSizes
  }
) => {

  const { TextArea } = Input;
  const { Option } = Select;

  const { t } = useTranslation();

  const handleBeforeSubmitForm = () => {
    formRef.validateFields()
      .then(values => {
        if (values['profile_fields'][4]) {
          values[ 'profile_fields' ][ 4 ] = values[ 'profile_fields' ][ 4 ].format('YYYY');
          values.section = "company_details";
        }
        handleSubmitForm(values);
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      });
  }

  return (
    <Form
      className="h-100 manufactureInfo--formContent"
      name="companyDetails-form"
      scrollToFirstError
      form={formRef}
    >
      <Row className="manufactureInfoForm--companyDetails" justify="center">
        <Col xs={24} lg={22} className="formItems--content">
          <Form.Item
            name={['profile_fields', "1"]}
            label={t(__('Company Operational Address'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <TextArea
              autoSize={{ minRows: 2}}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name={['profile_fields', "9"]}
            label={t(__('Company Advantages'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <TextArea
              placeholder={t(__('Company Advantages'))}
              showCount
              maxLength={1024}
              autoSize={{ minRows: 4, maxRows: 5 }}
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

export default CompanyDetailsForm;
