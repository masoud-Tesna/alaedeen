import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../../functions/Helper";
import ImagesUploader from "../../../../../common/ImagesUploader";
import ImageUploader from "../../../../../common/ImageUploader";
import { UploadOutlined } from "@ant-design/icons";

const CompanyIntroductionForm = (
  {
    formRef,
    handleSubmitForm,
    handlePrevStep,
    handleUploadImage,
    handleOnRemoveImage,
    handleImageUploadChange,
    imageFileList,
    countryLists
  }
) => {

  const { TextArea } = Input;
  const { Option } = Select;

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
      name="certificates-form"
      onFinish={values => console.log(values)}
      scrollToFirstError
      form={formRef}
    >
      <Row className="manufactureInfoForm--certificates" justify="center">
        <Col xs={24} lg={22} className="formItems--content">

          <Row className="companyLogo">
            <Col span={24}>
              <Form.Item
                label={t(__('Company Logo'))}
                labelCol={{sm: 24}}
                extra={t(__('Company Logo message'))}
                className="companyLogo--caption"
              />
              <Row className="px-5">
                <Col span={12}>
                  <Form.Item
                    label={t(__('Logo For Persian Language'))}
                    valuePropName="fileList"
                    labelCol={{sm: 24, lg: 6}}
                  >
                    <ImageUploader
                      handleCustomRequest={options => handleUploadImage({
                        ...options,
                        inputName : "fa",
                        for_logo: true
                      })}
                      uploadBtnText="select logo"
                      uploadBtnIcon={<UploadOutlined />}
                      customClassName="addProduct--imageUploader"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t(__('Logo For english Language'))}
                    valuePropName="fileList"
                    labelCol={{sm: 24, lg: 6}}
                  >
                    <ImageUploader
                      handleCustomRequest={options => handleUploadImage({
                        ...options,
                        inputName : "en",
                        for_logo: true
                      })}
                      uploadBtnText="select logo"
                      uploadBtnIcon={<UploadOutlined />}
                      customClassName="addProduct--imageUploader"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <Form.Item
            name={['profile_fields', "85"]}
            label={t(__('Detailed Company Introduction'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <TextArea
              placeholder={t(__('Detailed Company Introduction'))}
              showCount
              maxLength={4000}
              autoSize={{ minRows: 6, maxRows: 6 }}
            />
          </Form.Item>

          <Form.Item
            label={t(__('Company images'))}
            valuePropName="fileList"
            labelCol={{sm: 24, lg: 6}}
            extra={t(__('Company Photos message'))}
          >
            <ImagesUploader
              handleCustomRequest={options => handleUploadImage({
                ...options,
                inputName : 86
              })}
              handleOnRemove={file => handleOnRemoveImage({
                ...file,
                inputName : 86
              })}
              handleOnChange={handleImageUploadChange}
              imageFileList={imageFileList}
              uploadBtnText="select image"
              uploadBtnIcon={<UploadOutlined />}
              customClassName="addProduct--imageUploader"
            />
          </Form.Item>

          <Row className="companyLogo">
            <Col span={24}>
              <Form.Item
                label={t(__('video Links'))}
                labelCol={{sm: 24}}
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

          <Form.Item
            name={['profile_fields', "87"]}
            label={t(__('Have you attended to any trade shows'))}
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
                    87: value ? "Y" : "N"
                  },
                });
              }}
            />
          </Form.Item>

          <Row>
            <Col span={24} className="mb-4 border border-bc rounded-5 formCloneable">
              <Form.Item
                name={['profile_fields', "88"]}
                label={t(__('Trade Show Name'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label={t(__('Date Attended'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input.Group compact>
                  <Form.Item
                    name={['profile_fields', "90"]}
                    className="w-30"
                  >
                    <DatePicker
                      picker="month"
                      className="w-100"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              <Form.Item
                name={['profile_fields', "91"]}
                label={t(__('Host Country/Region'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Select
                  placeholder={ t(__('select one country')) }
                  className="w-30"
                  optionLabelProp="label"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option?.children.props?.children[1]?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                  }
                >
                  {countryLists?.country_lists?.map((countryList) => {
                    return (
                      <Option key={ `country_lists_${ countryList?.code }` } value={countryList?.code} label={ countryList?.country }>
                        <div className="optionByIcon">
                          <i className={ `flag-icon flag-icon-${ countryList.code.toLowerCase() } vv-font-size-1-9` } />
                          { countryList?.country }
                        </div>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name={['profile_fields', "92"]}
                label={t(__('description'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <TextArea
                  placeholder={t(__('description'))}
                  showCount
                  maxLength={1024}
                  autoSize={{ minRows: 6, maxRows: 6 }}
                />
              </Form.Item>

              <Form.Item
                label={t(__('Trade Show Photo'))}
                valuePropName="fileList"
                labelCol={{sm: 24, lg: 6}}
                extra={t(__('Office Photos message'))}
              >
                <ImagesUploader
                  handleCustomRequest={options => handleUploadImage({
                    ...options,
                    inputName : 93
                  })}
                  handleOnRemove={file => handleOnRemoveImage({
                    ...file,
                    inputName : 93
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

        <Col span={24} id="stepChangeCurrent--content" className="stepChangeCurrent--content">
          <Space size="large">
            <Button onClick={() => handlePrevStep()}>
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

export default CompanyIntroductionForm;
