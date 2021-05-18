import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";


const CategoriesContent = (
  <Menu className="menu-test">
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

const CategoriesDropDownVertical = ({ userClass }) => {
  return (
    <Dropdown className={ userClass } overlay={CategoriesContent} trigger={['click']}>
      <span className="vv-cursor-pointer" onClick={e => e.preventDefault()}>
        <i className="fal fa-list-ul mr-3 vv-font-size-2" />
        <span className="topPanel--item__text">Categories</span>
        <DownOutlined className="ml-3" />
      </span>
    </Dropdown>
  );
};

export { CategoriesDropDownVertical };

