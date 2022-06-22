// style:
import "../styles/AppDownload.less";

// antd components:
import {Col, Row, Space, Tooltip} from "antd";

// styled components:
import styled from "styled-components";
import rtl from "styled-components-rtl";

// translation hook:
import {useTranslation} from "react-i18next";

// icons:
import {ReactComponent as AlaedeenChar} from '../../../assets/images/alaedeen-char.svg';
import {ReactComponent as AppleStore} from "../../../assets/images/appleStore.svg";
import {ReactComponent as GooglePlay} from "../../../assets/images/googlePlay.svg";

const AppDl = styled.div`
  height: 40px;
  
  &,
  svg {
    border: 1px solid #FFFFFF;
    border-radius: 8px;
  }
`;

const AppStoreBox = ({Image}) => {
  const { t } = useTranslation();
  
  // Mobile Application Coming Son Tooltip Text:
  const comingSonTooltipText = <span>{ t('coming_son') }</span>;
  
  return (
    <AppDl>
      <Tooltip placement="top" title={comingSonTooltipText}>
        <Image width={130} height={40} />
      </Tooltip>
    </AppDl>
  );
}

const AppDownload = () => {
  const { t } = useTranslation();
  
  return (
    <Row className="appDownload--container" justify="space-between" align="middle">
      <Col>
        <Row gutter={24} align="middle">
          <Col className="--character">
            <AlaedeenChar width={24} height={48} />
          </Col>
  
          <Col className="--caption">
            {t("download_application")}
          </Col>
        </Row>
      </Col>
  
      <Col>
        <Row gutter={24}>
          <Col>
            <AppStoreBox
              Image={AppleStore}
            />
          </Col>
  
          <Col>
            <AppStoreBox
              Image={GooglePlay}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AppDownload;
