// import react hooks:
import {useState} from "react";

// import antd components:
import {Col, Dropdown, Menu, Row, Skeleton} from "antd";

// import antd icons:
import { DownOutlined } from "@ant-design/icons";

// import helper functions:
import { __ } from "../../../utilities/functions/Helper";

// import translation function:
import { useTranslation } from "react-i18next";

// import custom hooks:
import { useGetApiOld } from "../../../utilities/functions";
import { Link } from "react-router-dom";

// import svg icons:
import SvgIcon from "../../common/SvgIcon";

// import styles:
import "./styles/CategoriesDropDownVertical.less";

const CategoriesContent = () => {

  // get categories from API:
  const { isLoading, data } = useGetApiOld(
    `home-categories-api`,
    '',
    `allCategories`,
    {
      refetchOnWindowFocus: false
    }
  );
  const { categories } = data || [];

  return(
    <Menu
      style={{ minWidth: 250 }}
      triggerSubMenuAction={"click"}
      className="dropDownCategories--content"
    >
      {isLoading ?
        Array.from({ length: 9 })?.map((__, i) => {
          return(
            <Menu.Item  key={`topPanelCategoriesDropDownLoading_${i}`}>
              <Skeleton.Input style={{ height: 12 }} active size={"small"} />
            </Menu.Item>
          )
        }) :
        <>
          {categories?.map((category) => {
            return(
              <Menu.Item key={ `topPanelCategoriesDropDown_${category?.category_id}` } className={category?.p_count === 0 ? 'item--disable': ''} >
                <Link to={ `/categories/${category?.seo_name}` } className={ `d-block ${category?.p_count === 0 ? 'link--disable': ''}` }>
                  <img src={ `${process.env.PUBLIC_URL}/categories-image/category-${category?.category_id}.svg` } alt={ category?.category }/>
                  <span>{ category?.category }</span>
                </Link>
              </Menu.Item>
            )
          })}
        </>
      }
    </Menu>
  );
};

const CategoriesDropDownVertical = () => {

  const { t } = useTranslation();
  
  const [dropDownIsActive, setDropDownIsActive] = useState(false);

  return (
    <Dropdown
      className="topPanelCategoriesDropDown"
      overlayClassName="topPanelCategoriesDropDown__DropDownIsOpen"
      overlay={CategoriesContent()}
      trigger={['click']}
      onVisibleChange={setDropDownIsActive}
    >
      <Row gutter={7} className="vv-cursor-pointer" onClick={e => e.preventDefault()}>
        <Col className="--listIcon" flex="18px">
          <SvgIcon icon="list" width={20} height={20} />
        </Col>
        
        <Col className="--text" flex="1 1">
          {t(__('Categories'))}
        </Col>
        
        <Col className="--arrowIcon" flex="13px">
          <DownOutlined rotate={ dropDownIsActive ? 180 : 0} />
        </Col>
      </Row>
    </Dropdown>
  );
};

export { CategoriesDropDownVertical };

