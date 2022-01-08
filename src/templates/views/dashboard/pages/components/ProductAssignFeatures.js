import { __ } from "../../../../../functions/Helper";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useGetApi } from "../../../../../functions";

const ProductAssignFeatures = ({category_id}) => {

  const { TextArea } = Input;

  const { t } = useTranslation();

  // get Feature list from API:
  /*const { isLoading: featuresIsLoading, data: featuresData } = useGetApi(`feature-list-api`, `category_id=${category_id}`, `features_${category_id}`, { enabled: !!category_id });*/

  const { isLoading: featuresIsLoading, data: featuresData } = useGetApi(`feature-list-api`, `category_id=942`, `features_${category_id}`);
  const { features } = featuresData || [];

  console.log(features)

  return (
    featuresIsLoading ?
      <>IsLoading...</> :
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
