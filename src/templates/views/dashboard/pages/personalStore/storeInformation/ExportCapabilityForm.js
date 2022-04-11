import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Button
} from "antd";
import { __ } from "../../../../../../functions/Helper";
import { useTranslation } from "react-i18next";
import ImagesUploader from "../../../../../common/ImagesUploader";
import { UploadOutlined } from "@ant-design/icons";

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
    duties
  }
) => {

  const { TextArea } = Input;
  const { Option } = Select;

  const { t } = useTranslation();

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
          <Form.Item
            name={['profile_fields', "96"]}
            label={t(__('Exports Description'))}
            extra={t(__('Please briefly describe your export history'))}
            labelCol={{sm: 24, lg: 6}}
            className="textAreaByExtraText"
          >
            <TextArea
              placeholder={t(__('Exports Description'))}
              showCount
              maxLength={1024}
              autoSize={{ minRows: 6, maxRows: 7 }}
            />
          </Form.Item>

          <Form.Item
            label={t(__('Export rate'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <Input.Group compact>
              <Form.Item
                name={['profile_fields', "95"]}
                className="w-30"
              >
                <InputNumber
                  className="w-100"
                  allowClear
                  step="0.0"
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                name={['profile_fields', "46"]}
                className="w-30"
              >
                <Select
                  placeholder={ t(__('Export Percentage')) }
                  className="w-100"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option
                    value="%1 - %10"
                  >
                    %1 - %10
                  </Option>

                  <Option
                    value="%11 - %20"
                  >
                    %11 - %20
                  </Option>

                  <Option
                    value="%21 - %30"
                  >
                    %21 - %30
                  </Option>

                  <Option
                    value="%31 - %40"
                  >
                    %31 - %40
                  </Option>

                  <Option
                    value="%41 - %50"
                  >
                    %41 - %50
                  </Option>

                  <Option
                    value="%51 - %60"
                  >
                    %51 - %60
                  </Option>

                  <Option
                    value="%61 - %70"
                  >
                    %61 - %70
                  </Option>

                  <Option
                    value="%71 - %80"
                  >
                    %71 - %80
                  </Option>

                  <Option
                    value="%81 - %90"
                  >
                    %81 - %90
                  </Option>

                  <Option
                    value="%91 - 1%00"
                  >
                    %91 - 1%00
                  </Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Row>

            <Col sm={24} lg={ { span: 18, offset: 6 }} className="exportRate--content">
              <Form.Item>
                <Row className="row-cols-1 row-cols-lg-2" gutter={[ { sm: 0, lg: 80 }, 0]}>
                  <Col>
                    <Form.Item
                      name={['profile_fields', "country_percent", "IQ"]}
                    >
                      <Input
                        addonAfter={`% ${t('Iraq')}`}
                        defaultValue={0}
                        allowClear
                        onFocus={e => e.target.select()}
                      />
                    </Form.Item>
                  </Col>

                  <Col>
                    <Form.Item
                      name={['profile_fields', "country_percent", "SY"]}
                    >
                      <Input
                        addonAfter={`% ${t('Syria')}`}
                        defaultValue={0}
                        allowClear
                        onFocus={e => e.target.select()}
                      />
                    </Form.Item>
                  </Col>

                  <Col>
                    <Form.Item
                      name={['profile_fields', "country_percent", "AF"]}
                    >
                      <Input
                        addonAfter={`% ${t('Afghanistan')}`}
                        defaultValue={0}
                        allowClear
                        onFocus={e => e.target.select()}
                      />
                    </Form.Item>
                  </Col>

                  <Col>
                    <Form.Item
                      name={['profile_fields', "country_percent", "TJ"]}
                    >
                      <Input
                        addonAfter={`% ${t('Tajikistan')}`}
                        defaultValue={0}
                        allowClear
                        onFocus={e => e.target.select()}
                      />
                    </Form.Item>
                  </Col>

                  <Col>
                    <Form.Item
                      name={['profile_fields', "country_percent", "AM"]}
                    >
                      <Input
                        addonAfter={`% ${t('Armenia')}`}
                        defaultValue={0}
                        allowClear
                        onFocus={e => e.target.select()}
                      />
                    </Form.Item>
                  </Col>

                  <Col>
                    <Form.Item
                      name={['profile_fields', "country_percent", "AZ"]}
                    >
                      <Input
                        addonAfter={`% ${t('Azerbaijan')}`}
                        defaultValue={0}
                        allowClear
                        onFocus={e => e.target.select()}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name={['profile_fields', "48"]}
            label={t(__('Year when your company started exporting'))}
            labelCol={{sm: 24, lg: 6}}
          >
            <DatePicker
              picker="year"
              className="w-30"
              placeholder={t("year")}
            />
          </Form.Item>

          <Form.Item
            name={['profile_fields', "49"]}
            label={t(__('Whether add customer case'))}
            labelCol={{span: 24}}
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
                    49: value ? "Y" : "N"
                  },
                });
              }}
            />
          </Form.Item>

          <Row className="formCloneable">
            <Col span={24} className="mb-4 border border-bc rounded-5">
              <Form.Item
                name={['profile_fields', "50"]}
                label={t(__('Project/customer name'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name={['profile_fields', "51"]}
                label={t(__('Customer’s Country/Region'))}
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
                          <i className={ `fi fi-${ countryList.code.toLowerCase() } vv-font-size-1-9` } />
                          { countryList?.country }
                        </div>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name={['profile_fields', "52"]}
                label={t(__('Products You Supply To Customer'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name={['profile_fields', "53"]}
                label={t(__('Annual Turnover'))}
                labelCol={{sm: 24, lg: 5}}
              >
                <InputNumber
                  className="w-30"
                  step="0.0"
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>

              <Form.Item
                label={t(__('Cooperation photos'))}
                valuePropName="fileList"
                labelCol={{sm: 24, lg: 6}}
                extra={t(__('Process pictures message'))}
              >
                <ImagesUploader
                  handleCustomRequest={options => handleUploadImage({
                    ...options,
                    inputName : 54
                  })}
                  handleOnRemove={file => handleOnRemoveImage({
                    ...file,
                    inputName : 54
                  })}
                  handleOnChange={handleImageUploadChange}
                  imageFileList={imageFileList}
                  uploadBtnText="select image"
                  uploadBtnIcon={<UploadOutlined />}
                  customClassName="addProduct--imageUploader"
                />
              </Form.Item>

              <Form.Item
                label={t(__('Transaction Documents'))}
                valuePropName="fileList"
                labelCol={{sm: 24, lg: 6}}
                extra={t(__('Transaction Documents message'))}
              >
                <ImagesUploader
                  handleCustomRequest={options => handleUploadImage({
                    ...options,
                    inputName : 55
                  })}
                  handleOnRemove={file => handleOnRemoveImage({
                    ...file,
                    inputName : 55
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
            name={['profile_fields', "56"]}
            label={t(__('Average Lead Time'))}
            extra={t(__('Average Lead Time message'))}
            labelCol={{sm: 24, lg: 6}}
            className="averageLead--content"
          >
            <Input
              addonAfter={t('day')}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name={['profile_fields', "57"]}
            label={t(__('does your company have an overseas office'))}
            labelCol={{span: 24}}
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
                    57: value ? "Y" : "N"
                  },
                });
              }}
            />
          </Form.Item>

          <Row className="formCloneable">
            <Col span={24} className="mb-4 border border-bc rounded-5">
              <Form.Item
                name={['profile_fields', "58"]}
                label={t(__('Country/Region'))}
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
                          <i className={ `fi fi-${ countryList.code.toLowerCase() } vv-font-size-1-9` } />
                          { countryList?.country }
                        </div>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name={['profile_fields', "59"]}
                label={t(__('Province/State'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name={['profile_fields', "60"]}
                label={t(__('city'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name={['profile_fields', "61"]}
                label={t(__('Street Address'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                label={t(__('phone number'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input.Group compact>
                  <Form.Item
                    name={['profile_fields', "62"]}
                    className="w-30"
                  >
                    <Select
                      placeholder={ t(__('Select country code')) }
                      className="w-100"
                      allowClear
                      showSearch
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {countryCodes.length && countryCodes?.map((countryCode, i) => {
                        return (
                          <Option
                            key={ `countryCode_${ i }` }
                            value={ countryCode?.code_number }
                          >
                            { `${countryCode?.country} ${countryCode?.code_number}` }
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name={['profile_fields', "64"]}
                    className="w-40"
                  >
                    <Input
                      allowClear
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              <Form.Item
                name={['profile_fields', "65"]}
                label={ t(__('Duties')) }
                labelCol={{sm: 24, lg: 6}}
              >
                <Select
                  placeholder={ t(__('Duties')) }
                  className="w-30"
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {duties.length && duties?.map(duty => {
                    return (
                      <Option
                        key={ `Duties_${ duty?.value_id }` }
                        value={ duty?.value_id }
                      >
                        { t(__(duty?.description)) }
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name={['profile_fields', "66"]}
                label={t(__('person-in-charge'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <Input
                  allowClear
                />
              </Form.Item>

              <Form.Item
                name={['profile_fields', "67"]}
                label={t(__('Number of Staff'))}
                labelCol={{sm: 24, lg: 6}}
              >
                <InputNumber
                  allowClear
                  className="w-30"
                />
              </Form.Item>

              <Form.Item
                label={t(__('Office Photos'))}
                valuePropName="fileList"
                labelCol={{sm: 24, lg: 6}}
                extra={t(__('Process pictures message'))}
              >
                <ImagesUploader
                  handleCustomRequest={options => handleUploadImage({
                    ...options,
                    inputName : 68
                  })}
                  handleOnRemove={file => handleOnRemoveImage({
                    ...file,
                    inputName : 68
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
          <Button type="primary" onClick={() => handleBeforeSubmitForm()}>
            { t('submit_and_next') }
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ExportCapabilityForm;
