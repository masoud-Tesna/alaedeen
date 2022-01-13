import { useEffect, useRef, useState } from "react";

import "./styles/ManufactureInformation.less";

import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Steps, Switch } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useGetConfig } from "../../../../../contexts/config/ConfigContext";
import { useGetApi, useWindowSize } from "../../../../../functions";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../functions/Helper";
import ImagesUploader from "../../../../common/ImagesUploader";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ManufactureInformation = () => {

  const { Step } = Steps;
  const { TextArea } = Input;
  const { Option } = Select;

  // get initial config:
  const { config } = useGetConfig();

  // get window width
  const { width } = useWindowSize();

  const { t } = useTranslation();

  // use ref for add product form:
  const [companyDetailsFrm] = Form.useForm();
  const [manufacturingCapabilityFrm] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(1);

  // save image name in array state:
  const [imageFileList, setImageFileList] = useState({});

  const stepsHandleOnChange = current => {
    setCurrentStep(current);
  }

  // get data from API:
  const {data: officeSizesData} = useGetApi("get-profile-field-value-api", "field_id=8", "officeSizes");
  const officeSizes = officeSizesData || [];

  const {data: employeesData} = useGetApi("get-profile-field-value-api", "field_id=5", "employees");
  const employees = employeesData || [];

  const {data: factorySizeData} = useGetApi("get-profile-field-value-api", "field_id=24", "factorySize");
  const factorySize = factorySizeData || [];

  const {data: qualityControlStaffsData} = useGetApi("get-profile-field-value-api", "field_id=25", "qualityControlStaffs");
  const qualityControlStaffs = qualityControlStaffsData || [];

  const {data: researchesStaffsData} = useGetApi("get-profile-field-value-api", "field_id=26", "researchesStaffs");
  const researchesStaffs = researchesStaffsData || [];

  const {data: unitsData} = useGetApi("get-profile-field-value-api", "field_id=31", "units");
  const units = unitsData || [];

  // function for upload images:
  const handleUploadImage = async options => {
    const { onSuccess, onError, file, onProgress, inputName, frmRef } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("file", file);
    try {
      const res = await axios.post(
        "https://alaedeen.com/horn/upload-image-api",
        fmData,
        config
      );

      const profileFields = frmRef.getFieldValue('profile_fields');

      let prevImages = {0: []};

      if (profileFields) {
        if (profileFields[inputName]) {
          prevImages = profileFields[inputName];
        }
      }

      frmRef?.setFieldsValue({
        "profile_fields": {
          [inputName]: {
            0: [...prevImages[0], res.data]
          }
        },
      });

      console.log(profileFields)

      onSuccess("Ok");
      //console.log("server res: ", res);
    } catch (err) {
      //console.log("Error: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  // function for handle image upload change:
  const handleImageUploadChange = ({ fileList }) => setImageFileList({ fileList });

  // function for remove image:
  const handleOnRemoveImage = file => {
    console.log(file);
  }

  const stepContent = step => {
    switch (step) {
      case 0:
        return(
          <Form
            className="h-100 manufactureInfo--formContent"
            name="add-product-form"
            onFinish={values => console.log(values)}
            scrollToFirstError
            translate="no"
            form={companyDetailsFrm}
          >
            <Row className="manufactureInfoForm--companyDetails" justify="center">
              <Col xs={24} lg={21}>
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
            </Row>
          </Form>
        )

      case 1:
        return(
          <Form
            className="h-100 manufactureInfo--formContent"
            name="add-product-form"
            onFinish={values => console.log(values)}
            scrollToFirstError
            form={manufacturingCapabilityFrm}
          >
            <Row className="manufactureInfoForm--companyDetails" justify="center">
              <Col xs={24} lg={21}>
                <Form.Item
                  name={['profile_fields', "10"]}
                  label={t(__('Whether to show production line'))}
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
                      manufacturingCapabilityFrm?.setFieldsValue({
                        "profile_fields": {
                          10: value ? "Y" : "N"
                        },
                      });
                    }}
                  />
                </Form.Item>

                <Row>
                  <Col span={24} className="mb-4 border border-bc rounded-5 formCloneable">
                    <Form.Item
                      name={['profile_fields', "11", 0]}
                      label={t(__('Process name'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={["profile_fields", "12", 0]}
                      label="Process pictures"
                      valuePropName="fileList"
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input hidden/>

                      <ImagesUploader
                        handleCustomRequest={options => handleUploadImage({
                          ...options,
                          inputName : 12,
                          frmRef: manufacturingCapabilityFrm
                        })}
                        handleOnRemove={handleOnRemoveImage}
                        handleOnChange={handleImageUploadChange}
                        imageFileList={imageFileList}
                        uploadBtnText="select image"
                        uploadBtnIcon={<UploadOutlined />}
                        customClassName="addProduct--imageUploader"
                      />
                    </Form.Item>

                    <Form.Item
                      name={['profile_fields', "13", 0]}
                      label={t(__('Process describe'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <TextArea
                        placeholder={t(__('Process describe'))}
                        showCount
                        maxLength={1024}
                        autoSize={{ minRows: 6, maxRows: 7 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={['profile_fields', "14"]}
                  label={t(__('Whether to show production equipment'))}
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
                      manufacturingCapabilityFrm?.setFieldsValue({
                        "profile_fields": {
                          14: value ? "Y" : "N"
                        },
                      });
                    }}
                  />
                </Form.Item>

                <Row>
                  <Col span={24} className="mb-4 border border-bc rounded-5 formCloneable">
                    <Form.Item
                      name={['profile_fields', "15", 0]}
                      label={t(__('Equipment Name'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={['profile_fields', "16", 0]}
                      label={t(__('Equipment Model'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={['profile_fields', "17", 0]}
                      label={t(__('Equipment quantity'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={['profile_fields', "18"]}
                  label={t(__('Whether to show production line'))}
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
                      manufacturingCapabilityFrm?.setFieldsValue({
                        "profile_fields": {
                          18: value ? "Y" : "N"
                        },
                      });
                    }}
                  />
                </Form.Item>

                <Row>
                  <Col span={24} className="mb-4 border border-bc rounded-5 formCloneable">
                    <Form.Item
                      name={['profile_fields', "19", 0]}
                      label={t(__('Production Line nameEquipment Name'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={['profile_fields', "20", 0]}
                      label={t(__('Supervisor Number'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={['profile_fields', "21", 0]}
                      label={t(__('Number of Operators'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={['profile_fields', "22", 0]}
                      label={t(__('QC/QA Number'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={['profile_fields', "23", 0]}
                  label={t(__('Factory Location'))}
                  labelCol={{sm: 24, lg: 6}}
                >
                  <Input
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name={['profile_fields', "24"]}
                  label={ t(__('Factory Size')) }
                  labelCol={{sm: 24, lg: 6}}
                >
                  <Select
                    placeholder={ t(__('Factory Size')) }
                    className="w-30"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {factorySize.length && factorySize?.map(item => {
                      return (
                        <Option
                          key={ `office_size_${ item?.value_id }` }
                          value={ item?.value_id }
                        >
                          { t(__(item?.description)) }
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name={['profile_fields', "25"]}
                  label={ t(__('No. of QC Staff')) }
                  labelCol={{sm: 24, lg: 6}}
                >
                  <Select
                    placeholder={ t(__('No. of QC Staff')) }
                    className="w-30"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {qualityControlStaffs.length && qualityControlStaffs?.map(qualityControlStaff => {
                      return (
                        <Option
                          key={ `office_size_${ qualityControlStaff?.value_id }` }
                          value={ qualityControlStaff?.value_id }
                        >
                          { t(__(qualityControlStaff?.description)) }
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name={['profile_fields', "26"]}
                  label={ t(__('No. of R & D Staff')) }
                  labelCol={{sm: 24, lg: 6}}
                >
                  <Select
                    placeholder={ t(__('No. of R & D Staff')) }
                    className="w-30"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {researchesStaffs.length && researchesStaffs?.map(researchesStaff => {
                      return (
                        <Option
                          key={ `office_size_${ researchesStaff?.value_id }` }
                          value={ researchesStaff?.value_id }
                        >
                          { t(__(researchesStaff?.description)) }
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name={['profile_fields', "27"]}
                  label={ t(__('No. of Production Lines')) }
                  labelCol={{sm: 24, lg: 6}}
                >
                  <Select
                    placeholder={ t(__('No. of Production Lines')) }
                    className="w-30"
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option
                      value="1"
                    >
                      1
                    </Option>

                    <Option
                      value="2"
                    >
                      2
                    </Option>

                    <Option
                      value="3"
                    >
                      3
                    </Option>

                    <Option
                      value="4"
                    >
                      4
                    </Option>

                    <Option
                      value="5"
                    >
                      5
                    </Option>

                    <Option
                      value="6"
                    >
                      6
                    </Option>

                    <Option
                      value="7"
                    >
                      7
                    </Option>

                    <Option
                      value="8"
                    >
                      8
                    </Option>

                    <Option
                      value="9"
                    >
                      9
                    </Option>

                    <Option
                      value="10"
                    >
                      10
                    </Option>

                    <Option
                      value="above 10"
                    >
                      { t('above_10') }
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name={['profile_fields', "28"]}
                  label={t(__('Add information about your annual production capacity'))}
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
                      manufacturingCapabilityFrm?.setFieldsValue({
                        "profile_fields": {
                          28: value ? "Y" : "N"
                        },
                      });
                    }}
                  />
                </Form.Item>

                <Row>
                  <Col span={24} className="mb-4 border border-bc rounded-5 formCloneable">
                    <Form.Item
                      name={['profile_fields', "29", 0]}
                      label={t(__('Production Name'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      label={t(__('Units Produced (Previous Year)'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name={['profile_fields', "30", 0]}
                          className="w-40"
                        >
                          <Input
                            allowClear
                          />
                        </Form.Item>

                        <Form.Item
                          name={['profile_fields', "31", 0]}
                          className="w-30"
                        >
                          <Select
                            placeholder={ t(__('Select Unit Type')) }
                            className="w-10"
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {units.length && units?.map(unit => {
                              return (
                                <Option
                                  key={ `office_size_${ unit?.value_id }` }
                                  value={ unit?.value_id }
                                >
                                  { t(__(unit?.description)) }
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>

                    <Form.Item
                      label={t(__('Highest Ever Annual Output'))}
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Input.Group compact>
                        <Form.Item
                          name={['profile_fields', "32", 0]}
                          className="w-40"
                        >
                          <Input
                            allowClear
                          />
                        </Form.Item>

                        <Form.Item
                          name={['profile_fields', "33", 0]}
                          className="w-30"
                        >
                          <Select
                            placeholder={ t(__('Select Unit Type')) }
                            className="w-10"
                            allowClear
                            showSearch
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {units.length && units?.map(unit => {
                              return (
                                <Option
                                  key={ `office_size_${ unit?.value_id }` }
                                  value={ unit?.value_id }
                                >
                                  { t(__(unit?.description)) }
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>

              </Col>
            </Row>
          </Form>
        )
    }
  }

  useEffect(() => {

    let stepCaption = document.getElementById("manufactureInfo--Step__caption") && document.getElementById("manufactureInfo--Step__caption");

    const stepContent = document.getElementById("manufactureInfo--Step__content") && document.getElementById("manufactureInfo--Step__content");

    let stepContentWidth;

    if (stepCaption && stepContent) {
      const {width} = stepContent.getBoundingClientRect();
      stepContentWidth = width;
    }

    if (stepContentWidth) {
      document.getElementById("manufactureInfo--Step__caption").style.width = `calc(${stepContentWidth}px + 45px)`;
    }

  }, [width])

  return (
    <Row>
      <Col span={24}>
        <DashboardContentHeader page={"Manufacturing Information"} />
      </Col>

      <Col id="manufactureInfo--content" span={24} className="manufactureInfo--content">
        <Row>
          <Col id="manufactureInfo--Step__caption" span={24} className="manufactureInfo--Step__caption">
            <Steps
              current={currentStep}
              progressDot
              onChange={stepsHandleOnChange}
            >
              <Step key="company_details"  description={ t(__('Basic Company Details')) } />

              <Step key="manufacturing_capability" description={ t(__('Manufacturing Capability')) } />

              <Step key="export_capability" description={ t(__('Export Capability')) } />

              <Step key="certificates" description={ t(__('certificates')) } />

              <Step key="company_introduction" description={ t(__('Company Introduction')) } />

              <Step key="Support" description={ t(__('Support')) } />
            </Steps>
          </Col>

          <Col id="manufactureInfo--Step__content" span={24} className="manufactureInfo--Step__content">

            {stepContent(currentStep)}

          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ManufactureInformation;
