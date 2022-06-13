import "../styles/Categories.less";
import {Col, Row} from "antd";

const Categories = () => {
  
  const CategoryItem = ({category}) => {
    return (
      <Col span={24}>{category}</Col>
    )
  }
  
  return (
    <Row className="categories--container" gutter={[0, 30]}>
      <Col span={24} className="--caption">
        Categories
      </Col>
      
      <CategoryItem category={'Category 1'} />
      <CategoryItem category={'Category 2'} />
      <CategoryItem category={'Category 3'} />
      <CategoryItem category={'Category 4'} />
      <CategoryItem category={'Category 5'} />
      <CategoryItem category={'Category 6'} />
      <CategoryItem category={'Category 7'} />
    </Row>
  );
};

export default Categories;
