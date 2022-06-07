import "./styles/DashboardContentHeader.less"

import { Button, Col, Row, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { __ } from "../../../../../utilities/functions/Helper";

import { DashboardDrawerContext } from "../DashboardMain";
import { Link } from "react-router-dom";

const DashboardContentHeader = (
  {
    page,
    extra,
    isLoading = false,
    hasLink = false,
    linkData = {},
    hasBtn = false,
    btnData = {},
    hasStat = false,
    stat
  }
) => {

  const { t } = useTranslation();

  return (
    <Row className="dashboardContentHeader" justify="space-between">
      <Col className="dashboardContentHeader--caption">
        {t(__(page))} {extra ? `: ${extra}` : ""}
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

      {isLoading ?
        <Col span={12}>
          <Row justify="end">
            <Col className="d-none d-lg-block dashboardContentHeader--extraLink">
              <Skeleton.Input active size="small" style={{ width: 100, height: 35 }} />
            </Col>
          </Row>
        </Col> :
        <>
          {hasStat &&
          <Col span={12}>
            <Row gutter={10} justify="end">
              <Col className="dashboardContentHeader--stat my-auto" flex="1 1">
                {stat}
              </Col>

              {(hasLink || hasBtn) &&
              <Col className="d-none d-lg-block dashboardContentHeader--extraLink">
                {hasLink &&
                <Link to={linkData?.href}>
                  <Button className="product--add__link" icon={linkData?.icon} >
                    {t(__(linkData?.text))}
                  </Button>
                </Link>
                }

                {hasBtn &&
                <Button onClick={btnData?.handleOnClick} className="product--add__link" icon={btnData?.icon} >
                  {t(__(btnData?.text))}
                </Button>
                }
              </Col>
              }
            </Row>
          </Col>
          }

          {(!hasStat && (hasLink || hasBtn)) &&
          <Col className="d-none d-lg-block dashboardContentHeader--extraLink">
            {hasLink &&
            <Link to={linkData?.href}>
              <Button className="product--add__link" icon={linkData?.icon} >
                {t(__(linkData?.text))}
              </Button>
            </Link>
            }

            {hasBtn &&
            <Button onClick={btnData?.handleOnClick} className="product--add__link" icon={btnData?.icon} >
              {t(__(btnData?.text))}
            </Button>
            }
          </Col>
          }
        </>
      }

    </Row>
  );
};

export default DashboardContentHeader;
