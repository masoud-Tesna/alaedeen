// import react hooks:
import {memo} from "react";

// import style:
import "./styles/ProductsMultiColumn.less";

// import antd components:
import {Col, Row, Skeleton} from "antd";

// import text truncate:
import TextTruncate from "react-text-truncate";

// import show responsive image:
import ShowResponsiveImage from "../../common/ShowResponsiveImage";
import {If, Then} from "../../../utilities/functions/Helper";

const ProductImage = (
  {
    isLoading = false,
    image = {},
    imageAlt,
    productId,
    imageWidth = 214,
    imageHeight = 214,
  }
) => {
  if (isLoading) {
    return <ShowResponsiveImage
      imagePath=""
      skeletonWidth={`${imageWidth}px`}
      skeletonHeight={`${imageHeight}px`}
    />
  }
  
  return (
    <ShowResponsiveImage
      imagePath={ image }
      imageFolder='detailed'
      width={imageWidth}
      height={imageHeight}
      skeletonWidth={`${imageWidth}px`}
      skeletonHeight={`${imageHeight}px`}
      imageAlt={ imageAlt }
      object_id={productId}
      object_type={`prd`}
    />
  );
}

const ProductTitle = ({isLoading = false, title = ""}) => {
  if (isLoading) {
    return (
      <>
        <Skeleton.Input active size={"small"} />
        <Skeleton.Input active size={"small"} />
      </>
    );
  }
  
  return (
    <TextTruncate
      line={3}
      element="div"
      truncateText=" …"
      text={title}
    />
  );
}

const ProductPrice = (
  {
    isLoading = false,
    productPrice,
    productListPrice,
    quantityUnit,
    minQuantity
  }
) => {
  if (isLoading) {
    return (
      <Col span={24} className="--price">
        <Skeleton.Input active size={"small"} />
    
        <Skeleton.Input active size={"small"} />
      </Col>
    );
  }
  
  return (
    <>
      <If condition={productPrice !== "0.00"}>
        <Then>
          <Col span={24} className="--price">
            ${ productPrice } {productListPrice !== "0.00" && ` - $${productListPrice}`} {quantityUnit && <span className="__piece">/ { quantityUnit }</span>}
          </Col>
        </Then>
      </If>
  
      <If condition={minQuantity && quantityUnit}>
        <Then>
          <Col span={24} className="--piece">
            { minQuantity } { quantityUnit } <span className="__piece"> (MOQ)</span>
          </Col>
        </Then>
      </If>
    </>
  );
}

const ProductManufacturing = ({isLoading = false, manufacturing}) => {
  if (isLoading) return <Skeleton.Input active size={"small"} />
  
  return (
    <>
      <i className={ `fi fi-${ manufacturing.toLowerCase() }` } /> <span>{ manufacturing }</span>
    </>
  );
}

const ProductsMultiColumn = ({product = {}, imageWidth, imageHeight, isLoading = false}) => {
  
  const productPrice = parseFloat(product?.price).toFixed(2) || null;
  const productListPrice = parseFloat(product?.list_price).toFixed(2) || null;
  const manufacturing_country = product.manufacturing_country || null;
  
  return (
    <Row className="productsMultiColumn--container" gutter={[0, 8]}>
      <Col className="--topSection align-self-start">
        <Row gutter={[0, 8]}>
          <Col span={24} className="--image">
            <ProductImage
              isLoading={isLoading}
              image={product?.main_pair?.detailed?.image_path}
              imageAlt={product?.product}
              productId={product?.product_id}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
            />
          </Col>
  
          <Col span={24} className="--title">
            <ProductTitle
              isLoading={isLoading}
              title={product?.product}
            />
          </Col>
          
          <ProductPrice
            isLoading={isLoading}
            productPrice={productPrice}
            productListPrice={productListPrice}
            quantityUnit={product?.quantity_unit}
            minQuantity={product?.min_qty}
          />
        </Row>
      </Col>
      
      <Col span={24} className="--bottomSection --location align-self-end">
        <ProductManufacturing
          isLoading={isLoading}
          manufacturing={manufacturing_country}
        />
      </Col>
    </Row>
  );
};

export default memo(ProductsMultiColumn);
