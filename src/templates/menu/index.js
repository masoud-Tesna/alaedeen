import "./styles/Menu.less";
import {Col, Divider, Row, Space} from "antd";
import {CategoriesDropDownVertical as Categories} from "../blocks/categories/CategoriesDropDownVertical";
import {Link} from "react-router-dom";
import {__} from "../../functions/Helper";
import {useDispatchAuthState, useGetAuthState} from "../../contexts/user/UserContext";
import {useTranslation} from "react-i18next";
import {useWindowSize} from "../../functions";
import {useConfigDispatch, useGetConfig} from "../../contexts/config/ConfigContext";
import {useSpinnerDispatch} from "../../contexts/spiner/SpinnerContext";

const Menu = () => {
  
  const { user_data } = useGetAuthState();
  
  const { AuthDispatch } = useDispatchAuthState();
  
  const { t } = useTranslation();
  
  // get screen width:
  const { width } = useWindowSize();
  
  // initial state for language:
  const { config } = useGetConfig();
  const { configDispatch } = useConfigDispatch();
  
  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();
  
  return (
    <Row className="menu--container h-100" justify="space-between" align="middle">
      <Col className="--firstSection">
        <Space size="middle" align={"center"}>
          <Categories userClass="categories--dropDown topPanel--content__item hover" />
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
    
          {/*<a className="topPanel--content__item hover" href="https://alaedeen.com/horn/create-ticket" target="_blank" rel="noreferrer">
                <span className="topPanel--item__text">
                  {t(__('Free consultation'))}
                </span>
              </a>*/}
        </Space>
      </Col>
    </Row>
  );
};

export default Menu;
