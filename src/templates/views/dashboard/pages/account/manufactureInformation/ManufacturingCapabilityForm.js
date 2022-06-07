import { Col, Form, Input, Row, Select, Switch } from "antd";
import { __ } from "../../../../../../utilities/functions/Helper";
import { useTranslation } from "react-i18next";
import ImagesUploader from "../../../../../common/ImagesUploader";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";

const ManufacturingCapabilityForm = (
  {
    formRef,
    handleUploadImage,
    handleOnRemoveImage,
    handleImageUploadChange,
    imageFileList,
    factorySize,
    units,
    businessType
  }
) => {

  const { TextArea } = Input;
  const { Option } = Select;

  const { t } = useTranslation();

  return (
    // if user business type equal to trading get different information:
    (businessType?.length === 1 && businessType?.includes("trading")) ?
      <Form.Item
        name={ [ 'profile_fields', "109" ] }
        label={ t(__('factory name')) }
        labelCol={ { sm: 24, lg: 6 } }
      >
        <Input
          allowClear
        />
      </Form.Item> :

      <>

        {businessType.includes("trading") &&
          <Form.Item
            name={ [ 'profile_fields', "109" ] }
            label={ t(__('factory name')) }
            labelCol={ { sm: 24, lg: 6 } }
          >
            <Input
              allowClear
            />
          </Form.Item>
        }

        <Form.Item
          name={ [ 'profile_fields', "10" ] }
          label={ t(__('Do you show the production process')) }
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

        <Row className="formCloneable">
          <Col span={ 24 } className="mb-4 border border-bc rounded-5">
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

        <Row className="formCloneable">
          <Col span={ 24 } className="mb-4 border border-bc rounded-5">
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
  );
};

export default ManufacturingCapabilityForm;
