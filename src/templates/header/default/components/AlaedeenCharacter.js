import "../styles/AlaedeenCharacter.less";
// import alaedeen character:
import alaedeenChar from '../../../assets/images/alaedeen-char.png';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Col, Row} from "antd";

const AlaedeenCharacter = () => {
  
  const { t } = useTranslation();
  
  return (
    <Row className="alaedeenCharacter--container">
      <Col className="--character">
        <img src={alaedeenChar} alt="Alaedeen.com"/>
      </Col>
      
      <Col className="--extra">
        <div className="__address">
          <i className="logo-icon-alaedeen-com" />
        </div>
        <div className="__slug">
          { t('alaedeen_slug_section') }
        </div>
      </Col>
      
      <Link to={"/"} className="--link" />
    </Row>
  );
};

export default AlaedeenCharacter;
