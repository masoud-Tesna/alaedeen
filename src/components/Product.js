import {useGetApi} from "../functions";
import {useParams} from "react-router-dom";
import {Col, Row} from "antd";
import ProductDetail from "../templates/blocks/product_templates";
import { SeoGenerator } from "../functions/Helper";

const Product = () => {

  // get product path from url:
  const { product: productSeoName } = useParams();

  // get products from API before selecting filters and after selecting filter:
  const { isLoading, data } = useGetApi(`products-api`, `product_path=${productSeoName}`, `product_details_${productSeoName}`);
  const product = data || "";

  return (
    <Row className="productDetails--container">
      <SeoGenerator
        title={  product?.page_title || product?.product }
        description={ product?.meta_description }
        keywords={ product?.meta_keywords }
        canonical={ `https://alaedeen.com/product/${productSeoName}` }
      />

      <Col span={24}>
        <ProductDetail product={product} isLoading={isLoading} />
      </Col>
    </Row>
  );
};

export default Product;