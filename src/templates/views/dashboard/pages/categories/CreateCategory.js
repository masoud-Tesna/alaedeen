import { useState } from "react";

import "./styles/CreateCategory.less";

import { Col, Collapse, Form, Input, Row, Skeleton } from "antd";
import { useGetApi } from "../../../../../functions";
import { useTranslation } from "react-i18next";
import { EditOutlined } from "@ant-design/icons";
import { __ } from "../../../../../functions/Helper";

const CreateCategory = ({ formRef }) => {

  const { Panel } = Collapse;

  const { t } = useTranslation();

  // state for save selected category id for get sub categories from API:
  const [categoryDetail, setCategoryDetail] = useState({});

  // get categories from API:
  const {isLoading, data} = useGetApi('categories-tree-api', "category_id=524", `categoriesTree`, { refetchOnWindowFocus: false });
  const categories = data || {};

  const SelectCategoryParent = (categoryId, categoryName) => {
    setCategoryDetail({
      category_id: categoryId,
      category: categoryName
    });

    formRef?.setFieldsValue({
      parent_id: categoryId
    });
  }

  const CustomHeader = props => {
    const { children, categoryId, categoryName } = props;
    return (
      <span
        className="categoryName"
        onClick={event => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
          SelectCategoryParent(categoryId, categoryName)
        }}
      >
        {children}
      </span>
    );
  };

  const CustomPanel = props => {
    const { children, header, categoryId, categoryName, ...rest } = props;
    const customHeader = <CustomHeader categoryId={categoryId} categoryName={categoryName}>{header}</CustomHeader>;
    return (
      <Panel {...rest} header={customHeader}>
        {children}
      </Panel>
    );
  };

  const subCategoriesHandle = subCategories => {

    return (
      <Collapse
        accordion
        ghost
        expandIconPosition="left"
      >
        {(subCategories && subCategories?.length) && subCategories?.map(subCategory => {
          const categoryId = subCategory?.category_id;

          return (
            <CustomPanel
              header={subCategory?.category}
              key={ `CreateCategory_subCategories_${categoryId}` }
              showArrow={!!subCategory?.subcategories}
              categoryId={categoryId}
              categoryName={subCategory?.category}
              forceRender
            >
              {subCategory?.subcategories && subCategoriesHandle(subCategory?.subcategories)}
            </CustomPanel>
          )
        })}
      </Collapse>
    )
  }

  return (
    <Form
      className="h-100 createCategory--formContent"
      name="create-category-form"
      scrollToFirstError
      form={formRef}
    >

      {(!categoryDetail.length && !categoryDetail?.category_id) ?
        isLoading ?
          <Skeleton active={true} paragraph={{ rows: 9 }} /> :

          <Row gutter={[0, 20]}>
            <Col span={24} className="CategoryParent--title">
              {t("please_select_category_parent")}
            </Col>

            <Col span={24}>
              <Collapse
                className="CategoryParent--Collapse"
                accordion
                ghost
                expandIconPosition="left"
              >
                {(categories && categories.length) && categories?.map(category => {
                  const categoryId = category?.category_id;

                  return (
                    <CustomPanel
                      header={category?.category}
                      key={ `CreateCategory_categories_${categoryId}` }
                      showArrow={!!category?.subcategories}
                      categoryId={categoryId}
                      categoryName={category?.category}
                      forceRender
                    >
                      {category?.subcategories && subCategoriesHandle(category?.subcategories)}
                    </CustomPanel>
                  )
                })}
              </Collapse>
            </Col>
          </Row> :

        <Row className="categoryCreate">
          <Col span={24}>
            <Form.Item
              name={"parent_id"}
              label={t("category_parent")}
              labelCol={{sm: 24, lg: 6}}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input hidden/>
              <span className="selectedCategory" onClick={() => setCategoryDetail({})}>
                <span className="__title">{categoryDetail?.category}</span>
                <span className="__edit"><EditOutlined /></span>
              </span>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name={"category"}
              label={t("category_name")}
              labelCol={{sm: 24, lg: 6}}
              rules={[
                {
                  required: true,
                  message: t(__('Please input category name')),
                },
              ]}
            >
              <Input
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      }

    </Form>
  );
};

export default CreateCategory;
