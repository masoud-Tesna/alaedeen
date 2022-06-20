import "../styles/DesktopHeader.less";
import {Button, Col, Row} from "antd";
import AlaedeenCharacter from "../components/AlaedeenCharacter";
import Search from "../components/Search";
import AccountActions from "../components/AccountActions";
import FavLink from "../components/FavLink";
import Menu from "../../../menu";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";

const DesktopHeader = ({ isHeader = true, isMenu = true }) => {
  
  const { t } = useTranslation();
  
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
    <Row className={`header--container ${!isHeader ? "--noHeader" : ""} ${!isMenu ? "--noMenu" : ""}`}>
      {
        !!isHeader &&
          <Col span={24} className={`--header ${!!sticky && "--isSticky"}`}>
            <Row gutter={16} align="middle" className="h-100">
              <Col span={6}>
                <AlaedeenCharacter />
              </Col>
  
              <Col span={10}>
                <Search />
              </Col>
  
              <Col span={8}>
                <Row justify={!!sticky ? "center" : "end"} align="middle" gutter={{lg: 16, xl: 18, xxl: 26}}>
                  {!!sticky ?
                    <Col className="--requestQuote">
                      <Button onClick={scrollToRequestSection} type="primary">{t("request_a_quote")}</Button>
                    </Col> :
                    <>
                      <Col lg={15} xl={13}>
                        <AccountActions />
                      </Col>
      
                      <Col lg={7} xl={6}>
                        <FavLink />
                      </Col>
                    </>
                  }
                </Row>
              </Col>
            </Row>
          </Col>
      }
  
      {
        !!isMenu &&
          <Col span={24} className={`--menu `}>
            <Menu />
          </Col>
      }
    </Row>
  );
};

export default DesktopHeader;
