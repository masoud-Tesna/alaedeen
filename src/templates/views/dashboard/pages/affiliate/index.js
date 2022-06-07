import "./styles/Affiliate.less";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import { Row, Col, Typography, Skeleton } from "antd";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SeoGenerator } from "../../../../../utilities/functions/Helper";

const Affiliate = () => {

  const { Paragraph } = Typography;

  const { user_data } = useGetAuthState();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const referralCode = user_data?.auth?.referral_code || null;

  const planId = user_data?.auth?.plan_id || null;

  useEffect(() => {
    if (planId !== "14") {
      navigate('/dashboard');
    }
  }, [planId])

  return (
    <Row>
      <SeoGenerator
        title="Dashboard | Affiliate Program"
      />

      <Col span={ 24 }>
        <DashboardContentHeader page={ "Affiliate Program" }/>
      </Col>

      <Col span={ 24 } className="affiliate--container">
        <Row gutter={ [ 0, 30 ] }>
          <Col span={ 24 }>
            <Row gutter={ 10 } className="getReferral">
              <Col className="--link">
                { (user_data?.load || !referralCode) ?
                  <Skeleton.Input style={ { width: `30vw`, height: 130 } } active size={ "small" }/> :
                  <Row className="h-100" gutter={ [ 0, 10 ] }>
                    <Col span={ 24 } className="my-auto __title">{ `${ t('referral_link') }:` }</Col>
                    <Col span={ 24 }>
                      <div className="__link">
                        <Paragraph
                          copyable={ {
                            icon: [ <i className="fa-regular fa-clipboard" key="copy-icon"/>,
                              <i className="fa-regular fa-check" key="copied-icon"/> ],
                            tooltips: [ t('copy_your_referral_link'), t('Copied') ],
                          } }>{ `https://Alaedeen.com/register/?ref=${ referralCode }` }</Paragraph>
                      </div>
                    </Col>
                  </Row>
                }
              </Col>

              <Col className="--divider">
                <div className="__text">
                  { (user_data?.load || !referralCode) ?
                    <Skeleton.Input style={ { width: 20, height: 18 } } active size={ "small" }/> :
                    t('or')
                  }
                </div>
              </Col>

              <Col className="--code">
                { (user_data?.load || !referralCode) ?
                  <Skeleton.Input style={ { width: `30vw`, height: 130 } } active size={ "small" }/> :
                  <Row className="h-100" gutter={ [ 0, 10 ] }>
                    <Col span={ 24 } className="my-auto __title">{ `${ t('referral_code') }:` }</Col>
                    <Col span={ 24 }>
                      <div className="__code">
                        <Paragraph
                          copyable={ {
                            icon: [ <i className="fa-regular fa-clipboard" key="copy-icon"/>,
                              <i className="fa-regular fa-check" key="copied-icon"/> ],
                            tooltips: [ t('copy_your_referral_code'), t('Copied') ],
                          } }>{ referralCode }</Paragraph>
                      </div>
                    </Col>
                  </Row>
                }
              </Col>
            </Row>
          </Col>

          {/*<Divider />

          <Col span={24}>
            <Row className="affiliate--stat">
              <Col span={24} className="__title">
                {t('your_affiliate_stat')}
              </Col>
            </Row>
          </Col>*/ }
        </Row>
      </Col>
    </Row>
  );
};

export default Affiliate;
