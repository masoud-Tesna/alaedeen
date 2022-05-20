import "./styles/Header.less";
import {Col, Divider, Row} from "antd";
import AlaedeenCharacter from "./components/AlaedeenCharacter";
import Search from "./components/Search";
import AccountActions from "./components/AccountActions";
import {useGetAuthState} from "../../../contexts/user/UserContext";

const Header = () => {
  
  const { user_data } = useGetAuthState();
  
  return (
    <Row className="header--container">
      <Col span={24} className="--header">
        <Row gutter={{ md: 8, lg: 16, xl: 40 }}>
          <Col span={5}>
            <AlaedeenCharacter />
          </Col>
          
          <Col span={10}>
            <Search />
          </Col>
          
          <Col span={9}>
            <Row gutter={15}>
              <Col span={user_data.auth.user_id ? 15 : 13}>
                <AccountActions />
              </Col>
              
              <Col span={user_data.auth.user_id ? 9 : 11}>
                Fav
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      
      <Divider />
  
      <Col span={24} className="--menu">
        Menu
      </Col>
    </Row>
  );
};

export default Header;
