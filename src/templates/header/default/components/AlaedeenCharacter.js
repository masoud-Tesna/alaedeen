import "../styles/AlaedeenCharacter.less";
// import alaedeen character:
import {ReactComponent as AlaedeenChar} from '../../../assets/images/alaedeen-char.svg';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Col, Row} from "antd";
import {memo} from "react";
import styled from "styled-components";

import rtl from "styled-components-rtl"

const AlaedeenCharacter = () => {
  
  const { t } = useTranslation();
  
  const Extra = styled(Col)`
    ${rtl`
      padding-left: 5px;
    `};
  `;
  
  return (
    <Row className="alaedeenCharacter--container" align="middle">
      <Col className="--character">
        <AlaedeenChar width={26} />
      </Col>
      
      <Extra className="--extra">
        <div className="__address">
          <i className="logo-icon-alaedeen-com" />
        </div>
        <div className="__slug">
          { t('alaedeen_slug_section') }
        </div>
      </Extra>
      
      <Link to={"/"} className="--link" />
    </Row>
  );
};

export default memo(AlaedeenCharacter);
