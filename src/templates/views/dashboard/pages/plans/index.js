import "./styles/Plans.less";

import { Button, Col, Empty, Row, Statistic } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import Pricing from "../../../../common/Pricing";
import { __, fn_after_discount, fn_discount } from "../../../../../functions/Helper";
import React, { useEffect, useState } from "react";
import { useGetApi } from "../../../../../functions";
import { useTranslation } from "react-i18next";
import { useGetAuthState } from "../../../../../contexts/user/UserContext";
import { isLoadingAction, useSpinnerDispatch } from "../../../../../contexts/spiner/SpinnerContext";
import axios from "axios";
import { useGetConfig } from "../../../../../contexts/config/ConfigContext";

const Plans = () => {

  const { t } = useTranslation();

  // get initial config:
  const { config } = useGetConfig();

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  // user data context state:
  const { user_data } = useGetAuthState();

  const [priceList, setPriceList] = useState(0);

  const [tax, setTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [planIds, setPlanIds] = useState([]);

  const [payLink, setPayLink] = useState("");

  const {isLoading, data} = useGetApi("plans-api", "", "plans", {
    refetchOnWindowFocus: false
  });

  const [hasAffiliateDiscount, setHasAffiliateDiscount] = useState(false);
  const [planDiscount, setPlanDiscount] = useState(0);

  useEffect(() => {
    if (user_data?.auth?.plan_discount !== "0") {
      setHasAffiliateDiscount(true);
      setPlanDiscount(+user_data?.auth?.plan_discount);
    }
  }, [user_data?.auth?.plan_discount]);

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
      plans: planIds,
      lang_code: config?.language
    };

    const canPostData = !!(values?.plans?.length && values?.company_id);

    if (canPostData) {

      // show spinner (spinner context):
      spinnerDispatch(isLoadingAction(true));

      axios.post(`https://alaedeen.com/horn/plans-pay-api`, JSON.stringify({ ...values }))
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
  }

  useEffect(() => {

    if (hasAffiliateDiscount) {
      setTotalPrice(fn_discount(priceList, planDiscount));
      setTax(fn_after_discount(totalPrice, 9));
    }
    else {
      setTotalPrice(priceList);
      setTax(fn_after_discount(priceList, 9));
    }

  }, [hasAffiliateDiscount, priceList, totalPrice]);

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

          <Col span={24} className="DiscountDetails">
            <Row gutter={[0, 20]}>
              <Col span={24} className={ `__base ${hasAffiliateDiscount ? 'plusAffiliate': ''}` }>
                {t('base_prise_discount_msg')}
              </Col>
              { hasAffiliateDiscount &&
              <Col span={ 24 } className="__affiliate">
                { t('affiliate_discount_msg') }
              </Col>
              }
            </Row>
          </Col>

          { (isLoading || !plans?.length || user_data?.load) ?
            <>Loading...</> :
            plans?.map(plan => {
              return (
                <Col key={`plansList_${+(plan?.plan_id)}`} xs={24} md={8}>
                  <Pricing
                    planId               = { +(plan?.plan_id) }
                    plan                 = { plan?.plan }
                    planType             = { plan?.type }
                    productsLimit        = { +(plan?.products_limit) }
                    hasAffiliateDiscount = { hasAffiliateDiscount }
                    planDiscount         = { planDiscount }
                    baseDiscount         = { plan?.base_discount }
                    afterDiscount        = { plan?.after_discount }
                    price                = { +(plan?.price) }
                    priceText            = { plan?.price_text }
                    basePrice            = { plan?.base_price }
                    color                = { plan?.color }
                    gradient             = { plan?.gradient }
                    backgroundColor      = { plan?.background }
                    features             = { plan?.features || {} }
                    planIds              = { planIds }
                    handlePriceList      = { handlePriceList }
                  />
                </Col>
              )
            })
          }
        </Row>

        <Row gutter={[0, 20]} className="chosen--plans">
          <Col span={24} className="__caption">{t("your_chosen_plan")}:</Col>
          {(planIds?.length && plans.length) ?
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
                      const basePrice = plans?.find(plan => +(plan?.plan_id) === planId)?.base_price;
                      const baseDiscount = plans?.find(plan => +(plan?.plan_id) === planId)?.base_discount;
                      const productsLimit = plans?.find(plan => +(plan?.plan_id) === planId)?.products_limit;
                      const planType = plans?.find(plan => +(plan?.plan_id) === planId)?.type;
                      const price = plans?.find(plan => +(plan?.plan_id) === planId)?.price;

                      let priceBeforeDiscount = 0,
                        priceAfterDiscount = 0,
                        allDiscount = +baseDiscount || 0;

                      if (planType === "P") { // if plan is product :
                        priceAfterDiscount = +productsLimit * fn_discount(basePrice, allDiscount);
                        priceBeforeDiscount = +productsLimit * basePrice;
                      }
                      else if (planType === "S") { // if plan is personal store:
                        priceAfterDiscount = fn_discount(+price, allDiscount);
                        priceBeforeDiscount = +price;
                      }

                      return (
                        <Col span={24} key={`chosenPlan_${planId}`}>
                          <Row className="__data">
                            <Col span={8} className="text-center my-auto __plan">{ plan }</Col>

                            <Col span={4} className="text-center my-auto __price">
                              <Statistic value={priceBeforeDiscount} />
                            </Col>

                            <Col span={4} className="text-center my-auto __price">
                              { allDiscount ?
                                <Statistic
                                  value={ allDiscount } prefix={ config?.language === "en" ? "%" : "" }
                                  suffix={ config?.language !== "en" ? "%" : "" }
                                /> :
                                allDiscount
                              }
                            </Col>

                            <Col span={4} className="text-center my-auto __price">
                              <Statistic value={fn_after_discount(priceBeforeDiscount, allDiscount)} />
                            </Col>

                            <Col span={4} className="text-center my-auto __price">
                              <Statistic value={priceAfterDiscount} />
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

                    {hasAffiliateDiscount &&
                      <Col span={24}>
                        <Row className="__data" justify="space-between">
                          <Col className="my-auto __tax">
                            { config?.language === "en" ?
                              `${ t('discount') } (%${ planDiscount }) :` :
                              `${ t('discount') } (${ planDiscount }%) :`
                            }
                          </Col>

                          <Col className="my-auto __taxPrice">
                            <Statistic value={totalPrice} />
                          </Col>
                        </Row>
                      </Col>
                    }

                    <Col span={24}>
                      <Row className="__data" justify="space-between">
                        <Col className="my-auto __tax">
                          { config?.language === "en" ?
                            `${ t('tax') } (%9) :` :
                            `${ t('tax') } (9%) :`
                          }
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
                          <Statistic value={totalPrice + tax} />
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
