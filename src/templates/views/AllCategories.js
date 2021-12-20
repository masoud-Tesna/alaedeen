// import style file:
import './styles/AllCategories.less';
import { useGetApi } from "../../functions";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { __, SeoGenerator } from "../../functions/Helper";
import { useTranslation } from "react-i18next";

const AllCategories = () => {

  const { t } = useTranslation();

  // get categories from API:
  const { isLoading, data } = useGetApi(`home-categories-api`, '', `allCategories`);

  const { categories } = data || [];

  return (
    <Row className="allCategories--container">
      <SeoGenerator
        title={ t(__('all categories')) }
        description={ t('alaedeen_description') }
        keywords={ t('alaedeen_keywords') }
      />
      {isLoading ?
        <Col span={24} className="allCategories--loading">Loading...</Col> :
        <>
          {categories?.map((category) => {
            return(
              <Col span={24} className="allCategories--item" style={{ paddingLeft: `${category?.level - 2}rem` }} key={ category?.category_id }>
                {/*link: /categories/${category?.seo_name}*/}
                <Link to={ `/categories/${category?.seo_name}` } className={`font-weight-600 d-block w-100 h-100 ${category?.p_count === 0 ? 'link--disable': ''}`}>{ category?.category }</Link>
              </Col>
            )
          })}
        </>
      }
    </Row>
  );
};

export default AllCategories;
