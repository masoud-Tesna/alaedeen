import { __ } from "../../../../../functions/Helper";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

const ProductAssignFeatures = ({category_id}) => {

  const { TextArea } = Input;

  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        name="page_title"
        label={t('page_title')}
        labelCol={{sm: 24, lg: 4}}
        tooltip={t(__('page title tooltip message'))}
      >
        <TextArea
          showCount
          maxLength={60}
          autoSize
        />
      </Form.Item>
    </>
  );
};

export default ProductAssignFeatures;
