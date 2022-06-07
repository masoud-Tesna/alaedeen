import "../styles/FavLink.less";
import {Col, Row, Tooltip} from "antd";
import {useTranslation} from "react-i18next";
import {__} from "../../../../utilities/functions/Helper";
import {Link} from "react-router-dom";
import SvgIcon from "../../../common/SvgIcon";

const FavLink = () => {
  
  const { t } = useTranslation();
  const favTitle = (
    <>
      {t(__("you haven't login"))} <Link to="/sign-in">{t(__("please login."))}</Link>
    </>
  );
  
  return (
    <Tooltip placement="bottomRight" title={favTitle} color="#FFF" overlayClassName="favLink--tooltip">
      <Row className="favLink--container">
        <Col span={24} className="--logo">
          <SvgIcon icon="heart" />
        </Col>
        <Col span={24} className="--text">
          {t("favorites")}
        </Col>
      </Row>
    </Tooltip>
  );
};

export default FavLink;
