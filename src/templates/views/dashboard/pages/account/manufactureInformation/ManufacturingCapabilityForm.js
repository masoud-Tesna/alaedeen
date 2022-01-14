import { Col, Form, Input, Row, Select, Switch } from "antd";
import { __ } from "../../../../../../functions/Helper";
import { useTranslation } from "react-i18next";
import ImagesUploader from "../../../../../common/ImagesUploader";
import { UploadOutlined } from "@ant-design/icons";

const ManufacturingCapabilityForm = (
  {
    formRef,
    handleUploadImage,
    handleOnRemoveImage,
    handleImageUploadChange,
    imageFileList,
    factorySize,
    qualityControlStaffs,
    researchesStaffs,
    units
  }
) => {

  const { TextArea } = Input;
  const { Option } = Select;

  const { t } = useTranslation();

  return (
    <Form
      className="h-100 manufactureInfo--formContent"
      name="manufacturingCapability-form"
      onFinish={values => console.log(values)}
      scrollToFirstError
      form={formRef}
    >
      <Row className="manufactureInfoForm--manufacturingCapability" justify="center">
        <Col xs={24} lg={22}>
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
                formRef?.setFieldsValue({
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
                    frmRef: formRef
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
                formRef?.setFieldsValue({
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
                formRef?.setFieldsValue({
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
                formRef?.setFieldsValue({
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
                      className="w-100"
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
                      className="w-100"
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
  );
};

export default ManufacturingCapabilityForm;
