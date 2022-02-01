import "./styles/Plans.less";

import { Button, Col, Row } from "antd";
import DashboardContentHeader from "../../templates/components/DashboardContentHeader";
import Pricing from "../../../../common/Pricing";
import { __ } from "../../../../../functions/Helper";
import { useState } from "react";

const Plans = () => {

  const [priceList, setPriceList] = useState(0);

  const [planIds, setPlanIds] = useState([]);

  const plans = [
    {
      plan_id: 1,
      tagColor: "magenta",
      features: [
        { text: "3 new project / month", value: true },
        { text: "Basic interaction", value: false },
        { text: "Assets library", value: false },
      ],
      price: 10,
      duration: "y",
      backgroundColor: "#54c362",
      priceText: "Ability to register 10 products",
      headerText: "Product",
    },
    {
      plan_id: 2,
      tagColor: "gold",
      features: [
        { text: "3 new project / month", value: true },
        { text: "Assets library", value: false },
        { text: "Basic interaction", value: true },
        { text: "Assets library", value: false },
        { text: "Basic interaction", value: true },
        { text: "Assets library", value: false },
      ],
      price: 30,
      duration: "y",
      color: "#ffffff",
      gradient: "linear-gradient(90deg,#ef146e 0,#fea958 51%,#ef146e)",
      priceText: "Ability to register a personal store",
      headerText: "Personal Store",
    },
    {
      plan_id: 3,
      tagColor: "orange",
      features: [
        { text: "3 new project / month", value: true },
        { text: "Basic interaction", value: false },
        { text: "Assets library", value: false },
      ],
      price: 15,
      duration: "y",
      priceText: "Ability to register 15 products",
      headerText: "Product",
    },
    {
      plan_id: 4,
      tagColor: "volcano",
      features: [
        { text: "3 new project / month", value: true },
        { text: "Assets library", value: false },
        { text: "Basic interaction", value: true },
        { text: "Assets library", value: false },
        { text: "Basic interaction", value: true },
        { text: "Assets library", value: false },
      ],
      price: 50,
      duration: "y",
      color: "#ffffff",
      gradient: "linear-gradient(to left, #ff0844 0%, #ffb199 100%)",
      currency: "$",
      priceText: "Ability to register a personal store2",
      headerText: "Personal Store2",
    },
  ];

  const handlePriceList = value => {
    const planId     = value?.target?.id,
          planPrice  = value?.target?.planPrice,
          checked     = value?.target?.checked;

    if (checked) {
      // add selected plan in to state:
      setPlanIds(prevState => [...prevState, planId]);

      // update selected plans price:
      setPriceList(prevPrice => prevPrice + planPrice);
    } else {
      const newPlanIds = planIds.filter( id => id !== planId );
      setPlanIds( newPlanIds );

      // update selected plans price:
      setPriceList(prevPrice => prevPrice - planPrice);
    }

  }

  return (
    <Row>
      <Col span={24}>
        <DashboardContentHeader page={"plans and pricing"}/>
      </Col>

      <Col span={24} className="plans-container">
        <Row gutter={[20, 20]} justify="center">
          { plans?.length && plans?.map(plan => {
            return (
              <Col key={`plansList_${plan?.plan_id}`} xs={24} md={8}>
                <Pricing
                  features={ plan?.features }
                  price={ plan?.price }
                  duration={ plan?.duration }
                  color={ plan?.color }
                  gradient = { plan?.gradient }
                  backgroundColor={ plan?.backgroundColor || "" }
                  currency={ plan?.currency }
                  planId={ plan?.plan_id }
                  planIds={planIds}
                  handlePriceList={handlePriceList}
                  priceText={ plan?.priceText }
                  headerText={ plan?.headerText }
                />
              </Col>
            )
          }) }
        </Row>

        {/*<Row gutter={[0, 20]} className="chosen-plans">
          {planIds?.length &&
          <>
            <Col span={24} className="__caption">Your chosen plan(s):</Col>
            {planIds?.map(planId => {
              return <Col key={planId} span={24} className="__plan">{planData(planId)}</Col>
            })}
          </>
          }
        </Row>*/}
      </Col>
    </Row>
  );
};

export default Plans;
