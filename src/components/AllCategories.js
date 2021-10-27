// import style file:
import './styles/AllCategories.less';
import { useGetApi } from "../functions";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { __ } from "../functions/Helper";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const AllCategories = () => {

  const { t } = useTranslation();

  // get categories from API:
  const { isLoading, data } = useGetApi(`home-categories-api`, '', `allCategories`);

  const { categories } = data || [];

  return (
    <Row className="allCategories--container">
      <Helmet>
        <title>{ `Alaedeen.com | ${ t(__('all categories')) }` }</title>
      </Helmet>
      {isLoading ?
        <Col span={24} className="allCategories--loading">Loading...</Col> :
        <>
          {categories?.map((category) => {
            return(
              <Col span={24} className="allCategories--item" style={{ paddingLeft: `${category?.level - 2}rem` }} key={ category?.category_id }>
                {/*link: /categories/${category?.seo_name}*/}
                <Link to={ `/categories/${category?.seo_name}` } className={`font-weight-600 d-block w-100 h-100 ${category?.p_count === 0 && 'categoryLink--disable'}`}>{ category?.category }</Link>
              </Col>
            )
          })}
        </>
      }
    </Row>
  );
};

export { AllCategories };
