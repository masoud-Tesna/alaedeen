import "./styles/ManageProducts.less";

import { Button, Col, Empty, Popconfirm, Row, Skeleton } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { useTranslation } from "react-i18next";
import { __, SeoGenerator } from "../../../../../functions/Helper";
import { useGetApiOld, useGetProductsLimitStat } from "../../../../../functions";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import ShowResponsiveImage from "../../../../common/ShowResponsiveImage";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductsLimitStat from "../components/ProductsLimitStat";

const ManageProducts = () => {

  const { t } = useTranslation();

  const { user_data } = useGetAuthState();

  const company_id = user_data?.auth?.company_id;

  const {isLoading, data: productsData} = useGetApiOld('vendor-products-api', `company_id=${company_id}`, `vendor_products_${user_data?.auth?.company_id}`, { enabled: !!company_id });

  const {products} = productsData || {};

  const { isLoading: productsLimitIsLoading, isFetching: productsLimitIsFetching, data: productsLimitData } = useGetProductsLimitStat();

  const productsLimitStat = productsLimitData || {};

  const createProductLink = +(productsLimitStat?.remaining);

  /*const handleRemoveProduct = (productId) => {
    console.log(productId);
  }*/

  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Products - Manage"
      />

      <Col span={24}>
        <DashboardContentHeader
          page={"manage products"}
          isLoading={productsLimitIsLoading || productsLimitIsFetching}
          hasLink={!!createProductLink}
          linkData={
            {
              text: "create_product",
              href: "/dashboard/products/create",
              icon:  <PlusOutlined />
            }
          }
          hasStat={true}
          stat={
            <ProductsLimitStat
              productsLimitStat = {productsLimitStat}
              isLoading = {productsLimitIsLoading}
              isFetching = {productsLimitIsFetching}
            />
          }
        />

      </Col>

      <Col span={24} className="productManage--table">
        <div>
          <Row className="__head">
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

          <Row className="__body">
            {(!company_id || isLoading) ?
              new Array(6).fill("", 0, 6).map((p, i) => {
                return(
                  <Col key={`ManageProductsLoading_${i}`} span={24}>
                    <Row className="__data">
                      <Col className="text-center __image" span={2}>
                        <ShowResponsiveImage
                          skeletonWidth="100%"
                          skeletonHeight="70px"
                        />
                      </Col>

                      <Col className="text-center my-auto __name" span={8}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active size={"small"} />
                      </Col>

                      <Col className="text-center my-auto __price" span={2}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active size={"small"} />
                      </Col>

                      <Col className="text-center my-auto __price" span={2}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active size={"small"} />
                      </Col>

                      <Col className="my-auto __actions" span={6}>
                        <Row justify="space-between" gutter={10}>
                          <Col span={12}>
                            <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active size={"small"} />
                          </Col>

                          <Col span={12}>
                            <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active size={"small"} />
                          </Col>
                        </Row>
                      </Col>

                      <Col className="text-center my-auto __publish" span={4}>
                        <Skeleton.Input style={{ width: `calc(60% - ${i + 2}px)`, height: 22 }} active size={"small"} />
                      </Col>
                    </Row>
                  </Col>
                )
              }) :

              products?.length ? products?.map(product => {
                const productPrice = parseFloat(product?.price).toFixed(2);
                const productListPrice = parseFloat(product?.list_price).toFixed(2);

                const productId = product?.product_id;

                return(
                  <Col key={`ManageProducts_productsList_${productId}`} span={24}>
                    <Row className={ `__data ${product?.status === 'D' ? 'disable--item' : ''}` }>
                      <Col className="text-center __image" span={2}>
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

                      <Col className="text-center my-auto __name" span={8}>
                        { product?.product }
                      </Col>

                      <Col className="text-center my-auto __price" span={2}>
                        {productPrice}
                      </Col>

                      <Col className="text-center my-auto __price" span={2}>
                        {productListPrice}
                      </Col>

                      <Col className="my-auto __actions" span={6}>
                        <Row justify="center" gutter={10}>
                          <Col>
                            <Link to={`/dashboard/products/${productId}`}>
                              <Button type="primary" icon={<EditOutlined />} >
                                {t('edit')}
                              </Button>
                            </Link>
                          </Col>

                          {/*<Col>
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
                          </Col>*/}
                        </Row>
                      </Col>

                      <Col className="text-center my-auto __publish" span={4}>
                        {product?.status === 'A' && <span className="item--status__active">{t('published_product')}</span>}

                        {product?.status === 'D' && <span className="item--status__disable">{t('awaiting_approval')}</span>}
                      </Col>
                    </Row>
                  </Col>
                )
              }) : null
            }

            {((!isLoading && company_id) && !products?.length) && <Col span={24} className="text-center"><Empty description={t("no_data")}/></Col>}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default ManageProducts;
