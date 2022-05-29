import "../styles/DesktopHeader.less";
import {Button, Col, Row} from "antd";
import AlaedeenCharacter from "../components/AlaedeenCharacter";
import Search from "../components/Search";
import AccountActions from "../components/AccountActions";
import FavLink from "../components/FavLink";
import Menu from "../../../menu";
import {useGetAuthState} from "../../../../contexts/user/UserContext";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

const DesktopHeader = () => {
  
  const { user_data } = useGetAuthState();
  
  const { t } = useTranslation();
  
  const accountActionSpan = (!!(user_data.auth.user_id) || user_data.load) ? {span: 19} : null;
  
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
        <Row gutter={{ md: 8, lg: 16, xl: 40 }} align="middle" className="h-100">
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
                
                  <Col span={4}>
                    <FavLink />
                  </Col>
                </>
              }
            </Row>
          </Col>
        </Row>
      </Col>
    
      <Col span={24} className={`--menu `}>
        <Menu />
      </Col>
    </Row>
  );
};

export default DesktopHeader;
