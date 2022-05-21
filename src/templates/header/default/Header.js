import "./styles/Header.less";
import {Col, Divider, Row} from "antd";
import AlaedeenCharacter from "./components/AlaedeenCharacter";
import Search from "./components/Search";
import AccountActions from "./components/AccountActions";
import FavLink from "./components/FavLink";
import {useGetAuthState} from "../../../contexts/user/UserContext";
import Menu from "../../menu";

const Header = () => {
  
  const { user_data } = useGetAuthState();
  
  const accountActionSpan = !!(user_data.auth.user_id) ? {span: 17} : null;
  
  return (
    <Row className="header--container">
      <Col span={24} className="--header">
        <Row gutter={{ md: 8, lg: 16, xl: 40 }}>
          <Col span={6}>
            <AlaedeenCharacter />
          </Col>
          
          <Col span={!!(user_data.auth.user_id) ? 11 : 12}>
            <Search />
          </Col>
          
          <Col span={!!(user_data.auth.user_id) ? 7 : 6}>
            <Row justify="space-between" align="middle">
              <Col {...accountActionSpan}>
                <AccountActions />
              </Col>
              
              <Col>
                <FavLink />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      
      <Divider className="m-0" />
  
      <Col span={24} className="--menu">
        <Menu />
      </Col>
    </Row>
  );
};

export default Header;
