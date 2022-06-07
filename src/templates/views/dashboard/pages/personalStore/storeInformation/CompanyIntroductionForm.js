import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../../utilities/functions/Helper";

const CompanyIntroductionForm = (
  {
    formRef,
    handleSubmitForm
  }
) => {

  const { t } = useTranslation();

  const handleBeforeSubmitForm = () => {
    formRef.validateFields()
      .then(values => {
        // append section name to values:
        values.section = "company_introduction";

        // if isset field 90 (sata picker) change format:
        if (values['profile_fields'][90]) {
          values['profile_fields'][90] = values['profile_fields'][90].format('YYYY-MM');
        }

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
      name="companyIntroduction-form"
      scrollToFirstError
      form={formRef}
    >
      <Row className="manufactureInfoForm--certificates" justify="center">
        <Col xs={24} lg={22} className="formItems--content">
          <Row className="companyLogo">
            <Col span={24}>
              <Form.Item
                label={t(__('video Links'))}
                labelCol={{span: 24}}
                extra={t(__('video links message'))}
                className="companyLogo--caption"
              />
              <Row className="px-5">
                <Col span={24}>
                  <Row gutter={20}>
                    <Col>
                      <Form.Item
                        name={['profile_fields', 'video_link', 0, "show_home"]}
                        valuePropName="checked"
                      >
                        <Checkbox>{ t(__('show in home')) }</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item
                        name={['profile_fields', 'video_link', 0, "link"]}
                      >
                        <Input
                          placeholder={t(__('video_link'))}
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={20}>
                    <Col>
                      <Form.Item
                        name={['profile_fields', 'video_link', 1, "show_home"]}
                        valuePropName="checked"
                      >
                        <Checkbox>{ t(__('show in home')) }</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item
                        name={['profile_fields', 'video_link', 1, "link"]}
                      >
                        <Input
                          placeholder={t(__('video_link'))}
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

                <Col span={24}>
                  <Row gutter={20}>
                    <Col>
                      <Form.Item
                        name={['profile_fields', 'video_link', 2, "show_home"]}
                        valuePropName="checked"
                      >
                        <Checkbox>{ t(__('show in home')) }</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={9}>
                      <Form.Item
                        name={['profile_fields', 'video_link', 2, "link"]}
                      >
                        <Input
                          placeholder={t(__('video_link'))}
                          allowClear
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
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

export default CompanyIntroductionForm;
