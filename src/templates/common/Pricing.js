import "./styles/Pricing.less";

import { Checkbox, Col, Row, Statistic } from "antd";
import { useTranslation } from "react-i18next";

const Pricing = (
  {
    planId,
    plan,
    discount,
    afterDiscount,
    price,
    priceText,
    basePrice,
    color,
    gradient,
    backgroundColor,
    features,
    planIds,
    handlePriceList,
  }
) => {

  const { t } = useTranslation();

  const checked = planIds?.length ? (planIds?.find(id => id === planId) ? "__checked" : "") : "";

  return (
    <Row
      className="pricing"
      gutter={[0, 30]}
      style={
        gradient ?
          { backgroundImage: gradient, backgroundSize: "200%" } :
          backgroundColor &&
            { background: backgroundColor }
      }
    >
      <Col span={24}>
        <Row gutter={[0, 30]}>
          <Col span={24} className="__header" style={{ color: color }}>{plan}</Col>

          <Col span={24} className="__price--content">
            <Row gutter={[0, 5]}>
              {discount &&
                <>
                  <Col span={24} className="__discount">
                    <span>{`%${discount} ${t('discount')}`}</span>
                  </Col>

                  <Col span={24} className="__afterDiscount">
                    <s className="--basePrice">
                      <Statistic className="--after" valueStyle={{color: color}} value={basePrice} />
                    </s>
                    <Statistic className="--after" valueStyle={{color: color}} value={afterDiscount} />
                  </Col>
                </>
              }


              <Col span={24} className="__price">
                <Statistic valueStyle={{color: color}} value={price} suffix={t('toman')} />
              </Col>

              { priceText && <Col span={24} className="__priceText" style={{ color: color }}>{priceText}</Col> }

            </Row>
          </Col>

          {features?.length &&
            <Col span={24} className="__features">
              <Row gutter={[0, 10]}>
                {features?.map((feature, i) => (
                  <Col key={`planFeature_${i}`} span={24}>
                    <Row className="__feature" style={{ color: color }}>
                      <Col span={3}>
                        <i className="fas fa-check true" />
                      </Col>

                      <Col span={21} className="--item"> {feature?.feature}</Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Col>
          }
        </Row>
      </Col>

      <Col span={24} className="__chosen">
        <Checkbox
          id={planId}
          onChange={handlePriceList}
          planPrice={price}
        >
          <span className={ `planCheckBox ${checked}` }>
            {t('choose')}
          </span>
        </Checkbox>
      </Col>
    </Row>
  );
};

export default Pricing;