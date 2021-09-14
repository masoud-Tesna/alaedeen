// import Style LESS File:
import './styles/CategoriesMultiColumn.less';

import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

// import helper functions:
import { __ } from "../../../functions/Helper";

import { useTranslation } from "react-i18next";

// import custom hooks:
import { useGetApi } from "../../../functions";
import { Link } from "react-router-dom";

const CategoriesContent = () => {

  // get categories from API:
  const { isLoading, data } = useGetApi(`home-categories-api`, '', `allCategories`);

  const { categories } = data || [];

  return(
    <Menu
      style={{ minWidth: 250 }}
      triggerSubMenuAction={"click"}
      className="dropDownCategories--content"
    >
      {isLoading ?
        <>Loading...</> :
        <>
          {categories?.map((category) => {
            return(
              <Menu.Item key={ category?.category_id }>
                <Link to={ `/categories/${category?.seo_name}` } className={ `d-block ${category?.p_count === 0 && 'categoryLink--disable'}` }>{ category?.category }</Link>
              </Menu.Item>
            )
          })}
        </>
      }
    </Menu>
  );
};

const CategoriesDropDownVertical = ({ userClass }) => {

  const { t } = useTranslation();

  return (
    <Dropdown className={ userClass } overlay={CategoriesContent()} trigger={['click']}>
      <span className="vv-cursor-pointer" onClick={e => e.preventDefault()}>
        <i className="fal fa-list-ul mr-3 vv-font-size-2" />
        <span className="topPanel--item__text">{t(__('Categories'))}</span>
        <DownOutlined className="ml-3" />
      </span>
    </Dropdown>
  );
};

export { CategoriesDropDownVertical };

