import React, { useEffect, useState } from 'react';

// import Style File:
import './styles/TopBrands.less';

// import ANT Design Components Used:
import { Col, Row } from "antd";

// import Another Components Used:
import axios from 'axios';
import { StripHtml } from '../../../functions/Func';
import SkeletonMultiColumnVertical from "../product_list_templates/SkeletonMultiColumnVertical";
import SkeletonTopBrands from "./SkeletonTopBrands";

const TopBrands = () => {

  const [load, setLoad] = useState(true);

  const [topBrands, setTopBrands] = useState([]);

  const [error, setError] = useState(null);

  const getTopBrandLists = () => {

    setLoad(true);

    const lang_code = 'en';

    const url = `https://hornb2b.com/top-brands/?items_per_page=5`;

    axios.get (url)
      .then ((res) => {
        setTopBrands(res.data.top_brands);
    })
      .catch ((error) => {
      setError(error);
    })
      .finally(() => {
        setLoad(false);
      });
  }
  console.log(topBrands)
  useEffect(() => {
    getTopBrandLists();
  }, []);
  return (
    <div className="topBrands--container">
      <Row>
        <Col className="topBrands--caption__content" span={24}>
          <Row justify="space-between">
            <Col className="text-33 text-uppercase vv-font-size-3 font-weight-bold">
             Top Brands
            </Col>
          </Row>
        </Col>
        <Col className="topBrands--items" span={24}>
          <Row className="h-100 bg-white rounded-10 shadow-y-2 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" justify="space-around" gutter={16}>
            {topBrands.map((brand, index) => {
              return (
                <Col className="topBrands--item" key={ index }>
                  <div className="d-flex align-items-end justify-content-center topBrands--item__image">
                    {brand.logo ?
                      <img src={ brand.logo.image_path } alt={ brand.logo.alt }/> :
                      <i className="fal fa-image text-bf" />
                    }

                  </div>
                  <div className="vv-font-size-2-2 text-47 text-center mt-3 topBrands--item__name">
                    { brand.company }
                  </div>
                  <div className="vv-font-size-1-9 text-8b text-center mt-3 topBrands--item__name">
                    { StripHtml (brand.company_description) }
                  </div>
                </Col>
              );
            })}

            {load &&
            <SkeletonTopBrands
              skeleton = {true}
              skeltonNumbers = {5}
              grid={{ span: 8 }}
            />
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TopBrands;