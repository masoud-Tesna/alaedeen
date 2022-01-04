import "./styles/DashboardContentHeader.less"

import { Button, Col, Row } from "antd";

const DashboardContentHeader = ({page, dashboardToggleDrawer}) => {

  return (
    <Row className="dashboardContentHeader" justify="space-between">
      <Col className="dashboardContentHeader--caption">
        {page}
      </Col>

      <Col className="d-lg-none dashboardContentHeader--toggleDrawer">
        <Button type="link"  onClick={() => dashboardToggleDrawer()}>
          <i className="fas fa-grip-lines" />
        </Button>
      </Col>
    </Row>
  );
};

export default DashboardContentHeader;
