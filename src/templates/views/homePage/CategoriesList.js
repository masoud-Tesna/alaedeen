// import react router Link:
import {Link} from "react-router-dom";

// import styles:
import "./styles/CategoriesList.less";

// import antd components:
import {Col, Row, Skeleton} from "antd";

// import utilities function:
import {useTranslation} from "react-i18next";
import {useGetApiOld} from "../../../utilities/functions";
import {Else, If, Then} from "../../../utilities/functions/Helper";

// import extra component:
import SvgIcon from "../../common/SvgIcon";

const CategoryItem = ({category}) => {
  
  const { i18n: {dir} } = useTranslation();
  
  return (
    <Col span={24} className={`--categoryItem ${category?.p_count === 0 ? 'link--disable': ''}`}>
      <Row gutter={8} align="middle">
        <Col className="__image">
          <img src={ `${process.env.PUBLIC_URL}/categories-image/category-${category?.category_id}.svg` } alt={ category?.category }/>
        </Col>
        
        <Col style={{width: "calc(100% - 40px)"}}>
          <Row align="middle" justify="space-between">
            <Col className="__title">
              {category?.category}
            </Col>
            
            <Col className="__arrow">
              <SvgIcon icon={dir() === "rtl" ? "angle-left" : "angle-right"} width={16} height={16} />
            </Col>
          </Row>
        </Col>
      </Row>
      
      <Link to={ `/categories/${category?.seo_name}` } className={ `${category?.p_count === 0 ? 'link--disable': ''}` } />
    </Col>
  )
}

const CategorySkeleton = () => {
  return (
    <Col span={24} className="--categoryItem --skeleton">
      <Row gutter={8} align="middle">
        <Col className="__image">
          <Skeleton.Avatar active size="default" shape="circle" />
        </Col>
        
        <Col style={{width: "calc(100% - 40px)"}}>
          <Row align="middle" justify="space-between">
            <Col className="__title">
              <Skeleton.Input style={{ width: `calc(100% - ${Math.floor(Math.random() * 17) + 5}px)`, height: 22 }} active size={"small"} />
            </Col>
            
            <Col className="__arrow">
              <SvgIcon icon="angle-right" width={16} height={16} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  )
}

const CategoriesList = () => {
  
  const { t } = useTranslation();
  
  // get categories from API:
  const { isLoading, data: categoriesData } = useGetApiOld(
    `home-categories-api`,
    '',
    `allCategories`,
    {
      refetchOnWindowFocus: false
    }
  );
  const { categories } = categoriesData || {};
  
  return (
    <Row className="categoriesList--container">
      <Col span={24} className="--caption">
        {t("Categories")}
      </Col>
      
      <If condition={!!isLoading}>
        <Then>
          {
            Array.from({ length: 7 })?.map((_, i) => {
              return (
                <CategorySkeleton key={i} />
              )
            })
          }
        </Then>
        
        <Else>
          {
            categories?.slice(0, 7)?.map(category => {
              return <CategoryItem key={category?.category_id} category={category} />
            })
          }
        </Else>
      </If>
    </Row>
  );
};

export default CategoriesList;
