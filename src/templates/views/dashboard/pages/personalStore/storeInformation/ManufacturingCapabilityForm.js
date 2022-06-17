import { Button, Col, Form, Input, Row, Select, Switch } from "antd";
import { __ } from "../../../../../../utilities/functions/Helper";
import { useTranslation } from "react-i18next";
import ImagesUploader from "../../../../../common/ImagesUploader";
import { UploadOutlined } from "@ant-design/icons";

const ManufacturingCapabilityForm = (
  {
    formRef,
    handleSubmitForm,
    handleUploadImage,
    handleOnRemoveImage,
    handleImageUploadChange,
    imageFileList,
    qualityControlStaffs,
    researchesStaffs,
    units,
    totalTransactions,
    businessType
  }
) => {
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
            (businessType?.length === 1 && businessType?.includes("trading")) ?
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

                <Row className="formCloneable">
                  <Col span={ 24 } className="mb-4 border border-bc rounded-5">
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

                        {Array.from({ length: 10 })?.map((_, i) => {
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
                {businessType.includes("trading") &&
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

                    <Row className="formCloneable">
                      <Col span={ 24 } className="mb-4 border border-bc rounded-5">
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

                            {Array.from({ length: 10 })?.map((_, i) => {
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

                  </>
                }

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

                <Row className="formCloneable">
                  <Col span={ 24 } className="mb-4 border border-bc rounded-5">
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

                <Row className="formCloneable">
                  <Col span={ 24 } className="mb-4 border border-bc rounded-5">
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
