// import style file:
import './styles/ProductFilters.less';

import { Button, Col, Collapse, Row, Space } from "antd";
import { useTranslation } from "react-i18next";
import { __ } from "../../../functions/Helper";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductFilterVariants from "./components/productFilterVariants";
import { useWindowSize } from "../../../functions";
import { useGetConfig } from "../../../contexts/config/ConfigContext";

const ProductFilters = (props) => {

  const { t } = useTranslation();

  // get initial config:
  const { config } = useGetConfig();

  // get window width
  const { width } = useWindowSize();

  const { filters, category_id, category_seo_name, category_name, subCategories, featuresHashContainer } = props;

  const { Panel } = Collapse;

  let selectedFilter = false;

  return (
    <Col xs={24} lg={6} className="productFilter--container" style={{ position: "sticky" }}>
      {/*<div className="mb-2 mt-2 mb-md-4 d-none d-lg-block">
        <span className="text-47 font-weight-bold vv-font-size-1-7">{product_length} {t(__('products'))}:</span> <span className="vv-font-size-1-7">{category_name}</span>
      </div>*/}

      <div className="text-33 font-weight-bold vv-font-size-2 border-bottom border-bc pb-3 d-none d-lg-block">
        { t(__('Filter & Refine')) }
      </div>

      <Row gutter={[0, 16]} className="productFilter--items">

        <div className={ `productFilter--selected ${(width >= 992 && featuresHashContainer) ? 'd-block py-3' : 'd-none'}` }>

          {(filters && filters?.length !== 0) &&

          <Row gutter={[6, 6]}>

            {filters?.filter(filter => filter.selected_variants).map(filter => {
              selectedFilter = true;

              return(
                Object.entries(filter?.selected_variants).map(([key, selected], index) => {
                  return (
                    <Col key={`selectedVariant_${selected?.variant_id}`}>
                      <div className="productFilter--selected__item">

                        <Row className="h-100" align={"middle"} >
                          <Col flex="1 1" className="vv-font-size-1-7 text-70 px-3 text-truncate">
                            {selected.variant}
                          </Col>

                          <Col
                            flex="26px"
                            className="cursor-pointer"
                            onClick={() => props.featureRemoveHandleClick(filter.filter_id, selected?.variant_id) }
                          >
                            <i className="far fa-times-circle display-5 font-weight-light text-bf" />
                          </Col>
                        </Row>

                      </div>
                    </Col>
                  );
                })
              )
            })}

            <Col className={ !selectedFilter && 'd-none' }>
              <div className="productFilter--selected__item reset">

                <Row className="h-100" align={"middle"} >
                  <Col flex="1 1" className="vv-font-size-1-7 text-70 px-3">
                    { t(__('Reset All')) }
                  </Col>

                  <Col
                    flex="22px"
                    className="cursor-pointer"
                    onClick={() => props.featureResetHandleClick()}
                  >
                    <i className="fad fa-undo display-6 mt-2 font-weight-light text-bf" />
                  </Col>
                </Row>

              </div>
            </Col>

          </Row>

          }
        </div>

        {(subCategories && subCategories.length !== 0) &&
        <Col span={24} className="productFilter--subCategories">
          <Collapse
            expandIconPosition={"right"}
            ghost
            expandIcon={({ isActive }) => <DownOutlined rotate={ config.language === 'en' ? (isActive ? 180 : 0) : (isActive ? 0 : 1)} />}
          >
            <Panel header={t(__('categories'))} key="subCategories_panel">
              <Row gutter={[0, 10]} className="subCategories--items">
                <Col span={24} className="subCategories--item">
                  <Link className="py-2 px-4 text-primary vv-font-size-1-7 d-block" to={ `/categories/business` }>{ t(__('all categories')) }</Link>
                </Col>

                <Col span={24} className="subCategories--item">
                  <Link className={ `py-2 ${config.language === 'en' ? 'subCategories--item--plLevel1' : 'subCategories--item--prLevel1'} px-4 vv-font-size-1-7 d-block` } to={ `/categories/${category_seo_name}` }>{ category_name }</Link>
                </Col>
                {subCategories?.map(subCategory => {
                  return (
                    <Col key={`subCategoriesFilter_${category_id}_${subCategory?.category_id}`} span={24} className="subCategories--item">
                      <Link className={ `py-2 ${config.language === 'en' ? 'subCategories--item--plLevel2' : 'subCategories--item--prLevel2'} px-4 vv-font-size-1-7 d-block ${subCategory?.p_count === 0 ? 'link--disable': ''}` } to={ `/categories/${subCategory?.seo_name}` }>{ subCategory?.category }</Link>
                    </Col>
                  )
                })}
              </Row>
            </Panel>
          </Collapse>
        </Col>
        }

        {(filters && filters.length !== 0) &&
        filters?.map(filter => {
          let filterCollapseShow = [];
          if (filter.display === 'Y') {
            filterCollapseShow = [`productsFilter_panel_${category_id}_${filter?.filter_id}_${filter?.feature_id}`]
          }

          return(
            <Col key={`productsFilter_${category_id}_${filter?.filter_id}_${filter?.feature_id}`} span={24} className="productFilter--item">
              <Collapse
                defaultActiveKey={filterCollapseShow}
                expandIconPosition={"right"}
                ghost
                expandIcon={({ isActive }) => <DownOutlined rotate={ config.language === 'en' ? (isActive ? 180 : 0) : (isActive ? 0 : 1)} />}
              >
                <Panel
                  header={t(__(filter?.filter))}
                  key={ `productsFilter_panel_${category_id}_${filter?.filter_id}_${filter?.feature_id}` }
                  showArrow={true}
                >
                  <Row gutter={[0, 10]} className="feature--items">

                    {filter.slider ?
                      <p>Price</p> :
                      <ProductFilterVariants
                        filter_id = {filter?.filter_id}
                        features={filter.variants}
                        featureKey={`filterFeatures_${category_id}_${filter?.filter_id}_${filter?.feature_id}`}
                        featureHandleClick={props.featureHandleClick}
                        featureRemoveHandleClick={props.featureRemoveHandleClick}
                      />
                    }
                  </Row>
                </Panel>
              </Collapse>
            </Col>
          );
        })
        }

        <Col span={24} className="productFilter--confirm text-center">
          <Space size={"middle"}>
            <Button
              className="bg-primary rounded-md p-0 productFilter--confirm__btn"
              size="large"
              onClick={() => { props.handleConfirmFilters() }}
              disabled={!selectedFilter && true}
            >
              {t(__('confirm'))}
            </Button>

            {width < 992 &&
            <Button
              className={ `bg-transparent rounded-md p-0 productFilter--reset__btn` }
              size="middle"
              onClick={() => props.featureResetHandleClick()}
              disabled={!featuresHashContainer && true}
            >
              {t(__('reset'))}
            </Button>
            }
          </Space>

        </Col>

      </Row>
    </Col>
  );
};

export default ProductFilters;
