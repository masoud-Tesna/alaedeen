import { Dropdown, Menu } from "antd";
import { AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";

// import helper functions:
import { __ } from "../../../functions/Helper";

import { useTranslation } from "react-i18next";

// import custom hooks:
import { useGetApi } from "../../../functions";

const CategoriesContent = () => {
  const categories = useGetApi(`home-categories-api`, '', 'categories');

  return(
    <Menu
      style={{ minWidth: 250 }}
      mode="inline"
      triggerSubMenuAction={"click"}
    >
      {categories.load ?
        <>Loading...</> :
        <>
          {categories.items.map((category) => {
            return(
              <Menu.Item key={ category.category_id }>
                <a href={ category.link }>{ category.category }</a>
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

