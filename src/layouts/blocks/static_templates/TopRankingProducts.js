import React, { useEffect, useState } from 'react';

// import style file:
import './styles/TopRankingProducts.less';

// import ANT Design Components used:
import { Col, Row, Skeleton } from "antd";

// import Another Components used:
import ProductsMultiColumnHorizontal from "../product_list_templates/ProductsMultiColumnHorizontal";
import axios from "axios";
import SkeletonMultiColumnHorizontal from "../product_list_templates/SkeletonMultiColumnHorizontal";


const TopRankingProducts = () => {

  const [loadCarpets, setLoadCarpets] = useState(true);
  const [loadHandmadeCarpet, setLoadHandmadeCarpet] = useState(true);
  const [loadBabyCarpet, setLoadBabyCarpet] = useState(true);

  const [getProductsCarpets, setGetProductsCarpets] = useState([]);
  const [getProductsHandmadeCarpet, setGetProductsHandmadeCarpet] = useState([]);
  const [getProductsBabyCarpet, setGetProductsBabyCarpet] = useState([]);

  const [error, setError] = useState(null);

  const getProductLists = () => {

    setLoadCarpets(true);
    setLoadHandmadeCarpet(true);
    setLoadBabyCarpet(true);

    const lang_code = 'en';

    const urlCarpets = `https://hornb2b.com/products-api/?items_per_page=3&company_id=181&page=1lang_code=${lang_code}`;
    const urlHandmadeCarpet = `https://hornb2b.com/products-api/?items_per_page=3&company_id=181&page=2lang_code=${lang_code}`;
    const urlBabyCarpet = `https://hornb2b.com/products-api/?items_per_page=3&page=4company_id=181&lang_code=${lang_code}`;

    axios.all([axios.get(urlCarpets),
      axios.get(urlHandmadeCarpet),
      axios.get(urlBabyCarpet)])
      .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {
        setGetProductsCarpets(firstResponse.data.products);
        setGetProductsHandmadeCarpet(secondResponse.data.products);
        setGetProductsBabyCarpet(thirdResponse.data.products);
      }))
      .catch ((error) => {
        setError(error);
      })
      .finally(() => {
        setLoadCarpets(false);
        setLoadHandmadeCarpet(false);
        setLoadBabyCarpet(false);
      });
  }

  useEffect(() => {
    getProductLists();
  }, []);

  return (
    <div className="TopRankingProducts--container">
      <Row>
        <Col className="TopRankingProducts--caption__content" span={24}>
          <Row justify="space-between">
            <Col className="text-33 text-uppercase vv-font-size-3 font-weight-bold">
              TOP-RANKING PRODUCTS
            </Col>
            <Col className="my-auto">
              <a className="vv-font-size-1-8 text-33">View More <i
                className="far fa-chevron-right vv-font-size-1-8 ml-3" /></a>
            </Col>
          </Row>
        </Col>
        <Col className="rounded-10 shadow-y-2 bg-white py-5 topRankingProducts--content" span={24}>
          <Row className="topRankingProducts--items">
            <Col className="topRankingProducts--item px-4" span={8}>
              <div className="ProductsMultiColumnHorizontal--container">
                <Row className="ProductsMultiColumnHorizontal--content row-cols-1">
                  <Col className="text-black vv-font-size-2 font-weight-bold mb-3" span={24}>
                    {loadCarpets ?
                      <Skeleton.Input style={{ width: 150, borderRadius: '10px' }} active={true} size={"small"} /> :
                      "Carpets"
                    }
                  </Col>
                  {getProductsCarpets.map((product, i) => {
                    return (
                      <ProductsMultiColumnHorizontal
                        key = { i }
                        productKey = { i }
                        product= {product}
                      />
                    );
                  })}

                  {loadCarpets &&
                  <SkeletonMultiColumnHorizontal
                    skeleton = {true}
                    skeltonNumbers = {4}
                    className="SkeletonMultiColumnHorizontal"
                  />
                  }
                </Row>
              </div>
            </Col>

            <Col className="topRankingProducts--item px-4" span={8}>
              <div className="ProductsMultiColumnHorizontal--container">
                <Row className="ProductsMultiColumnHorizontal--content row-cols-1">
                  <Col className="text-black vv-font-size-2 font-weight-bold mb-3" span={24}>
                    {loadHandmadeCarpet ?
                      <Skeleton.Input style={{ width: 150, borderRadius: '10px' }} active={true} size={"small"} /> :
                      "Handmade carpet"
                    }
                  </Col>
                  {getProductsHandmadeCarpet.map((product, i) => {
                    return (
                      <ProductsMultiColumnHorizontal
                        key = { i }
                        productKey = { i }
                        product= {product}
                      />
                    );
                  })}
                  {loadHandmadeCarpet &&
                  <SkeletonMultiColumnHorizontal
                    skeleton = {true}
                    skeltonNumbers = {4}
                    className="SkeletonMultiColumnHorizontal"
                  />
                  }
                </Row>
              </div>
            </Col>

            <Col className="topRankingProducts--item px-4" span={8}>
              <div className="ProductsMultiColumnHorizontal--container">
                <Row className="ProductsMultiColumnHorizontal--content row-cols-1">
                  <Col className="text-black vv-font-size-2 font-weight-bold mb-3" span={24}>
                    {loadBabyCarpet ?
                      <Skeleton.Input style={{ width: 150, borderRadius: '10px' }} active={true} size={"small"} /> :
                      "Kids & Baby Carpet"
                    }
                  </Col>
                  {getProductsBabyCarpet.map((product, i) => {
                    return (
                      <ProductsMultiColumnHorizontal
                        key = { i }
                        productKey = { i }
                        product= {product}
                      />
                    );
                  })}
                  {loadBabyCarpet &&
                  <SkeletonMultiColumnHorizontal
                    skeleton = {true}
                    skeltonNumbers = {4}
                    className="SkeletonMultiColumnHorizontal"
                  />
                  }
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TopRankingProducts;