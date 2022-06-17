import "./styles/ProductsMultiColumn.less";
import {Col, Row} from "antd";
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import TextTruncate from "react-text-truncate";

const ProductsMultiColumn = ({product, imageWidth, imageHeight}) => {
  
  const productPrice = parseFloat(product?.price).toFixed(2);
  const productListPrice = parseFloat(product?.list_price).toFixed(2);
  const manufacturing_country = product.manufacturing_country;
  
  return (
    <Row className="productsMultiColumn--container" gutter={[0, 8]}>
      <Col className="--topSection align-self-start">
        <Row gutter={[0, 8]}>
          <Col span={24} className="--image">
            <ShowResponsiveImage
              imagePath={ product?.main_pair?.detailed?.image_path }
              imageFolder='detailed'
              width={imageWidth || 214}
              height={imageHeight || 214}
              skeletonWidth={imageWidth || "214px"}
              skeletonHeight={imageHeight || "214px"}
              imageAlt={ product?.product }
              object_id={product?.product_id}
              object_type={`prd`}
            />
          </Col>
  
          <Col span={24} className="--title">
            <TextTruncate
              line={3}
              element="div"
              truncateText=" …"
              text={product?.product}
            />
          </Col>
  
          {
            (productPrice !== "0.00") &&
            <Col span={24} className="--price">
              ${ productPrice } {productListPrice !== "0.00" && ` - $${productListPrice}`} {product?.quantity_unit && <span className="__piece">/ { product?.quantity_unit }</span>}
            </Col>
          }
  
          {
            (product?.min_qty && product?.quantity_unit) &&
              <Col span={24} className="--piece">
                { product?.min_qty } { product?.quantity_unit } <span className="__piece"> (MOQ)</span>
              </Col>
          }
        </Row>
      </Col>
      
      <Col span={24} className="--bottomSection --location align-self-end">
        <i className={ `fi fi-${ manufacturing_country.toLowerCase() }` } /> <span>{ manufacturing_country }</span>
      </Col>
    </Row>
  );
};

export default ProductsMultiColumn;
