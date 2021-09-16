import {useGetApi} from "../functions";
import {useGetLanguageState} from "../contexts/language/LanguageContext";
import {useParams} from "react-router-dom";
import {Col, Row} from "antd";
import ProductTemplate from "../layouts/blocks/product_templates";

const Product = () => {

  // get initial language
  const { language } = useGetLanguageState();

  // get product path from url:
  const { product: productSeoName } = useParams();

  // get products from API before selecting filters and after selecting filter:
  const { isLoading, data: product } = useGetApi(`products-api`, `product_path=${productSeoName}`, `product_details_${productSeoName}`);

  return (
    <Row className="productDetails--container">
      <Col span={24}>
        <ProductTemplate product={product} />
      </Col>
    </Row>
  );
};

export {Product};