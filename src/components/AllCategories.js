// import style file:
import './styles/AllCategories.less';
import { useGetApi } from "../functions";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

const AllCategories = () => {

  // get categories from API:
  const { isLoading, data } = useGetApi(`home-categories-api`, '', `allCategories`);

  const { categories } = data || [];

  return (
    <Row className="allCategories--container">
      {isLoading ?
        <Col span={24} className="allCategories--loading">Loading...</Col> :
        <>
          {categories?.map((category) => {
            return(
              <Col span={24} className="allCategories--item" style={{ paddingLeft: `${category?.level - 2}rem` }} key={ category?.category_id }>
                {/*link: /categories/${category?.seo_name}*/}
                <Link to={ `/` } className="text-47 font-weight-600 d-block w-100 h-100">{ category?.category }</Link>
              </Col>
            )
          })}
        </>
      }
    </Row>
  );
};

export { AllCategories };
