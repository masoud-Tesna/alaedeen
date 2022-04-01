import {
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Checkbox,
  Button
} from "antd";
import { __, scrollIntoViewIfTargetNotOnDisplay } from "../../../../../../functions/Helper";
import { useTranslation } from "react-i18next";
import ImagesUploader from "../../../../../common/ImagesUploader";
import { UploadOutlined } from "@ant-design/icons";
import { useRef } from "react";

const ExportCapabilityForm = (
  {
    formRef,
    handleSubmitForm,
    countryLists,
    handleUploadImage,
    handleOnRemoveImage,
    handleImageUploadChange,
    imageFileList,
    countryCodes,
    duties,
    acceptedDeliveries,
    paymentCurrencies,
    languagesSpoken
  }
) => {

  const { TextArea } = Input;
  const { Option } = Select;
  const { Panel } = Collapse;

  const { t } = useTranslation();

  const collapseRef = useRef(null);

  const handleBeforeSubmitForm = () => {
    formRef.validateFields()
      .then(values => {
        // append section name to values:
        values.section = "export_capability";

        // if isset field 48 (sata picker) change format:
        if (values['profile_fields'][48]) {
          values['profile_fields'][48] = values['profile_fields'][48].format('YYYY');
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
      name="exportCapability-form"
      scrollToFirstError
      form={formRef}
    >
      <Row className="manufactureInfoForm--exportCapability" justify="center">
        <Col xs={24} lg={22} className="formItems--content">
          <Row>
            <Col span={24}>
              <Collapse accordion={true} onChange={() => window.setTimeout(() => scrollIntoViewIfTargetNotOnDisplay(collapseRef?.current), 500) }>
                <Panel header={t(__('Accepted Delivery Terms'))} key="1">
                  <div ref={collapseRef} className="CollapseScrollTop" />
                  <div className="checkBoxGroup">
                    <Form.Item
                      name={['profile_fields', "69"]}
                    >
                      <Checkbox.Group>
                        <Row gutter={[0, 20]}>
                          {acceptedDeliveries?.length && acceptedDeliveries?.map(acceptedDelivery => {
                            return (
                              <Col key={`acceptedDeliveries_${acceptedDelivery?.value_id}`} span={8}>
                                <Checkbox
                                  value={acceptedDelivery?.value_id}
                                >
                                  { t(__(acceptedDelivery?.description)) }
                                </Checkbox>
                              </Col>
                            )
                          })}
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </div>
                </Panel>

                <Panel header={t(__('Accepted Payment Currency'))} key="2">
                  <div ref={collapseRef} className="CollapseScrollTop" />
                  <div className="checkBoxGroup">
                    <Form.Item
                      name={['profile_fields', "70"]}
                    >
                      <Checkbox.Group>
                        <Row gutter={[0, 20]}>
                          {paymentCurrencies?.length && paymentCurrencies?.map(paymentCurrency => {
                            return (
                              <Col key={`paymentCurrencies_${paymentCurrency?.value_id}`} span={8}>
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
                  </div>
                </Panel>

                <Panel header={t(__('Language Spoken'))} key="3">
                  <div ref={collapseRef} className="CollapseScrollTop" />
                  <div className="checkBoxGroup">
                    <Form.Item
                      name={['profile_fields', "71"]}
                    >
                      <Checkbox.Group>
                        <Row gutter={[0, 20]}>
                          {languagesSpoken?.length && languagesSpoken?.map(languageSpoken => {
                            return (
                              <Col key={`languagesSpoken_${languageSpoken?.lang_id}`} span={8}>
                                <Checkbox
                                  value={languageSpoken?.lang_code}
                                >
                                  { t(__(languageSpoken?.lang_name)) }
                                </Checkbox>
                              </Col>
                            )
                          })}
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  </div>
                </Panel>
              </Collapse>
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

export default ExportCapabilityForm;
