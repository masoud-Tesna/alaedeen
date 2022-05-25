import "./styles/Header.less";
import {Button, Col, Divider, Row} from "antd";
import {useGetAuthState} from "../../../contexts/user/UserContext";
import AlaedeenCharacter from "./components/AlaedeenCharacter";
import Search from "./components/Search";
import AccountActions from "./components/AccountActions";
import FavLink from "./components/FavLink";
import Menu from "../../menu";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const Header = () => {
  
  const { user_data } = useGetAuthState();
  
  const { t } = useTranslation();
  
  const accountActionSpan = !!(user_data.auth.user_id) ? {span: 17} : null;
  
  const scrollToRequestSection = () => {
    window.scroll({ top: 148, behavior: 'smooth' });
  }
  
  const [sticky, setSticky] = useState(false);
  
  const trackScroll = () => {
    const offsetY = window.scrollY;
    
    if (typeof window === "undefined") {
      return;
    } else {
      setSticky(offsetY > 200);
    }
  };
  
  useEffect(() => {
    document.addEventListener("scroll", trackScroll);
    
    return () => {
      document.removeEventListener("scroll", trackScroll);
    };
  }, []);
  
  return (
    <Row className="header--container">
      <Col span={24} className={`--header ${!!sticky && "--isSticky"}`}>
        <Row gutter={{ md: 8, lg: 16, xl: 40 }}>
          <Col span={6}>
            <AlaedeenCharacter />
          </Col>
        
          <Col span={sticky ? 12 : !!(user_data.auth.user_id) ? 11 : 12}>
            <Search />
          </Col>
        
          <Col span={sticky ? 6 : !!(user_data.auth.user_id) ? 7 : 6}>
            <Row justify={!!sticky ? "center" : "space-between"} align="middle" className="h-100">
              {!!sticky ?
                <Col className="--requestQuote">
                  <Button onClick={scrollToRequestSection} type="primary">{t("request_a_quote")}</Button>
                </Col> :
                <>
                  <Col {...accountActionSpan}>
                    <AccountActions />
                  </Col>
  
                  <Col>
                    <FavLink />
                  </Col>
                </>
              }
            </Row>
          </Col>
        </Row>
      </Col>
    
      <Divider className={`m-0 `} />
    
      <Col span={24} className={`--menu `}>
        <Menu />
      </Col>
    </Row>
  );
};

export default Header;
