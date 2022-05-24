import "../styles/Reserved.less";
import {Col, Row} from "antd";
import {useTranslation} from "react-i18next";

const Reserved = () => {
  
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();
  
  return (
    <Row className="reserved--container">
      <Col span={24} className="text-center">
        © 2018 - {currentYear} {t('footer_reserved_msg')}
      </Col>
    </Row>
  );
};

export default Reserved;
