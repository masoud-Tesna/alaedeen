// import styles:
import './styles/ShipProductsBanner.less';

// import Ant Design Components:
import { Button, Col, Row } from "antd";

// import another components used:
import { useWindowSize } from "../../../utilities/functions";

// import helper functions:
import { __ } from '../../../utilities/functions/Helper';

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ShipProductsBanner = () => {

  const { t } = useTranslation();

  const { width } = useWindowSize();

  return (
    <div className="h-100 shipProductsBanner--container">
      <Link className="d-block h-100" to={ "/ready-to-ship" }>
        <Row className={ `h-100 ${width >= 992 ? 'px-5 pt-4' : 'px-3 py-3'}  shipProductsBanner--content` }>
          <Col className="shipProductsBanner--content__topSection" span={24}>
            <div className={ `text-black ${width >= 992 ? 'vv-font-size-2-2' : 'vv-font-size-1-5'} font-weight-bold shipProductsBanner--content__caption1` }>{ t(__('Ready-to-ship products')) }</div>
            <div className="text-black vv-font-size-1-9 font-weight-500 mt-3 shipProductsBanner--content__caption2 d-none d-lg-block">
              { t(__('Source from products that are ready to ship, and leave the facility within 15 days.')) }
            </div>
          </Col>
          <Col span={24} className={ `text-center ${ width <= 992 && 'align-self-end' } shipProductsBanner--content__btn` }>
            <Button className="p-0 bg-white border-0" type="primary" shape="round" size="large">
              { t(__('View more')) }
            </Button>
          </Col>
        </Row>
      </Link>

    </div>
  );
};

export default ShipProductsBanner;