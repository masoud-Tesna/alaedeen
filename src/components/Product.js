import {useGetApi} from "../functions";
import {useParams} from "react-router-dom";
import {Col, Row} from "antd";
import ProductTemplate from "../layouts/blocks/product_templates";
import { Helmet } from "react-helmet";

const Product = () => {

  // get product path from url:
  const { product: productSeoName } = useParams();

  // get products from API before selecting filters and after selecting filter:
  const { isLoading, data } = useGetApi(`products-api`, `product_path=${productSeoName}`, `product_details_${productSeoName}`);
  const product = data || "";

  return (
    <Row className="productDetails--container">

      <Helmet>
        <title>{ !isLoading && ( product?.page_title || product?.product ) }</title>
        <meta name="description" content={ !isLoading && product?.meta_description } />
        <meta name="keywords" content={ !isLoading && product?.meta_keywords } />
        <link rel="canonical" href={ `https://alaedeen.com/product/${productSeoName}` } />
      </Helmet>


      <Col span={24}>
        <ProductTemplate product={product} isLoading={isLoading} />
      </Col>
    </Row>
  );
};

export default Product;