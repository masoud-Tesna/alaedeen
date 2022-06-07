import { Checkbox, Col, Form, Input, InputNumber, Row, Select, Skeleton, Typography } from "antd";
import { useGetApiOld } from "../../../../../utilities/functions";

//import feature type const:
import {
  PrdFeatures_GROUP,
  PrdFeatures_SINGLE_CHECKBOX,
  PrdFeatures_MULTIPLE_CHECKBOX,
  PrdFeatures_NUMBER_FIELD,
  PrdFeatures_TEXT_FIELD,
  PrdFeatures_SELECTABLE
} from "../../../../common/FeatureTypeConst";
import ShowResponsiveImage from "../../../../common/ShowResponsiveImage";
import { useTranslation } from "react-i18next";

const ProductAssignFeatures = (
  {
    category_id,
    featuresData = {},
    formRef
  }
) => {

  const { Option } = Select;
  const { Title } = Typography;

  const { t } = useTranslation();

  // get Feature list from API:
  const { isLoading: featuresIsLoading, data } = useGetApiOld(
    `feature-list-api`,
    `category_id=${category_id}`,
    `features_${category_id}`,
    {
      enabled: !!category_id,
      refetchOnWindowFocus: false
    }
  );

  const { features } = data || [];


  //console.log(formRef.getFieldsValue())

  const featureItem = feature => {

    switch (feature?.feature_type) {
      case PrdFeatures_TEXT_FIELD :
        return(
          <Form.Item
            key={feature?.feature_id}
            name={['product_features', feature?.feature_id]}
            label={feature?.description}
            labelCol={{sm: 24, lg: 5}}
            initialValue={featuresData[feature?.feature_id]?.value}
          >
            <Input
              className="w-40"
              allowClear
            />
          </Form.Item>
        )

      case PrdFeatures_NUMBER_FIELD :
        return(
          <Form.Item
            key={feature?.feature_id}
            name={['product_features', feature?.feature_id]}
            label={feature?.description}
            labelCol={{sm: 24, lg: 5}}
            initialValue={parseFloat(featuresData[feature?.feature_id]?.value_int) || ""}
          >
            <InputNumber
              className="w-40"
            />
          </Form.Item>
        )

      case PrdFeatures_SELECTABLE.find(type => type === feature.feature_type) :
        return(
          <Form.Item
            key={feature?.feature_id}
            name={['product_features', feature?.feature_id]}
            label={feature?.description}
            labelCol={{sm: 24, lg: 5}}
            initialValue={featuresData[feature?.feature_id]?.variant_id}
          >
            <Select
              placeholder={ feature?.description }
              className="w-40"
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultValue={featuresData[feature?.feature_id]?.variant_id}
            >
              {Object.values(feature?.variants).length && Object.values(feature?.variants).map((variant) => {
                return (
                  <Option key={ `ProductAssignFeatures_PrdFeatures_SELECTABLE_${variant?.variant_id}` } value={ variant?.variant_id } >{ variant?.variant }</Option>
                );
              })}
            </Select>
          </Form.Item>
        )

      case PrdFeatures_MULTIPLE_CHECKBOX :

        const selectedVariants = featuresData[feature?.feature_id]?.variants ? Object.keys(featuresData[feature?.feature_id]?.variants) : [];

        if (feature.feature_id === "3247") {
          return (
            <Form.Item
              key={feature?.feature_id}
              name={['product_features', feature?.feature_id]}
              label={feature?.description}
              labelCol={{sm: 24, lg: 5}}
              initialValue={selectedVariants}
            >
              <Select
                mode="multiple"
                placeholder={ feature?.description }
                className="w-40"

                allowClear
                showSearch
                filterOption={(input, option) =>
                  option?.children.props?.children[1]?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                }
                defaultValue={selectedVariants}
              >
                {Object.values(feature?.variants).length && Object.values(feature?.variants).map((variant) => {

                  const featureColor = variant?.variant_color && (variant?.variant_color).toString().trim().toLowerCase().replaceAll(" ", "-");

                  return (
                    <Option
                      key={ `ProductAssignFeatures_PrdFeatures_MULTIPLE_CHECKBOX_${variant?.variant_id}` }
                      value={ variant?.variant_id }
                      label={ variant?.variant }
                    >
                      <div className="optionByIcon">
                        <span className={`colorFeature--icon ${featureColor} align-middle`} />
                        { variant?.variant }
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          )
        }
        else if (feature.feature_id === "3231" || feature.feature_id === "3260") {
          return (
            <Form.Item
              key={feature?.feature_id}
              name={['product_features', feature?.feature_id]}
              label={feature?.description}
              labelCol={{sm: 24, lg: 5}}
              initialValue={selectedVariants}
            >
              <Select
                mode="multiple"
                placeholder={ feature?.description }
                className="w-40"
                optionLabelProp="label"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option?.children.props?.children[1]?.toLowerCase()?.indexOf(input?.toLowerCase()) >= 0
                }
                defaultValue={selectedVariants}
              >
                {Object.values(feature?.variants).length && Object.values(feature?.variants).map((variant) => {

                  return (
                    <Option
                      key={ `ProductAssignFeatures_PrdFeatures_MULTIPLE_CHECKBOX_${variant?.variant_id}` }
                      value={ variant?.variant_id }
                      label={ variant?.variant }>
                      <div className="optionByIcon">
                        <ShowResponsiveImage
                          imagePath={ variant?.image_pair?.icon?.image_path }
                          imageFolder='feature_variant'
                          width={23}
                          height={23}
                          skeletonWidth="23px"
                          skeletonHeight="23px"
                          imageAlt={ variant?.variant }
                          object_id={variant?.variant_id}
                          object_type={`feature_img`}
                        />
                        { variant?.variant }
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          )
        }
        else {
          return(
            <Form.Item
              key={feature?.feature_id}
              name={['product_features', feature?.feature_id]}
              label={feature?.description}
              labelCol={{sm: 24, lg: 5}}
              initialValue={selectedVariants}
            >
              <Select
                mode="multiple"
                placeholder={ feature?.description }
                optionLabelProp="label"
                className="w-40"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                defaultValue={selectedVariants}
              >
                {Object.values(feature?.variants).length && Object.values(feature?.variants).map((variant) => {
                  return (
                    <Option
                      key={ `ProductAssignFeatures_PrdFeatures_MULTIPLE_CHECKBOX_${variant?.variant_id}` }
                      value={ variant?.variant_id }
                      label={ variant?.variant }
                    >
                      { variant?.variant }
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          )
        }

      case PrdFeatures_SINGLE_CHECKBOX :
        const selectedCheckbox = featuresData[feature?.feature_id]?.value === "Y" ? true : false
        return (
          <Form.Item
            key={feature?.feature_id}
            name={['product_features', "checkbox", feature?.feature_id]}
            label={feature?.description}
            labelCol={{sm: 24, lg: 5}}
            valuePropName="checked"
            initialValue={selectedCheckbox}
          >
            <Checkbox />
          </Form.Item>
        )

      case PrdFeatures_GROUP :
        return (
          <div key={feature?.feature_id} className="featureItem">
            <Row gutter={[0, 10]}>
              <Col span={24} className="featureItem--groupCaption">
                {feature?.description}
              </Col>

              <Col span={24} className="px-4">
                {Object.values(feature?.subfeatures)?.length && Object.values(feature?.subfeatures).map(subfeature => {
                  return featureItem(subfeature);
                })}
              </Col>
            </Row>
          </div>
        )

      default : return <></>
    }
  }

  return (
    featuresIsLoading ?
      <Skeleton active paragraph={{ rows: 13 }} /> :
      (features && Object.values(features)?.length) ?
        Object.values(features).map(feature => {
          return featureItem(feature);
        }) :

        <div className="features--errorSelectCategory">
          <Title type="danger" level={4}>{t('select_category_first_msg')}</Title>
        </div>
  );
};

export default ProductAssignFeatures;
