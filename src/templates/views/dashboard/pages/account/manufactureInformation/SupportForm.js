import { Col, Form, Input, Row, Select } from "antd";
import { __ } from "../../../../../../functions/Helper";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import ImageUploader from "../../../../../common/ImageUploader";

const SupportForm = (
  {
    handleUploadImage,
    countryLists
  }
) => {

  const { TextArea } = Input;
  const { Option } = Select;

  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t(__('personal photo'))}
        valuePropName="fileList"
        labelCol={{sm: 24, lg: 6}}
        extra={t(__('personal photo message'))}
      >
        <ImageUploader
          handleCustomRequest={options => handleUploadImage({
            ...options,
            inputName : 99,
            for_agent: true
          })}
          uploadBtnText="select image"
          uploadBtnIcon={<UploadOutlined />}
          customClassName="addProduct--imageUploader"
        />
      </Form.Item>

      <Form.Item
        name={['profile_fields', "104"]}
        label={t(__('full name'))}
        labelCol={{sm: 24, lg: 6}}
      >
        <Input
          allowClear
        />
      </Form.Item>

      <Form.Item
        name={['profile_fields', "100"]}
        label={t(__('telephone number'))}
        labelCol={{sm: 24, lg: 6}}
      >
        <Input
          allowClear
        />
      </Form.Item>

      <Form.Item
        name={['profile_fields', "107"]}
        label={t(__('whatsapp number'))}
        labelCol={{sm: 24, lg: 6}}
      >
        <Input
          allowClear
        />
      </Form.Item>

      <Form.Item
        name={['profile_fields', "101"]}
        label={t(__('address'))}
        labelCol={{sm: 24, lg: 6}}
      >
        <TextArea
          placeholder={t(__('address'))}
          showCount
          maxLength={1024}
          autoSize={{ minRows: 6, maxRows: 6 }}
        />
      </Form.Item>

      <Row>
        <Col sm={24} lg={{ span: 18, offset: 6 }}>
          <Form.Item>
            <Input.Group compact>
              <Form.Item
                name={['profile_fields', "102"]}
                className="w-30"
              >
                <Select
                  placeholder={ t(__('select one country')) }
                  className="w-100"
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
                name={['profile_fields', "103"]}
                className="w-30"
              >
                <Input
                  placeholder={t(__('province or state'))}
                  className="w-100"
                  allowClear
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default SupportForm;
