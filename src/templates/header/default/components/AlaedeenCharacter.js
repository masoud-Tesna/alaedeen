// import react hooks:
import {memo} from "react";

// import hooks:
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import styled from "styled-components";

// import antd components:
import {Col, Row} from "antd";

// import style:
import "../styles/AlaedeenCharacter.less";

// import alaedeen character:
import {ReactComponent as AlaedeenChar} from '../../../assets/images/alaedeen-char.svg';

import rtl from "styled-components-rtl"

const Extra = styled(Col)`
    ${rtl`
      padding-left: 5px;
    `};
  `;

const AlaedeenCharacter = () => {
  
  const { t } = useTranslation();
  
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
