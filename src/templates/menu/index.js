// import antd components:
import {Col, Divider, Row, Space} from "antd";

// import extra hooks and context:
import {Link} from "react-router-dom";
import {__} from "../../utilities/functions/Helper";
import {useTranslation} from "react-i18next";
import {useGetConfig} from "../../contexts/config/ConfigContext";

// import components view:
import {CategoriesDropDownVertical as Categories} from "../blocks/categories/CategoriesDropDownVertical";
import LanguageDropDown from "./components/LanguageDropDown";

// import styled components:
import styled from "styled-components";
import rtl from "styled-components-rtl";

// import styles:
import "./styles/Menu.less";

// import svg icons:
import SvgIcon from "../common/SvgIcon";
const SecondSection = styled(Col)`
  ${rtl`
    padding-right: 1%;
  `};
`;

const Menu = () => {
  
  const { t } = useTranslation();
  
  // initial state for language:
  const { config } = useGetConfig();
  
  return (
    <Row className="menu--container h-100" justify="space-between">
      <Col className="--firstSection">
        <Space size="middle" align={"center"} className="h-100">
          <Categories />
          <Divider type="vertical" style={{borderColor: "#CED4DA"}}/>
          <Link className="--item __hover" to={"/factories"} >
                <span className="topPanel--item__text">
                  {t(__('Stores'))}
                </span>
          </Link>
    
          <a className="--item __hover" href={`https://calendar.iranfair.com/${config.language === 'ar'? '' : config.language}`} target="_blank" rel="noreferrer">
              <span className="topPanel--item__text">
                  {t(__('International Exhibition'))}
                </span>
          </a>
        </Space>
      </Col>
      
      <SecondSection className="--secondSection">
        <Space size="middle" align={"center"} className="h-100">
          <LanguageDropDown />
  
          <SvgIcon icon="message-question" color="#185E91" />
        </Space>
      </SecondSection>
    </Row>
  );
};

export default Menu;
