// react hooks:
import {memo} from "react";

// extra hooks:
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import rtl from "styled-components-rtl";

// antd components:
import {Col, Row} from "antd";

// style:
import "../styles/AlaedeenCharacter.less";

// alaedeen character:
import {ReactComponent as AlaedeenChar} from '../../../assets/images/alaedeen-char.svg';

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
