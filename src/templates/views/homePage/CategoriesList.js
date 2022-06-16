import "./styles/CategoriesList.less";
import {Col, Row, Skeleton} from "antd";
import { Choose, When, Otherwise } from "control-statements";
import {useGetApiOld} from "../../../utilities/functions";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import SvgIcon from "../../common/SvgIcon";
import React from "react";

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
  
  const CategoryItem = ({category}) => {
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
                <SvgIcon icon="angle-right" width={16} height={16} />
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
  
  return (
    <Row className="categoriesList--container">
      <Col span={24} className="--caption">
        {t("Categories")}
      </Col>
  
      <Choose>
        <When condition={!!isLoading}>
          {
            new Array(6).fill("", 0, 6).map((__, i) => {
              return (
                <CategorySkeleton key={i} />
              )
            })
          }
          <CategorySkeleton />
        </When>
        <Otherwise>
          {
            categories?.slice(0, 7)?.map(category => {
              return <CategoryItem key={category?.category_id} category={category} />
            })
          }
        </Otherwise>
      </Choose>
      
    </Row>
  );
};

export default CategoriesList;
