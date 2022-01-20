import { Button, Col, Form, Input, Row, Select, Space, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../../functions/Helper";
import ImagesUploader from "../../../../../common/ImagesUploader";
import { UploadOutlined } from "@ant-design/icons";

const CertificatesForm = (
  {
    formRef,
    handleSubmitForm,
    handlePrevTab,
    handleUploadImage,
    handleOnRemoveImage,
    handleImageUploadChange,
    imageFileList,
    certificationTypes
  }
) => {
  const { Option } = Select;

  const { t } = useTranslation();

  const handleBeforeSubmitForm = () => {
    formRef.validateFields()
      .then(values => {
        // append section name to values:
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
      onFinish={values => console.log(values)}
      scrollToFirstError
      form={formRef}
    >
      <Row className="manufactureInfoForm--certificates" justify="center">
        <Col xs={24} lg={22} className="formItems--content">
          <Form.Item
            name={['profile_fields', "72"]}
            label={t(__('Certification'))}
            labelCol={{sm: 24}}
            initialValue={"Y"}
            className="formSwitch"
          >
            <Switch
              checkedChildren={t('yes')}
              unCheckedChildren={t('no')}
              defaultChecked
              className="formSwitch--switch"
              onChange={value => {
                formRef?.setFieldsValue({
                  "profile_fields": {
                    72: value ? "Y" : "N"
                  },
                });
              }}
            />
          </Form.Item>

          <Row>
            <Col span={24} className="mb-4 border border-bc rounded-5 formCloneable">
              <Form.Item
                name={['profile_fields', "73"]}
                label={t(__('certification type'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Select
                  placeholder={ t(__('certification type')) }
                  className="w-30"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {certificationTypes.length && certificationTypes?.map(certificationType => {
                    return (
                      <Option
                        key={ `certificationTypes_${ certificationType?.value_id }` }
                        value={ certificationType?.value_id }
                      >
                        { t(__(certificationType?.description)) }
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name={['profile_fields', "74"]}
                label={t(__('Certificate name'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>



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
                label={t(__('certification images'))}
                valuePropName="fileList"
                labelCol={{sm: 24, lg: 6}}
                extra={t(__('Office Photos message'))}
              >
                <ImagesUploader
                  handleCustomRequest={options => handleUploadImage({
                    ...options,
                    inputName : 76
                  })}
                  handleOnRemove={file => handleOnRemoveImage({
                    ...file,
                    inputName : 76
                  })}
                  handleOnChange={handleImageUploadChange}
                  imageFileList={imageFileList}
                  uploadBtnText="select image"
                  uploadBtnIcon={<UploadOutlined />}
                  customClassName="addProduct--imageUploader"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name={['profile_fields', "77"]}
            label={t(__('Honor & Award Certifications'))}
            labelCol={{sm: 24}}
            initialValue={"Y"}
            className="formSwitch"
          >
            <Switch
              checkedChildren={t('yes')}
              unCheckedChildren={t('no')}
              defaultChecked
              className="formSwitch--switch"
              onChange={value => {
                formRef?.setFieldsValue({
                  "profile_fields": {
                    77: value ? "Y" : "N"
                  },
                });
              }}
            />
          </Form.Item>

          <Row>
            <Col span={24} className="mb-4 border border-bc rounded-5 formCloneable">
              <Form.Item
                name={['profile_fields', "78"]}
                label={t(__('Award name'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name={['profile_fields', "79"]}
                label={t(__('Issued By'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label={t(__('Honor & Award Certifications images'))}
                valuePropName="fileList"
                labelCol={{sm: 24, lg: 6}}
                extra={t(__('Office Photos message'))}
              >
                <ImagesUploader
                  handleCustomRequest={options => handleUploadImage({
                    ...options,
                    inputName : 80
                  })}
                  handleOnRemove={file => handleOnRemoveImage({
                    ...file,
                    inputName : 80
                  })}
                  handleOnChange={handleImageUploadChange}
                  imageFileList={imageFileList}
                  uploadBtnText="select image"
                  uploadBtnIcon={<UploadOutlined />}
                  customClassName="addProduct--imageUploader"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name={['profile_fields', "81"]}
            label={t(__('Patents'))}
            labelCol={{sm: 24}}
            initialValue={"Y"}
            className="formSwitch"
          >
            <Switch
              checkedChildren={t('yes')}
              unCheckedChildren={t('no')}
              defaultChecked
              className="formSwitch--switch"
              onChange={value => {
                formRef?.setFieldsValue({
                  "profile_fields": {
                    81: value ? "Y" : "N"
                  },
                });
              }}
            />
          </Form.Item>

          <Row>
            <Col span={24} className="mb-4 border border-bc rounded-5 formCloneable">
              <Form.Item
                name={['profile_fields', "82"]}
                label={t(__('patent Name'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label={t(__('patent images'))}
                valuePropName="fileList"
                labelCol={{sm: 24, lg: 6}}
                extra={t(__('Office Photos message'))}
              >
                <ImagesUploader
                  handleCustomRequest={options => handleUploadImage({
                    ...options,
                    inputName : 83
                  })}
                  handleOnRemove={file => handleOnRemoveImage({
                    ...file,
                    inputName : 83
                  })}
                  handleOnChange={handleImageUploadChange}
                  imageFileList={imageFileList}
                  uploadBtnText="select image"
                  uploadBtnIcon={<UploadOutlined />}
                  customClassName="addProduct--imageUploader"
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col span={24} className="stepChangeCurrent--content">
          <Space size="large">
            <Button onClick={() => handlePrevTab()}>
              { t('previous') }
            </Button>

            <Button type="primary" onClick={() => handleBeforeSubmitForm()}>
              { t('submit_and_next') }
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default CertificatesForm;
