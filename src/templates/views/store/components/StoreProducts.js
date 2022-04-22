import {Col, Row} from "antd";
import axios from "axios";
import {useInfiniteQuery} from "react-query";
import SkeletonCategoryMultiColumn from "../../../blocks/product_list_templates/skeletons/SkeletonCategoryMultiColumn";
import {useWindowSize} from "../../../../functions";
import InfiniteScroll from "react-infinite-scroller";
import CategoryMultiColumn from "../../../blocks/product_list_templates/CategoryMultiColumn";

const StoreProducts = ({ companyId }) => {
  
  // get window width
  const { width } = useWindowSize();
  
  const fetchProducts = async ({ pageParam = 1 }) => {
    
    const { data } = await axios.get(
      `https://alaedeen.com/horn/products-api/?items_per_page=10&page=${pageParam}&company_id=${companyId}`
    );
    
    return { results: data, nextPage: pageParam + 1 };
  };
  
  const {
    isLoading: productsIsLoading,
    data,
    hasNextPage,
    fetchNextPage
  } = useInfiniteQuery(["products", companyId], fetchProducts, {
    getNextPageParam: (lastPage) => {
      
      const allPageInParams = Math.ceil(lastPage?.results?.params?.total_items / lastPage?.results?.params?.items_per_page);
      
      if (lastPage?.nextPage < allPageInParams) return lastPage?.nextPage;
      return undefined;
    }
  });
  
  const { pages } = data || [];
  
  return (
    <Row>
      <Col span={24} className="storeProducts--container">
        <Row justify="center">
          
          { !productsIsLoading ?
            <Col span={24}>
              <Row gutter={[20, 20]} className="row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                <SkeletonCategoryMultiColumn
                  skeleton = {true}
                  skeltonNumbers = {10}
                  width = { width }
                  height = {width >= 992 ? 300 : 261}
                />
              </Row>
            </Col> :
            <Col span={24}>
              <InfiniteScroll
                hasMore={hasNextPage}
                loadMore={fetchNextPage}
                loader={
                  <Col span={24} style={{ marginTop: 23 }}>
                    <Row gutter={[20, 20]} className="row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                      <SkeletonCategoryMultiColumn
                        skeleton = {true}
                        skeltonNumbers = {width >= 992 ? 5 : 2}
                        width = { width }
                        height = {width >= 992 ? 325 : 261}
                      />
                    </Row>
                  </Col>
                }
              >
                <Col span={24}>
                  <Row className="h-100 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" gutter={[ { xs:8, lg: 23 }, { xs:10, lg: 23 }]} justify={"center"}>
                    {pages?.map((page) =>
                      page?.results?.products.map(product => {
                        return (
                          <CategoryMultiColumn
                            key = { `store_product_${product?.product_id}` }
                            product={ product }
                            allDetails
                            widthProductImage={ width >= 992 ? 200 : 170 }
                            heightProductImage={ width >= 992 ? 200 : 170 }
                          />
                        );
                      })
                    )}
                  </Row>
                </Col>
              </InfiniteScroll>
            </Col>
          }
        </Row>
      </Col>
    </Row>
  );
};

export default StoreProducts;
