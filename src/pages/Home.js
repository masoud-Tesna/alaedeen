import React, { useEffect, useState } from 'react';

// import Custom Hooks:
import { useWindowSize } from '../functions';

// import Style LESS File:
import './home.less';

// import Design:
import { Button, Col, Row } from "antd";

// import blocks:
import CategoriesMultiColumn from "../layouts/blocks/categories/CategoriesMultiColumn";
import HomeLogisticsBanner from "../layouts/blocks/static_templates/HomeLogisticsBanner";
import { OneRequestMultipleQuotes as RequestForm } from "../layouts/blocks/static_templates/OneRequestMultipleQuotes";
import RequestsList from "../layouts/blocks/static_templates/RequestsList";
import Stats from "../layouts/blocks/static_templates/Stats";
import ShipProductsBanner from "../layouts/blocks/static_templates/ShipProductsBanner";
import ProductsMultiColumnVertical from "../layouts/blocks/product_list_templates/ProductsMultiColumnVertical";
import TopRankingProducts from "../layouts/blocks/static_templates/TopRankingProducts";
import PremiumFactories from "../layouts/blocks/static_templates/PremiumFactories";
import RecommendedProducts from "../layouts/blocks/static_templates/RecommendedProducts";
import axios from "axios";
import SkeletonMultiColumnVertical from "../layouts/blocks/product_list_templates/SkeletonMultiColumnVertical";
import RecentlyProductsView from "../layouts/blocks/static_templates/RecentlyProductsView";
import TopBrands from "../layouts/blocks/static_templates/TopBrands";
import WhatHorn from "../layouts/blocks/static_templates/WhatHorn";

const Home = () => {

  const [load, setLoad] = useState(true);

  const [getProducts, setGetProducts] = useState([]);

  const [error, setError] = useState(null);

  const { width } = useWindowSize();

  let productsMultiColumnVertical_items = { span: 8 };

  if (width >= 992) {
    productsMultiColumnVertical_items = { span: 8 };
  }else {
    productsMultiColumnVertical_items = { span: 12 };
  }

  const getProductLists = () => {

    setLoad(true);

    const lang_code = 'en';

    let items_per_page = 2;

    if (width >= 992) {
      items_per_page = 3;
    }

    const url = `https://hornb2b.com/products-api/?items_per_page=${items_per_page}&company_id=181&lang_code=${lang_code}`;

    axios.get (url)
      .then ((res) => {
      setGetProducts(res.data.products);
    })
      .catch ((error) => {
      setError(error);
    })
      .finally(() => {
        setLoad(false);
      });
  }

  useEffect(() => {
    document.title = "horn.company: Iranian Exporters, Manufacturers, Logistics, Suppliers Directory, B2B Business Directory"
    getProductLists();
  }, []);

  return (
    <>
      <div className="top--section bg-white">
        <Row gutter={width >= 992 && 24}>
          {/* if Screen Width >= 992px (Desktop) Show Component: */}
          {width >= 992 &&
            <Col span={6}>
              <CategoriesMultiColumn />
            </Col>
          }

          <Col span={width >= 992 ? 12 : 24}>
            <HomeLogisticsBanner />
          </Col>

          {/* if Screen Width <= 991px (Mobile) Show Component: */}
          {width <= 991 &&
            <Col span={24}>
              <CategoriesMultiColumn />
            </Col>
          }

          {/* if Screen Width >= 992px (Desktop) Show Component: */}
          {width >= 992 ?
            <Col span={6}>
              <Row className="h-100">
                <Col className="topSection--requestForm" span={24}>
                  <RequestForm />
                </Col>
                <Col className="topSection--requestsList" span={24}>
                  <RequestsList />
                </Col>
              </Row>
            </Col> :
            /* if Screen Width <= 991px (Mobile) Show Component: */
            <Col span={24} className="px-3">
              <RequestsList />
            </Col>
          }


        </Row>
      </div>

      <div className="stats--section">
        <Stats />
      </div>

      <div className="shipProductsBanner--section product--section">
        <Row className="rounded-10 shadow-y-2 bg-white section--row" gutter={{ xs: 0, lg: 16 }}>
          <Col className="pl-0" span={10}>
            <ShipProductsBanner />
          </Col>
          <Col className="pr-0" span={14}>
            <Row className="h-100 productsMultiColumnVertical--items" justify="space-around">

              {getProducts.map((product) => {
                return (<ProductsMultiColumnVertical
                  key = { product.product_id }
                  product={product}
                  detailIcon="company"
                  grid={productsMultiColumnVertical_items}
                />);
              })}

              {load &&
              <SkeletonMultiColumnVertical
                skeleton = {true}
                skeltonNumbers = {width >= 992 ? 3 : 2}
                grid={productsMultiColumnVertical_items}
                width = { width }
              />
              }
            </Row>
          </Col>
        </Row>
      </div>

      <div className="topRankingProducts--section">
        <TopRankingProducts />
      </div>

      <div className="PremiumFactories--section">
        <PremiumFactories />
      </div>

      <div className="recommended--section">
        <RecommendedProducts />
      </div>

      <div className="visitsProducts--section">
        <RecentlyProductsView />
      </div>

      <div className="topBrands--section">
        <TopBrands />
      </div>

      <div className="whatHorn--section">
        <WhatHorn />
      </div>
    </>
  );
};

export { Home };