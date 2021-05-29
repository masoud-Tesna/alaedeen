// import Layouts:
import ProductsMultiColumnVertical from "../product_list_templates/ProductsMultiColumnVertical";
import SkeletonMultiColumnVertical from "../product_list_templates/SkeletonMultiColumnVertical";

// import ANT Design components used:
import { Row } from "antd";

// import Custom hooks:
import { useGetProductApi, useWindowSize } from "../../../functions";

const HomePageShowProducts = () => {

  const { width } = useWindowSize();

  let productsMultiColumnVertical_items = { span: 8 };
  let items_per_page = 3;

  if (width <= 991) {
    productsMultiColumnVertical_items = { span: 12 };
    items_per_page = 2;
  }

  let url = `items_per_page=${items_per_page}&company_id=181`;

  const { load, products } = useGetProductApi(url);

  return (
    <Row className="h-100 productsMultiColumnVertical--items" justify="space-around">

      {load ?
      <SkeletonMultiColumnVertical
        skeleton = {true}
        skeltonNumbers = {width >= 992 ? 3 : 2}
        grid={productsMultiColumnVertical_items}
        width = { width }
        height = {width >= 992 ? 352.923 : 149.8}
      /> :
        <>
          {products.map((product) => {
            return (<ProductsMultiColumnVertical
              key = { product.product_id }
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

export default HomePageShowProducts;