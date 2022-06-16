import "./styles/RecommendedProducts.less";
import {Col, Row} from "antd";
import {useTranslation} from "react-i18next";
import {useBreakpoint, useGetApiOld} from "../../../utilities/functions";
import ProductsMultiColumn from "../../blocks/products_column/ProductsMultiColumn";
import {__} from "../../../utilities/functions/Helper";
import {Link} from "react-router-dom";

const RecommendedProducts = () => {
  
  const { t } = useTranslation();
  
  const { isLg } = useBreakpoint();
  
  const product_items_per_page = !!isLg ? 10 : 4;
  
  // get products from API:
  const { isLoading: productsIsLoading, data: productsData } = useGetApiOld(
    `recommended-api`,
    `recShowHome=Y&items_per_page=${product_items_per_page}`,
    `recommendedHomeProducts_${product_items_per_page}`,
    {
      refetchOnWindowFocus: false
    }
  );
  const { products } = productsData || {};
  
  return (
    <Row className="recommendedProducts--container" gutter={[0, 24]}>
      <Col span={24} className="--caption">
        {t("recommended_for_you")}
      </Col>
      
      <Col className="--products" span={24}>
        <Row className="row-cols-2 row-cols-lg-5" gutter={[16, 16]}>
          {
            new Array(10).fill("", 0, 10)?.map(([p, i]) => {
              return (
                <Col>
                  <ProductsMultiColumn
                    key={`ProductsMultiColumn_${i}`}
                    product={p}
                  />
                </Col>
              )
            })
          }
        </Row>
      </Col>
      
      <Col className="--moreLink" span={24}>
        <Link to={ "/recommended" }>
          { t(__('Show More')) }
        </Link>
      </Col>
    </Row>
  );
};

export default RecommendedProducts;
