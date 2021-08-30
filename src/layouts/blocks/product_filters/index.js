// import style file:
import './styles/ProductFilters.less';

import { Button, Col, Collapse, Row } from "antd";
import { useTranslation } from "react-i18next";
import { __ } from "../../../functions/Helper";
import { DownOutlined } from "@ant-design/icons";
import { useGetLanguageState } from "../../../contexts/language/LanguageContext";
import { Link } from "react-router-dom";
import ProductFilterVariants from "./components/productFilterVariants";

const ProductFilters = (props) => {

  const { t } = useTranslation();

  // get initial language
  const { language } = useGetLanguageState();

  const { filters, category_id, category_seo_name, category_name, subCategories, product_length } = props;

  const { Panel } = Collapse;

  return (
    <Col span={6} className="productFilter--container">
      <div className="mb-2 mt-2 mb-md-4">
        <span className="text-47 font-weight-bold vv-font-size-1-7">{product_length} {t(__('products'))}:</span> <span className="vv-font-size-1-7">{category_name}</span>
      </div>

      <div className="text-33 font-weight-bold vv-font-size-2 border-bottom border-bc pb-3">
        { t(__('Filter & Refine')) }
      </div>
      <Row gutter={[0, 16]} className="productFilter--items">

        {(subCategories && subCategories.length !== 0) &&
          <Col span={24} className="productFilter--subCategories">
            <Collapse
              expandIconPosition={"right"}
              ghost
              expandIcon={({ isActive }) => <DownOutlined rotate={ language === 'en' ? (isActive ? 180 : 0) : (isActive ? 0 : 1)} />}
            >
              <Panel header={t(__('categories'))} key="subCategories_panel">
                <Row gutter={[0, 10]} className="subCategories--items">
                  <Col span={24} className="subCategories--item">
                    <Link className="py-2 px-4 text-primary vv-font-size-1-7 d-block" to={ `/categories/business` }>{ t(__('all categories')) }</Link>
                  </Col>

                  <Col span={24} className="subCategories--item">
                    <Link className={ `py-2 ${language === 'en' ? 'subCategories--item--plLevel1' : 'subCategories--item--prLevel1'} px-4 text-primary vv-font-size-1-7 d-block` } to={ `/categories/${category_seo_name}` }>{ category_name }</Link>
                  </Col>
                  {subCategories?.map(subCategory => {
                    return (
                      <Col key={`subCategoriesFilter_${category_id}_${subCategory?.category_id}`} span={24} className="subCategories--item">
                        <Link className={ `py-2 ${language === 'en' ? 'subCategories--item--plLevel2' : 'subCategories--item--prLevel2'} px-4 text-primary vv-font-size-1-7 d-block` } to={ `/categories/${subCategory?.seo_name}` }>{ subCategory?.category }</Link>
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
                  expandIcon={({ isActive }) => <DownOutlined rotate={ language === 'en' ? (isActive ? 180 : 0) : (isActive ? 0 : 1)} />}
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
          <Button
            className="bg-primary rounded-md p-0 productFilter--confirm__btn"
            size="large"
            onClick={() => { props.handleConfirmFilters() }}
            disabled={!props.featuresHashContainer && true}
          >
            {t(__('confirm'))}
          </Button>
        </Col>

      </Row>
    </Col>
  );
};

export default ProductFilters;
