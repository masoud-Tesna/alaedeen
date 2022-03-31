import { Button, Col, Form, Input, Row, Select, Switch } from "antd";
import { __ } from "../../../../../../functions/Helper";
import { useTranslation } from "react-i18next";
import ImagesUploader from "../../../../../common/ImagesUploader";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";

const ManufacturingCapabilityForm = (
  {
    formRef,
    handleSubmitForm,
    handleUploadImage,
    handleOnRemoveImage,
    handleImageUploadChange,
    imageFileList,
    factorySize,
    qualityControlStaffs,
    researchesStaffs,
    units,
    totalTransactions,
    businessType
  }
) => {

  const { TextArea } = Input;
  const { Option } = Select;

  const { t } = useTranslation();

  const handleBeforeSubmitForm = () => {
    formRef.validateFields()
      .then(values => {
        values.section = "manufacturing_capability";
        handleSubmitForm(values);
      })
      .catch(errorInfo => {
        console.log(errorInfo)
      });
  }

  return (
    <Form
      className="h-100 manufactureInfo--formContent"
      name="manufacturingCapability-form"
      scrollToFirstError
      form={ formRef }
    >
      <Row className="manufactureInfoForm--manufacturingCapability" justify="center">
        <Col xs={ 24 } lg={ 22 } className="formItems--content">

          { // if user business type equal to trading get different information:
            businessType.includes("trading") ?
              <>

                <Form.Item
                  name={ [ 'profile_fields', "108" ] }
                  label={ t(__('do you cooperate with a factory')) }
                  labelCol={ { span: 24 } }
                  initialValue={ "Y" }
                  className="formSwitch"
                >
                  <Switch
                    checkedChildren={ t('yes') }
                    unCheckedChildren={ t('no') }
                    defaultChecked
                    className="formSwitch--switch"
                    onChange={ value => {
                      formRef?.setFieldsValue({
                        "profile_fields": {
                          108: value ? "Y" : "N"
                        },
                      });
                    } }
                  />
                </Form.Item>

                <Row>
                  <Col span={ 24 } className="mb-4 border border-bc rounded-5 formCloneable">
                    <Form.Item
                      name={ [ 'profile_fields', "109" ] }
                      label={ t(__('factory name')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      label={ t(__('cooperation contract')) }
                      valuePropName="fileList"
                      labelCol={ { sm: 24, lg: 6 } }
                      extra={t(__('cooperation contract message'))}
                    >
                      <ImagesUploader
                        handleCustomRequest={ options => handleUploadImage({
                          ...options,
                          inputName: 110
                        }) }
                        handleOnRemove={ file => handleOnRemoveImage({
                          ...file,
                          inputName: 110
                        }) }
                        handleOnChange={ handleImageUploadChange }
                        imageFileList={ imageFileList }
                        uploadBtnText="select image"
                        uploadBtnIcon={ <UploadOutlined/> }
                        customClassName="addProduct--imageUploader"
                      />
                    </Form.Item>

                    <Form.Item
                      name={['profile_fields', "111"]}
                      label={ t(__('years of cooperation')) }
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Select
                        placeholder={ t(__('years of cooperation')) }
                        className="w-30"
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >

                        {new Array(11).fill("", 1, 11).map((__, i) => {
                          return(
                            <Option key={`cooperation_year_${i}`} value={ i }>
                              { t("cooperation_year", { years: i }) }
                            </Option>
                          )
                        })}

                        <Option key={`cooperation_year_more_10`} value="> 10">
                          { t("cooperation_year", { years: "> 10" }) }
                        </Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={['profile_fields', "112"]}
                      label={ t(__('Total Transaction Amount with the Factory')) }
                      labelCol={{sm: 24, lg: 6}}
                    >
                      <Select
                        placeholder={ t(__('Total Transaction')) }
                        className="w-30"
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {totalTransactions.length && totalTransactions?.map(totalTransaction => {
                          return (
                            <Option
                              key={ `total_transaction_${ totalTransaction?.value_id }` }
                              value={ totalTransaction?.value_id }
                            >
                              { t(__(totalTransaction?.description)) }
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label={ t(__('Production Capacity')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Row gutter={[0, 10]}>
                        <Col span={24}>
                          <Row gutter={5}>
                            <Col span={8}>
                              <Form.Item
                                name={ [ 'profile_fields', "product_capacity", 0, "product" ] }
                                label={ t(__('Product')) }
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  allowClear
                                />
                              </Form.Item>
                            </Col>

                            <Col span={11}>
                              <Form.Item
                                name={ [ 'profile_fields', "product_capacity", 0, "product_volume" ] }
                                label={ t(__('Annual Production Volume')) }
                                labelCol={ { sm: 24, lg: 15 } }
                              >
                                <Input
                                  allowClear
                                />
                              </Form.Item>
                            </Col>

                            <Col span={5}>
                              <Form.Item
                                name={ [ 'profile_fields', "product_capacity", 0, "unit" ] }
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Select
                                  placeholder={ t(__('Select Unit Type')) }
                                  className="w-100"
                                  allowClear
                                  showSearch
                                  filterOption={ (input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  { units.length && units?.map(unit => {
                                    return (
                                      <Option
                                        key={ `units_${ unit?.value_id }` }
                                        value={ unit?.value_id }
                                      >
                                        { t(__(unit?.description)) }
                                      </Option>
                                    );
                                  }) }
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row gutter={5}>
                            <Col span={8}>
                              <Form.Item
                                name={ [ 'profile_fields', "product_capacity", 1, "product" ] }
                                label={ t(__('Product')) }
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  allowClear
                                />
                              </Form.Item>
                            </Col>

                            <Col span={11}>
                              <Form.Item
                                name={ [ 'profile_fields', "product_capacity", 1, "product_volume" ] }
                                label={ t(__('Annual Production Volume')) }
                                labelCol={ { sm: 24, lg: 15 } }
                              >
                                <Input
                                  allowClear
                                />
                              </Form.Item>
                            </Col>

                            <Col span={5}>
                              <Form.Item
                                name={ [ 'profile_fields', "product_capacity", 1, "unit" ] }
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Select
                                  placeholder={ t(__('Select Unit Type')) }
                                  className="w-100"
                                  allowClear
                                  showSearch
                                  filterOption={ (input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  { units.length && units?.map(unit => {
                                    return (
                                      <Option
                                        key={ `units_${ unit?.value_id }` }
                                        value={ unit?.value_id }
                                      >
                                        { t(__(unit?.description)) }
                                      </Option>
                                    );
                                  }) }
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>

                        <Col span={24}>
                          <Row gutter={5}>
                            <Col span={8}>
                              <Form.Item
                                name={ [ 'profile_fields', "product_capacity", 2, "product" ] }
                                label={ t(__('Product')) }
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Input
                                  allowClear
                                />
                              </Form.Item>
                            </Col>

                            <Col span={11}>
                              <Form.Item
                                name={ [ 'profile_fields', "product_capacity", 2, "product_volume" ] }
                                label={ t(__('Annual Production Volume')) }
                                labelCol={ { sm: 24, lg: 15 } }
                              >
                                <Input
                                  allowClear
                                />
                              </Form.Item>
                            </Col>

                            <Col span={5}>
                              <Form.Item
                                name={ [ 'profile_fields', "product_capacity", 2, "unit" ] }
                                labelCol={ { sm: 24, lg: 6 } }
                              >
                                <Select
                                  placeholder={ t(__('Select Unit Type')) }
                                  className="w-100"
                                  allowClear
                                  showSearch
                                  filterOption={ (input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                  }
                                >
                                  { units.length && units?.map(unit => {
                                    return (
                                      <Option
                                        key={ `units_${ unit?.value_id }` }
                                        value={ unit?.value_id }
                                      >
                                        { t(__(unit?.description)) }
                                      </Option>
                                    );
                                  }) }
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>

              </> :

              <>
                <Form.Item
                  name={ [ 'profile_fields', "10" ] }
                  label={ t(__('Whether to show production line')) }
                  labelCol={ { span: 24 } }
                  initialValue={ "Y" }
                  className="formSwitch"
                >
                  <Switch
                    checkedChildren={ t('yes') }
                    unCheckedChildren={ t('no') }
                    defaultChecked
                    className="formSwitch--switch"
                    onChange={ value => {
                      formRef?.setFieldsValue({
                        "profile_fields": {
                          10: value ? "Y" : "N"
                        },
                      });
                    } }
                  />
                </Form.Item>

                <Row>
                  <Col span={ 24 } className="mb-4 border border-bc rounded-5 formCloneable">
                    <Form.Item
                      name={ [ 'profile_fields', "11" ] }
                      label={ t(__('Process name')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      label={ t(__('Process pictures')) }
                      valuePropName="fileList"
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <ImagesUploader
                        handleCustomRequest={ options => handleUploadImage({
                          ...options,
                          inputName: 12
                        }) }
                        handleOnRemove={ file => handleOnRemoveImage({
                          ...file,
                          inputName: 12
                        }) }
                        handleOnChange={ handleImageUploadChange }
                        imageFileList={ imageFileList }
                        uploadBtnText="select image"
                        uploadBtnIcon={ <UploadOutlined/> }
                        customClassName="addProduct--imageUploader"
                      />
                    </Form.Item>

                    <Form.Item
                      name={ [ 'profile_fields', "13" ] }
                      label={ t(__('Process describe')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <TextArea
                        placeholder={ t(__('Process describe')) }
                        showCount
                        maxLength={ 1024 }
                        autoSize={ { minRows: 6, maxRows: 7 } }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={ [ 'profile_fields', "14" ] }
                  label={ t(__('Whether to show production equipment')) }
                  labelCol={ { span: 24 } }
                  initialValue={ "Y" }
                  className="formSwitch"
                >
                  <Switch
                    checkedChildren={ t('yes') }
                    unCheckedChildren={ t('no') }
                    defaultChecked
                    className="formSwitch--switch"
                    onChange={ value => {
                      formRef?.setFieldsValue({
                        "profile_fields": {
                          14: value ? "Y" : "N"
                        },
                      });
                    } }
                  />
                </Form.Item>

                <Row>
                  <Col span={ 24 } className="mb-4 border border-bc rounded-5 formCloneable">
                    <Form.Item
                      name={ [ 'profile_fields', "15" ] }
                      label={ t(__('Equipment Name')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={ [ 'profile_fields', "16" ] }
                      label={ t(__('Equipment Model')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={ [ 'profile_fields', "17" ] }
                      label={ t(__('Equipment quantity')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={ [ 'profile_fields', "18" ] }
                  label={ t(__('Whether to show production line')) }
                  labelCol={ { span: 24 } }
                  initialValue={ "Y" }
                  className="formSwitch"
                >
                  <Switch
                    checkedChildren={ t('yes') }
                    unCheckedChildren={ t('no') }
                    defaultChecked
                    className="formSwitch--switch"
                    onChange={ value => {
                      formRef?.setFieldsValue({
                        "profile_fields": {
                          18: value ? "Y" : "N"
                        },
                      });
                    } }
                  />
                </Form.Item>

                <Row>
                  <Col span={ 24 } className="mb-4 border border-bc rounded-5 formCloneable">
                    <Form.Item
                      name={ [ 'profile_fields', "19" ] }
                      label={ t(__('Production Line nameEquipment Name')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={ [ 'profile_fields', "20" ] }
                      label={ t(__('Supervisor Number')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={ [ 'profile_fields', "21" ] }
                      label={ t(__('Number of Operators')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      name={ [ 'profile_fields', "22" ] }
                      label={ t(__('QC/QA Number')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name={ [ 'profile_fields', "23" ] }
                  label={ t(__('Factory Location')) }
                  labelCol={ { sm: 24, lg: 6 } }
                >
                  <Input
                    allowClear
                  />
                </Form.Item>

                <Form.Item
                  name={ [ 'profile_fields', "24" ] }
                  label={ t(__('Factory Size')) }
                  labelCol={ { sm: 24, lg: 6 } }
                >
                  <Select
                    placeholder={ t(__('Factory Size')) }
                    className="w-30"
                    allowClear
                    showSearch
                    filterOption={ (input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    { factorySize.length && factorySize?.map(item => {
                      return (
                        <Option
                          key={ `office_size_${ item?.value_id }` }
                          value={ item?.value_id }
                        >
                          { t(__(item?.description)) }
                        </Option>
                      );
                    }) }
                  </Select>
                </Form.Item>

                <Form.Item
                  name={ [ 'profile_fields', "25" ] }
                  label={ t(__('No. of QC Staff')) }
                  labelCol={ { sm: 24, lg: 6 } }
                >
                  <Select
                    placeholder={ t(__('No. of QC Staff')) }
                    className="w-30"
                    allowClear
                    showSearch
                    filterOption={ (input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    { qualityControlStaffs.length && qualityControlStaffs?.map(qualityControlStaff => {
                      return (
                        <Option
                          key={ `qualityControlStaffs_${ qualityControlStaff?.value_id }` }
                          value={ qualityControlStaff?.value_id }
                        >
                          { t(__(qualityControlStaff?.description)) }
                        </Option>
                      );
                    }) }
                  </Select>
                </Form.Item>

                <Form.Item
                  name={ [ 'profile_fields', "26" ] }
                  label={ t(__('No. of R & D Staff')) }
                  labelCol={ { sm: 24, lg: 6 } }
                >
                  <Select
                    placeholder={ t(__('No. of R & D Staff')) }
                    className="w-30"
                    allowClear
                    showSearch
                    filterOption={ (input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    { researchesStaffs.length && researchesStaffs?.map(researchesStaff => {
                      return (
                        <Option
                          key={ `researchesStaffs_${ researchesStaff?.value_id }` }
                          value={ researchesStaff?.value_id }
                        >
                          { t(__(researchesStaff?.description)) }
                        </Option>
                      );
                    }) }
                  </Select>
                </Form.Item>

                <Form.Item
                  name={ [ 'profile_fields', "27" ] }
                  label={ t(__('No. of Production Lines')) }
                  labelCol={ { sm: 24, lg: 6 } }
                >
                  <Select
                    placeholder={ t(__('No. of Production Lines')) }
                    className="w-30"
                    allowClear
                    showSearch
                    filterOption={ (input, option) =>
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
                  name={ [ 'profile_fields', "28" ] }
                  label={ t(__('Add information about your annual production capacity')) }
                  labelCol={ { span: 24 } }
                  initialValue={ "Y" }
                  className="formSwitch"
                >
                  <Switch
                    checkedChildren={ t('yes') }
                    unCheckedChildren={ t('no') }
                    defaultChecked
                    className="formSwitch--switch"
                    onChange={ value => {
                      formRef?.setFieldsValue({
                        "profile_fields": {
                          28: value ? "Y" : "N"
                        },
                      });
                    } }
                  />
                </Form.Item>

                <Row>
                  <Col span={ 24 } className="mb-4 border border-bc rounded-5 formCloneable">
                    <Form.Item
                      name={ [ 'profile_fields', "29" ] }
                      label={ t(__('Production Name')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item
                      label={ t(__('Units Produced (Previous Year)')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input.Group compact>
                        <Form.Item
                          name={ [ 'profile_fields', "30" ] }
                          className="w-40"
                        >
                          <Input
                            allowClear
                          />
                        </Form.Item>

                        <Form.Item
                          name={ [ 'profile_fields', "31" ] }
                          className="w-30"
                        >
                          <Select
                            placeholder={ t(__('Select Unit Type')) }
                            className="w-100"
                            allowClear
                            showSearch
                            filterOption={ (input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            { units.length && units?.map(unit => {
                              return (
                                <Option
                                  key={ `units_${ unit?.value_id }` }
                                  value={ unit?.value_id }
                                >
                                  { t(__(unit?.description)) }
                                </Option>
                              );
                            }) }
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>

                    <Form.Item
                      label={ t(__('Highest Ever Annual Output')) }
                      labelCol={ { sm: 24, lg: 6 } }
                    >
                      <Input.Group compact>
                        <Form.Item
                          name={ [ 'profile_fields', "32" ] }
                          className="w-40"
                        >
                          <Input
                            allowClear
                          />
                        </Form.Item>

                        <Form.Item
                          name={ [ 'profile_fields', "33" ] }
                          className="w-30"
                        >
                          <Select
                            placeholder={ t(__('Select Unit Type')) }
                            className="w-100"
                            allowClear
                            showSearch
                            filterOption={ (input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            { units.length && units?.map(unit => {
                              return (
                                <Option
                                  key={ `units_${ unit?.value_id }` }
                                  value={ unit?.value_id }
                                >
                                  { t(__(unit?.description)) }
                                </Option>
                              );
                            }) }
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </>
          }

        </Col>

        <Col span={ 24 } className="stepChangeCurrent--content">
          <Button type="primary" onClick={ () => handleBeforeSubmitForm() }>
            { t('submit_and_next') }
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ManufacturingCapabilityForm;
