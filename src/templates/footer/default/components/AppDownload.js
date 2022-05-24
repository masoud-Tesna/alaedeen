import "../styles/AppDownload.less";
import alaedeenChar from '../../../assets/images/alaedeen-char.png';
import appleStore from "../../../assets/images/appleStore.svg";
import googlePlay from "../../../assets/images/googlePlay.svg";
import {Col, Row, Space, Tooltip} from "antd";
import {useTranslation} from "react-i18next";

const AppDownload = () => {
  const { t } = useTranslation();
  
  // Mobile Application Coming Son Tooltip Text:
  const comingSonTooltipText = <span>{ t('coming_son') }</span>;
  
  return (
    <Row className="appDownload--container" justify="space-between" align="middle">
      <Col>
        <Space size={40}>
          <div className="--character">
            <img src={alaedeenChar} alt="Alaedeen.com"/>
          </div>
          
          <div className="--caption">
            {t("download_application")}
          </div>
        </Space>
      </Col>
  
      <Col>
        <Space size={24}>
          <div className="--download">
            <Tooltip placement="top" title={comingSonTooltipText}>
              <img src={ appleStore } alt="_app_store" />
            </Tooltip>
          </div>
          <div className="--download">
            <Tooltip placement="top" title={comingSonTooltipText}>
              <img src={ googlePlay } alt="_google_play" />
            </Tooltip>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default AppDownload;
