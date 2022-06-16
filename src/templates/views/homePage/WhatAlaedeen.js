import {Link} from "react-router-dom";
import "./styles/WhatAlaedeen.less";
import {Button, Col, Row} from "antd";
import {useTranslation} from "react-i18next";
import {ReactComponent as BoxIcon} from "../../assets/svg-icon/what-alaedeen/box.svg";
import {ReactComponent as TruckIcon} from "../../assets/svg-icon/what-alaedeen/truck.svg";
import {ReactComponent as LikeIcon} from "../../assets/svg-icon/what-alaedeen/like.svg";
import {ReactComponent as ShapesIcon} from "../../assets/svg-icon/what-alaedeen/shapes.svg";

const WhatAlaedeen = () => {
  
  const {t} = useTranslation();
  
  const scrollToRequestSection = () => {
    window.scroll({ top: 148, behavior: 'smooth' });
  }
  
  return (
    <Row className="h-100 whatAlaedeen--container" gutter={[0, 48]}>
      
      <Col className="align-self-start">
        <Row gutter={[0, 48]}>
          <Col span={24} className="--caption">
            WHAT DOES ALAEDEEN DO?
          </Col>
          
          <Col span={24}>
            <Row gutter={[57, 48]} justify="space-between">
              <Col span={11} className="--item">
                <Row>
                  <Col span={24} className="__icon">
                    <BoxIcon />
                  </Col>
          
                  <Col span={24} className="--title">
                    Introducing Top Brands
                  </Col>
          
                  <Col span={24} className="__description">
                    Introduction of Iranian manufacturers & products
                  </Col>
                </Row>
              </Col>
      
              <Col span={11} className="--item">
                <Row>
                  <Col span={24} className="__icon">
                    <TruckIcon />
                  </Col>
          
                  <Col span={24} className="--title">
                    Freight Service
                  </Col>
          
                  <Col span={24} className="__description">
                    The introduction of the prestigious shipping companies
                  </Col>
                </Row>
              </Col>
      
              <Col span={11} className="--item">
                <Row>
                  <Col span={24} className="__icon">
                    <LikeIcon />
                  </Col>
          
                  <Col span={24} className="--title">
                    Experienced Guides
                  </Col>
          
                  <Col span={24} className="__description">
                    Advisers with experience in business affairs
                  </Col>
                </Row>
              </Col>
      
              <Col span={11} className="--item">
                <Row>
                  <Col span={24} className="__icon">
                    <ShapesIcon />
                  </Col>
          
                  <Col span={24} className="--title">
                    Introducing Top Brands
                  </Col>
          
                  <Col span={24} className="__description">
                    Introduction of Iranian manufacturers & products
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      
      <Col span={24} className="align-self-end">
        <Row gutter={27}>
          <Col span={12} className="--requestBtnAnchor">
            <Button onClick={scrollToRequestSection}>{t("request_a_quote")}</Button>
          </Col>
  
          <Col span={12} className="--aboutUsLink">
            <Link to="/page/alaedeen-about-us" className="__link">About Alaedeen</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default WhatAlaedeen;
