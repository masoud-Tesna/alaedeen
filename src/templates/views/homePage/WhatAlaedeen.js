// Link from react router:
import {Link} from "react-router-dom";

// style:
import "./styles/WhatAlaedeen.less";

// antd components:
import {Button, Col, Row} from "antd";

// translation hook:
import {useTranslation} from "react-i18next";

// svg icons:
import {ReactComponent as BoxIcon} from "../../assets/svg-icon/what-alaedeen/box.svg";
import {ReactComponent as TruckIcon} from "../../assets/svg-icon/what-alaedeen/truck.svg";
import {ReactComponent as LikeIcon} from "../../assets/svg-icon/what-alaedeen/like.svg";
import {ReactComponent as ShapesIcon} from "../../assets/svg-icon/what-alaedeen/shapes.svg";

const aboutItemObject = [
  {
    id: 1,
    icon: BoxIcon,
    title: "Introducing Top Brands",
    description: "Introduction of Iranian manufacturers & products",
  },
  {
    id: 2,
    icon: TruckIcon,
    title: "Freight Service",
    description: "The introduction of the prestigious shipping companies",
  },
  {
    id: 3,
    icon: LikeIcon,
    title: "Experienced Guides",
    description: "Advisers with experience in business affairs",
  },
  {
    id: 4,
    icon: ShapesIcon,
    title: "Introducing Top Brands",
    description: "Introduction of Iranian manufacturers & products",
  },
]

const AboutBox = ({Icon = <></>, title = "", description = ""}) => {
  
  const { t } = useTranslation();
  
  return (
    <Col span={11} className="--item">
      <Row>
        <Col span={24} className="__icon">
          <Icon />
        </Col>
      
        <Col span={24} className="--title">
          {t(title)}
        </Col>
      
        <Col span={24} className="__description">
          {t(description)}
        </Col>
      </Row>
    </Col>
  );
}

const WhatAlaedeen = () => {
  
  const { t } = useTranslation();
  
  const scrollToRequestSection = () => {
    window.scroll({ top: 148, behavior: 'smooth' });
  }
  
  return (
    <Row className="h-100 whatAlaedeen--container" gutter={[0, 48]}>
      
      <Col className="align-self-start">
        <Row gutter={[0, 48]}>
          <Col span={24} className="--caption">
            {t("What_does_alaedeen_do")}
          </Col>
          
          <Col span={24}>
            <Row gutter={[57, 48]} justify="space-between">
              {aboutItemObject?.map(item => {
                return(
                  <AboutBox
                    key={item?.id}
                    Icon={item?.icon}
                    title={item?.title}
                    description={item?.description}
                  />
                );
              })}
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
