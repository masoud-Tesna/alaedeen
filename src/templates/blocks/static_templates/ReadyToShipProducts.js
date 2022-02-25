// import Templates:
import ProductsMultiColumnVertical from "../product_list_templates/ProductsMultiColumnVertical";
import SkeletonMultiColumnVertical from "../product_list_templates/skeletons/SkeletonMultiColumnVertical";

// import ANT Design components used:
import { Row } from "antd";

// import Custom hooks:
import { useGetApiOld, useWindowSize } from "../../../functions";

const ReadyToShipProducts = () => {

  const { width } = useWindowSize();

  let productsMultiColumnVertical_items = { span: 8 };
  let items_per_page = 3;

  if (width < 992) {
    productsMultiColumnVertical_items = { span: 12 };
    items_per_page = 2;
  }

  // get products from API:
  const { isLoading, data } = useGetApiOld(`products-api`, `rtsShowHome=Y&items_per_page=${items_per_page}`, `shipProducts_${items_per_page}`);
  const { products } = data || [];

  return (
    <Row className="h-100 productsMultiColumnVertical--items" justify="space-around">

      {isLoading ?
      <SkeletonMultiColumnVertical
        skeleton = {true}
        skeltonNumbers = {width >= 992 ? 3 : 2}
        grid={productsMultiColumnVertical_items}
        width = { width }
        height = {width >= 992 ? 352.923 : 149.8}
      /> :
        <>
          {products?.map((product) => {
            return (<ProductsMultiColumnVertical
              key = { `ReadyToShipProducts_${product?.product_id}` }
              product={product}
              detailIcon="company"
              grid={productsMultiColumnVertical_items}
              widthProductImage={width >= 992 ? 291 : 100}
              heightProductImage={width >= 992 ? 226 : 100}
            />);
          })}
        </>
      }
    </Row>
  );
};

export default ReadyToShipProducts;