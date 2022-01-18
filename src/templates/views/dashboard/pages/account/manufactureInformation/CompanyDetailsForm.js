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
      onFinish={values => console.log(values)}
      scrollToFirstError
      translate="no"
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
            name={['profile_fields', "2"]}
            label={t(__('Zip/Postal Code'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <Input
              allowClear
            />
          </Form.Item>

          <Form.Item
            name={['profile_fields', "4"]}
            label={t(__('Year Company Registered'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <DatePicker
              picker="year"
              className="w-30"
            />
          </Form.Item>

          <Form.Item
            name={['profile_fields', "5"]}
            label={ t(__('Total No. Employees')) }
            labelCol={{sm: 24, lg: 6}}
          >
            <Select
              placeholder={ t(__('Total No. Employees')) }
              className="w-30"
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {employees.length && employees?.map(employee => {
                return (
                  <Option
                    key={ `office_size_${ employee?.value_id }` }
                    value={ employee?.value_id }
                  >
                    { t(__(employee?.description)) }
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name={['profile_fields', "6"]}
            label={t(__('Company Website Url'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <Input
              addonBefore="https://"
              placeholder="yourWebsite.com"
              allowClear
            />
          </Form.Item>

          <Form.Item
            name={['profile_fields', "7"]}
            label={t(__('Legal Owner'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <Input
              allowClear
            />
          </Form.Item>

          <Form.Item
            name={['profile_fields', "8"]}
            label={ t(__('Office Size')) }
            labelCol={{sm: 24, lg: 6}}
          >
            <Select
              placeholder={ t(__('Office Size')) }
              className="w-30"
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {officeSizes.length && officeSizes?.map(officeSize => {
                return (
                  <Option key={ `office_size_${ officeSize?.value_id }` } value={ officeSize?.value_id } >{ t(__(officeSize?.description)) }</Option>
                );
              })}
            </Select>
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
