import "./styles/DashboardContentHeader.less"

import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../functions/Helper";

import {DashboardDrawerContext} from "../../templates/DashboardMain";

const DashboardContentHeader = ({page}) => {

  const { t } = useTranslation();

  return (
    <Row className="dashboardContentHeader" justify="space-between">
      <Col className="dashboardContentHeader--caption">
        {t(__(page))}
      </Col>

      <Col className="d-lg-none dashboardContentHeader--toggleDrawer">
        <DashboardDrawerContext.Consumer>
          {toggleDrawer => (
            <Button type="link"  onClick={() => toggleDrawer()}>
              <i className="fas fa-grip-lines" />
            </Button>
          )}
        </DashboardDrawerContext.Consumer>

      </Col>
    </Row>
  );
};

export default DashboardContentHeader;
