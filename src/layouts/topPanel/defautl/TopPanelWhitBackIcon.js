import { useHistory } from "react-router-dom";

// import Styles For TopPanelWhitBackIcon:
import './styles.less';

// Ant Design Import:
import { Row, Col } from 'antd';
import { useTranslation } from "react-i18next";
import { __ } from "../../../functions/Helper";


const TopPanelWhitBackIcon = ({ scrolledClass, pathName }) => {
  const { t } = useTranslation();

  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return (
    <Row className={ `bg-top-panel topPanel--container TopPanelWhitBackIcon ${scrolledClass}` }>
      <Col span={24} className="topPanel--col">
        <Row className="h-100" gutter={24}>
          <Col className="d-lg-none my-auto vv-cursor-pointer topPanel--col__logoXS" onClick={() => { goBack() }}>
            <i className="far fa-long-arrow-left text-white display-4" />
          </Col>

          {/*if factories page show tag:*/}
          { pathName === 'factories' &&
            <Col className="d-lg-none my-auto text-white vv-font-size-2 font-weight-bold font-italic topPanel--col__titleXS">
              { t(__('Premium OEM Factories')) }
            </Col>
          }

          {/*if factories page show tag:*/}
          { pathName === 'all-categories' &&
          <Col className="my-auto text-white vv-font-size-2 font-weight-bold font-italic">
            { t(__('all categories')) }
          </Col>
          }

        </Row>
      </Col>
    </Row>
  );
};

export default TopPanelWhitBackIcon;