import "../products/styles/ManageProducts.less";

import { Button, Col, Empty, Form, Modal, Popconfirm, Row, Skeleton } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../functions/Helper";
import { useGetApi } from "../../../../../functions";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateCategory from "./CreateCategory";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../contexts/spiner/SpinnerContext";
import axios from "axios";

const ManageCategories = () => {

  const { t } = useTranslation();

  const { user_data } = useGetAuthState();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  // state for show create category picker:
  const [isCreateCategoryModalVisible, setIsCreateCategoryModalVisible] = useState(false);

  const company_id = user_data?.auth?.company_id;

  const { isLoading, data: categoriesData, refetch: refetchCategoryList } = useGetApi(
    'vendor-categories-api',
    `company_id=${company_id}`,
    `vendor-categories_${user_data?.auth?.company_id}`,
    {
      enabled:  !!company_id,
      refetchOnWindowFocus: false
      }
    );

  const categories = categoriesData || {};

  // use ref for create category form:
  const [createCategoryFrm] = Form.useForm();

  // function for close create category modal:
  const closeCreateCategoryModal = () => {
    setIsCreateCategoryModalVisible(false);
  };

  const handleRemoveCategory = (categoryId) => {
    console.log(categoryId);
  }

  const handleOnClickCreateCategory = () => {
    setIsCreateCategoryModalVisible(true);
  }

  const handleSubmitForm = () => {
    const values = createCategoryFrm?.getFieldsValue();

    values.store_id = user_data?.auth?.company_id;
    values.status = "D";

    // show spinner (spinner context):
    spinnerDispatch(isLoadingAction(true));

    axios.post(`https://alaedeen.com/horn/create-personal-category-api`, {category_data: values})
      .then(() => {
        refetchCategoryList()
          .then(() => {
            setIsCreateCategoryModalVisible(false);
          })
          .then(() => {
            createCategoryFrm.resetFields()
          });

      })
      .then(() => {
        // hidden spinner (spinner context):
        spinnerDispatch(isLoadingAction(false));
      });
  }

  return (
    <Row>
      <Modal
        className="categoriesPicker--Modal"
        title={t('create_category')}
        style={{ top: 10 }}
        visible={isCreateCategoryModalVisible}
        onCancel={() => closeCreateCategoryModal()}
        onOk={() => handleSubmitForm()}
        okText={t("create")}
        cancelText={t("cancel")}
        destroyOnClose
        maskClosable={false}
      >
        <CreateCategory
          formRef={createCategoryFrm}
        />
      </Modal>

      <Col span={24}>
        <DashboardContentHeader page={"manage categories"} linkText={"create_category"} linkOnClick={handleOnClickCreateCategory} linkIcon={<PlusOutlined />} />
      </Col>

      <Col span={24} className="categoryManage--table">
        <div>
          <Row className="__head">
            <Col className="text-center" span={7}>
              {t('category')}
            </Col>
            <Col className="text-center" span={7}>
              {t('category_parent')}
            </Col>
            <Col className="text-center" span={6}>
              {t('action')}
            </Col>
            <Col className="text-center" span={4}>
              {t('status')}
            </Col>
          </Row>

          <Row className="__body">
            {(!company_id || isLoading) ?
              new Array(6).fill("", 0, 6).map((p, i) => {
                return(
                  <Col key={i} span={24}>
                    <Row className="__data">
                      <Col className="text-center my-auto __name" span={7}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i}px)`, height: 22 }} active={true} size={"small"} />
                      </Col>

                      <Col className="text-center my-auto __name" span={7}>
                        <Skeleton.Input style={{ width: `calc(60% - ${(i) + 10}px)`, height: 22 }} active={true} size={"small"} />
                      </Col>

                      <Col className="my-auto __actions" span={6}>
                        <Row justify="space-between" gutter={10}>
                          <Col span={12}>
                            <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active={true} size={"small"} />
                          </Col>

                          <Col span={12}>
                            <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active={true} size={"small"} />
                          </Col>
                        </Row>
                      </Col>

                      <Col className="text-center my-auto __publish" span={4}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active={true} size={"small"} />
                      </Col>
                    </Row>
                  </Col>
                )
              }) :

              categories?.length ? categories?.map(category => {
                const categoryId = category?.category_id;

                return(
                  <Col key={categoryId} span={24}>
                    <Row className={ `__data ${category?.status === 'D' ? 'disable--item' : ''}` }>

                      <Col className="text-center my-auto __name" span={7}>
                        { category?.category }
                      </Col>

                      <Col className="text-center my-auto __name" span={7}>
                        {category?.parent}
                      </Col>

                      <Col className="my-auto __actions" span={6}>
                        <Row justify="space-between" gutter={10}>
                          <Col>
                            <Link to={`/dashboard/categories/${categoryId}`}>
                              <Button type="primary" icon={<EditOutlined />} >
                                {t('edit')}
                              </Button>
                            </Link>
                          </Col>

                          <Col>
                            <Popconfirm
                              title={t(__("Are you sure to delete this product?"))}
                              onConfirm={() => handleRemoveCategory(categoryId)}
                              okText={ t("Yes") }
                              cancelText={ t("No") }
                            >
                              <Button type="primary" danger ghost  icon={<DeleteOutlined />}>
                                {t('delete')}
                              </Button>
                            </Popconfirm>
                          </Col>
                        </Row>
                      </Col>

                      <Col className="text-center my-auto __publish" span={4}>
                        {category?.status === 'A' && <span className="item--status__active">{t('category_is_active')}</span>}

                        {category?.status === 'D' && <span className="item--status__disable">{t('awaiting_approval')}</span>}
                      </Col>
                    </Row>
                  </Col>
                )
              }) : null
            }

            {((!isLoading && company_id) && !categories.length) && <Col span={24} className="text-center"><Empty description={t("no_data")}/></Col>}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ManageCategories;
