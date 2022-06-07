import { Form, Input} from "antd";
import { __ } from "../../../../../../utilities/functions/Helper";
import { useTranslation } from "react-i18next";

const CompanyDetailsForm = () => {

  const { TextArea } = Input;

  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
};

export default CompanyDetailsForm;
