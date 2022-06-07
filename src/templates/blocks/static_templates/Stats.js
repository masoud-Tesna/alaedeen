//import Style:
import './styles/Stats.less';

// import ANT Design Components Used:
import { Col, Row, Skeleton } from "antd";

// import custom hooks:
import { useGetApiOld } from "../../../utilities/functions";

// import helper functions:
import { __ } from '../../../utilities/functions/Helper';

import { useTranslation } from "react-i18next";

const Stats = () => {

  const { t } = useTranslation();

  // get country lists from API:
  const { isLoading, data: stats } = useGetApiOld(
    `stats-api`,
    '',
    `stats`,
    {
      refetchOnWindowFocus: false
    }
  );

  return (
    <div className="stats--container">
      <Row className="h-100 stats--content" justify="space-around" align="middle">
        <Col className="text-center text-white" span={5}>
          <div className="stats--content__title font-weight-600 text-shadow">{ t(__('Registered Users')) }</div>
          <div className="stats--content__value font-weight-bold text-shadow">
            { isLoading ?
              <Skeleton.Input style={{ width: '8rem', height: '1.2rem', background: 'linear-gradient(90deg, rgba(190, 190, 190, 0.7) 25%, rgba(129, 129, 129, 0.74) 37%, rgba(190, 190, 190, 0.7) 63%)' }} active size={'default'} /> :
                stats?.stats?.total_user
            }
          </div>
        </Col>
        <Col className="text-center text-white" span={5}>
          <div className="stats--content__title font-weight-600 text-shadow">{ t(__('Total Products')) }</div>
          <div className="stats--content__value font-weight-bold text-shadow">
            { isLoading ?
              <Skeleton.Input style={{ width: '8rem', height: '1.2rem', background: 'linear-gradient(90deg, rgba(190, 190, 190, 0.7) 25%, rgba(129, 129, 129, 0.74) 37%, rgba(190, 190, 190, 0.7) 63%)' }} active size={'default'} /> :
              stats?.stats?.total_products
            }
          </div>
        </Col>
        <Col className="text-center text-white" span={5}>
          <div className="stats--content__title font-weight-600 text-shadow">{ t(__('Total Stores')) }</div>
          <div className="stats--content__value font-weight-bold text-shadow">
            { isLoading ?
              <Skeleton.Input style={{ width: '8rem', height: '1.2rem', background: 'linear-gradient(90deg, rgba(190, 190, 190, 0.7) 25%, rgba(129, 129, 129, 0.74) 37%, rgba(190, 190, 190, 0.7) 63%)' }} active size={'default'} /> :
              stats?.stats?.total_store
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;