// import style file:
import './styles/AllCategories.less';
import { useGetApi } from "../functions";
import { Col, Menu, Row } from "antd";

const AllCategories = () => {

  const categories = useGetApi(`home-categories-api`, '', 'categories');

  console.log(categories)

  return (
    <Row className="allCategories--container">
      {categories.load ?
        <Col span={24} className="allCategories--loading">Loading...</Col> :
        <>
          {categories.items.map((category) => {
            return(
              <Col span={24} className="allCategories--item" style={{ paddingLeft: `${category.level - 2}rem` }} key={ category.category_id }>
                <a href={ category.link } className="text-47 font-weight-600 d-block w-100 h-100">{ category.category }</a>
              </Col>
            )
          })}
        </>
      }
    </Row>
  );
};

export { AllCategories };
