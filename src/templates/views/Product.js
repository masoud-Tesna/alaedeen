import {useGetApiOld} from "../../functions";
import { useNavigate, useParams } from "react-router-dom";
import {Col, Row} from "antd";
import ProductDetail from "../blocks/product_templates";
import { SeoGenerator } from "../../functions/Helper";

const Product = () => {

  // get product path from url:
  const { product: productSeoName } = useParams();

  const navigate = useNavigate();

  // get products from API before selecting filters and after selecting filter:
  const { isLoading, data } = useGetApiOld(`products-api`, `product_path=${productSeoName}`, `product_details_${productSeoName}`, {
    onSuccess: (data) => {
      if (data === 'not_found') {
        navigate('/');
      }
    }
  });

  const product = data || "";

  return (
    <Row className="productDetails--container">
      <SeoGenerator
        title={  product?.page_title || product?.product }
        description={ product?.meta_description }
        keywords={ product?.meta_keywords }
        canonical={ `https://alaedeen.com/product/${productSeoName}` }
        ogImage={product?.main_pair?.detailed?.image_path || ""}
      />

      <Col span={24}>
        <ProductDetail product={product} isLoading={isLoading} />
      </Col>
    </Row>
  );

};

export default Product;