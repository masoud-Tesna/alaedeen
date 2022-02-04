import "./styles/Plans.less";

import { Button, Col, Empty, Row, Statistic } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import Pricing from "../../../../common/Pricing";
import { __ } from "../../../../../functions/Helper";
import React, { useEffect, useState } from "react";
import { useGetApi } from "../../../../../functions";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../contexts/spiner/SpinnerContext";
import axios from "axios";

const Plans = () => {

  const { t } = useTranslation();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  // user data context state:
  const { user_data } = useGetAuthState();

  const [priceList, setPriceList] = useState(0);

  const [tax, setTax] = useState(0);

  const [planIds, setPlanIds] = useState([]);

  const [payLink, setPayLink] = useState("");

  const {isLoading, data} = useGetApi("plans-api", "", "plans", {
    refetchOnWindowFocus: false
  });

  const plans = data || {};

  const handlePriceList = value => {
    const planId     = value?.target?.id,
          planPrice  = value?.target?.planPrice,
          checked     = value?.target?.checked;

    if (checked) {
      // add selected plan in to state:
      setPlanIds(prevState => [...prevState, +planId]);

      // update selected plans price:
      setPriceList(prevPrice => prevPrice + +planPrice);
    } else {
      const newPlanIds = planIds.filter( id => id !== +planId );
      setPlanIds( newPlanIds );

      // update selected plans price:
      setPriceList(prevPrice => prevPrice - +planPrice);
    }

  }

  const handlePay = () => {
    // create value for post:
    const values = {
      company_id: +(user_data?.auth?.company_id),
      plans: planIds
    };

    // show spinner (spinner context):
    spinnerDispatch(isLoadingAction(true));

    axios.post(`https://alaedeen.com/horn/plans-pay-api`, { ...values })
      .then(res => {
        if (res?.data?.status === 100) {
          setPayLink(res?.data?.payLink);
        } else {
          // hidden spinner (spinner context):
          spinnerDispatch(isLoadingAction(false));

          console.log(res?.date);
        }
      })
      .catch(err => {
        // hidden spinner (spinner context):
        spinnerDispatch(isLoadingAction(false));

        console.log(err);
      })
  }

  useEffect(() => {
    setTax(priceList * (9 / 100));
  }, [priceList]);

  // if get pay link from zibal, redirect to pay page:
  useEffect(() => {
    payLink && window.location.replace(payLink);
  }, [payLink]);

  return (
    <Row>
      <Col span={24}>
        <DashboardContentHeader page={"plans and pricing"}/>
      </Col>

      <Col span={24} className="plans--container">
        <Row gutter={[20, 20]} justify="center">
          { (isLoading || !plans?.length) ?
            <>Loading...</> :
            plans?.map(plan => {
              return (
                <Col key={`plansList_${+(plan?.plan_id)}`} xs={24} md={8}>
                  <Pricing
                    planId          = { +(plan?.plan_id) }
                    plan            = { plan?.plan }
                    discount        = { plan?.discount }
                    afterDiscount   = { plan?.after_discount }
                    price           = { plan?.price }
                    priceText       = { plan?.price_text }
                    basePrice       = { plan?.base_price }
                    color           = { plan?.color }
                    gradient        = { plan?.gradient }
                    backgroundColor = { plan?.background }
                    features        = { plan?.features || {} }
                    planIds         = {planIds}
                    handlePriceList = {handlePriceList}
                  />
                </Col>
              )
            })
          }
        </Row>

        <Row gutter={[0, 20]} className="chosen--plans">
          <Col span={24} className="__caption">Your chosen plan(s):</Col>
          {planIds?.length ?
            <>
              <Col span={24} className="chosen--plans__table">
                <div>
                  <Row className="__head">
                    <Col className="text-center my-auto" span={8}>
                      {t('plan')}
                    </Col>
                    <Col className="text-center my-auto" span={4}>
                      {t('price')}
                    </Col>
                    <Col className="text-center my-auto" span={4}>
                      {t('discount')}
                    </Col>
                    <Col className="text-center my-auto" span={4}>
                      {t('discount_price')}
                    </Col>
                    <Col className="text-center my-auto" span={4}>
                      {t('amount_including_discount')}
                    </Col>
                  </Row>

                  <Row className="__body">
                    {planIds?.map(planId => {
                      const plan = plans?.find(plan => +(plan?.plan_id) === planId)?.plan;
                      const price = plans?.find(plan => +(plan?.plan_id) === planId)?.price;

                      return (
                        <Col span={24} key={`chosenPlan_${planId}`}>
                          <Row className="__data">
                            <Col span={8} className="text-center my-auto __plan">{ plan }</Col>

                            <Col span={4} className="text-center my-auto __price">
                              <Statistic value={price} />
                            </Col>

                            <Col span={4} className="text-center my-auto __price">
                              <Statistic value={0} prefix="%" />
                            </Col>

                            <Col span={4} className="text-center my-auto __price">
                              <Statistic value={0} />
                            </Col>

                            <Col span={4} className="text-center my-auto __price">
                              <Statistic value={price} />
                            </Col>
                          </Row>
                        </Col>
                      )
                    })}
                  </Row>
                </div>
              </Col>

              <Col span={24} className="chosen--plans__table mt-5">
                <div>
                  <Row className="__body">
                    <Col span={24}>
                      <Row className="__data" justify="space-between">
                        <Col className="my-auto __tax">
                          {t('total_price')} :
                        </Col>

                        <Col className="my-auto __taxPrice">
                          <Statistic value={priceList} />
                        </Col>
                      </Row>
                    </Col>

                    <Col span={24}>
                      <Row className="__data" justify="space-between">
                        <Col className="my-auto __tax">
                          {t('tax')} (%9) :
                        </Col>

                        <Col className="my-auto __taxPrice">
                          <Statistic value={tax} />
                        </Col>
                      </Row>
                    </Col>

                    <Col span={24}>
                      <Row className="__data" justify="space-between">
                        <Col className="my-auto __tax">
                          {t('the_amount_payable')} :
                        </Col>

                        <Col className="my-auto __taxPrice">
                          <Statistic value={priceList + tax} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col span={24} className="text-center mt-4">
                <Button className="bg-primary text-white border-0 __payBtn" htmlType="submit" onClick={handlePay}>{t(__('payment'))}</Button>
              </Col>
            </> :

            <Col span={24} className="text-center"><Empty description={t("no_selected_plan")}/></Col>
          }
        </Row>
      </Col>
    </Row>
  );
};

export default Plans;
