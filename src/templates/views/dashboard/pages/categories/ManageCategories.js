import "../products/styles/ManageProducts.less";

import { Button, Col, Empty, Popconfirm, Row, Skeleton } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../functions/Helper";
import { useGetApi } from "../../../../../functions";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const ManageCategories = () => {

  const { t } = useTranslation();

  const { user_data } = useGetAuthState();

  const company_id = user_data?.auth?.company_id;

  const { isLoading, data: categoriesData } = useGetApi('vendor-categories-api', `company_id=${company_id}`, `vendor-categories_${user_data?.auth?.company_id}`, { enabled:  !!company_id});

  const categories = categoriesData || {};

  const handleRemoveCategory = (categoryId) => {
    console.log(categoryId);
  }

  const handleOnClickCreateCategory = () => {
    console.log("clicked")
  }

  return (
    <Row>
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

              categories?.length && categories?.map(category => {
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
              })
            }

            {(!isLoading && !categories?.length) && <Col span={24} className="text-center"><Empty /></Col>}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ManageCategories;
