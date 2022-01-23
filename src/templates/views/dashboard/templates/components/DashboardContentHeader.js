import "./styles/DashboardContentHeader.less"

import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../functions/Helper";

import { DashboardDrawerContext } from "../../templates/DashboardMain";
import { Link } from "react-router-dom";

const DashboardContentHeader = ({page, linkText, linkHref, linkOnClick, linkIcon}) => {

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

      {(linkText || linkIcon) &&
        <Col className="d-none d-lg-block dashboardContentHeader--extraLink">
          {linkHref &&
            <Link to={linkHref}>
              <Button className="product--add__link" icon={linkIcon} >
                {t(__(linkText))}
              </Button>
            </Link>
          }

          {linkOnClick &&
            <Button onClick={linkOnClick} className="product--add__link" icon={linkIcon} >
              {t(__(linkText))}
            </Button>
          }
        </Col>
      }
    </Row>
  );
};

export default DashboardContentHeader;
