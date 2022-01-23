import "./styles/ManageProducts.less";

import { Button, Col, Empty, Popconfirm, Row, Skeleton } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../functions/Helper";
import { useGetApi } from "../../../../../functions";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";

// import Cookies Package:
import { Cookies } from "react-cookie";
import ShowResponsiveImage from "../../../../common/ShowResponsiveImage";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const ManageProducts = () => {

  const { t } = useTranslation();

  const { user_data } = useGetAuthState();

  // use Cookies Class:
  const Cookie = new Cookies();

  const token = Cookie.get('_token');

  const {isLoading, data} = useGetApi('vendor-products-api', `_token=${token}`, `vendor_products_${user_data?.auth?.company_id}`);

  const {products} = data || [];

  const handleRemoveProduct = (productId) => {
    console.log(productId);
  }

  return (
    <Row>
      <Col span={24}>
        <DashboardContentHeader page={"manage products"} linkText={"create_product"} lnkHref={"/dashboard/products/create"} linkIcon={<PlusOutlined />} />
      </Col>

      <Col span={24} className="productManage--table">
        <div>
          <Row className="productManage--table__head">
            <Col className="text-center" span={2}>
              {t('picture')}
            </Col>
            <Col className="text-center" span={8}>
              {t('product_or_code')}
            </Col>
            <Col className="text-center" span={2}>
              {t('min_price')}
            </Col>
            <Col className="text-center" span={2}>
              {t('max_price')}
            </Col>
            <Col className="text-center" span={6}>
              {t('action')}
            </Col>
            <Col className="text-center" span={4}>
              {t('status')}
            </Col>
          </Row>

          <Row className="productManage--table__body">
            {isLoading ?
              new Array(6).fill("", 0, 6).map((p, i) => {
                return(
                  <Col key={i} span={24}>
                    <Row className="productManage--table__data">
                      <Col className="text-center product--image" span={2}>
                        <ShowResponsiveImage
                          skeletonWidth="100%"
                          skeletonHeight="70px"
                        />
                      </Col>

                      <Col className="text-center my-auto product--name" span={8}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active={true} size={"small"} />
                      </Col>

                      <Col className="text-center my-auto product--price" span={2}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active={true} size={"small"} />
                      </Col>

                      <Col className="text-center my-auto product--price" span={2}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active={true} size={"small"} />
                      </Col>

                      <Col className="my-auto product--actions" span={6}>
                        <Row justify="space-between" gutter={10}>
                          <Col span={12}>
                            <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active={true} size={"small"} />
                          </Col>

                          <Col span={12}>
                            <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active={true} size={"small"} />
                          </Col>
                        </Row>
                      </Col>

                      <Col className="text-center my-auto product--publish" span={4}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active={true} size={"small"} />
                      </Col>
                    </Row>
                  </Col>
                )
              }) :
              products?.length && products?.map(product => {
                const productPrice = parseFloat(product.price).toFixed(2);
                const productListPrice = parseFloat(product.list_price).toFixed(2);

                const productId = product?.product_id;

                return(
                  <Col key={product.product_id} span={24}>
                    <Row className={ `productManage--table__data ${product?.status === 'D' ? 'disable--product' : ''}` }>
                      <Col className="text-center product--image" span={2}>
                        <ShowResponsiveImage
                          imagePath={ product?.main_pair?.detailed?.image_path }
                          imageFolder='detailed'
                          width={70}
                          height={70}
                          skeletonWidth="100%"
                          skeletonHeight="70px"
                          imageAlt={ product?.product }
                          object_id={product?.product_id}
                          object_type={`prd`}
                        />
                      </Col>

                      <Col className="text-center my-auto product--name" span={8}>
                        { product.product }
                      </Col>

                      <Col className="text-center my-auto product--price" span={2}>
                        {productPrice}
                      </Col>

                      <Col className="text-center my-auto product--price" span={2}>
                        {productListPrice}
                      </Col>

                      <Col className="my-auto product--actions" span={6}>
                        <Row justify="space-between" gutter={10}>
                          <Col>
                            <Link to={`/dashboard/products/${productId}`}>
                              <Button type="primary" icon={<EditOutlined />} >
                                {t('edit')}
                              </Button>
                            </Link>
                          </Col>

                          <Col>
                            <Popconfirm
                              title={t(__("Are you sure to delete this product?"))}
                              onConfirm={() => handleRemoveProduct(productId)}
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

                      <Col className="text-center my-auto product--publish" span={4}>
                        {product?.status === 'A' && <span className="product--status__active">{t('published_product')}</span>}

                        {product?.status === 'D' && <span className="product--status__disable">{t('awaiting_approval')}</span>}
                      </Col>
                    </Row>
                  </Col>
                )
              })
            }

            {(!isLoading && !products?.length) && <Col span={24} className="text-center"><Empty /></Col>}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ManageProducts;
