import "./styles/Pricing.less";

import { Checkbox, Col, Row, Statistic } from "antd";
import { useTranslation } from "react-i18next";
import { fn_discount } from "../../functions/Helper";

const Pricing = (
  {
    planId,
    plan,
    planType,
    productsLimit,
    hasAffiliateDiscount = false,
    planDiscount = 0,
    baseDiscount,
    priceText,
    basePrice,
    price,
    color,
    gradient,
    backgroundColor,
    features,
    planIds,
    handlePriceList,
  }
) => {

  let basePriceAfterDiscount = 0,
      totalPrice = 0,
      totalByBasePrice = 0;

  if (planType === "P") { // if plan is product :
    basePriceAfterDiscount = fn_discount(basePrice, baseDiscount);
    basePriceAfterDiscount = fn_discount(+basePriceAfterDiscount, +planDiscount);
    totalPrice = +productsLimit * basePriceAfterDiscount;
    totalByBasePrice = +productsLimit * fn_discount(+basePrice, +baseDiscount);
  }
  else if (planType === "S") { // if plan is personal store:
    totalPrice = fn_discount(+price, +planDiscount);
    totalByBasePrice = +price;
  }

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

              {hasAffiliateDiscount ?
                <>
                  <Col span={24} className="__discount">
                    {baseDiscount ?
                      <>
                        <span className={ `--baseDiscount ${hasAffiliateDiscount ? 'plusAffiliate': ''}` }>{`%${baseDiscount}`}</span>
                        {hasAffiliateDiscount &&
                        <>
                          <span> + </span>
                          <span className="--affiliateDiscount">{`%${planDiscount}`}</span>
                        </>
                        }
                        <span>{` ${t('discount')}`}</span>
                      </> :
                      <>
                        <span className="--affiliateDiscount">{`%${planDiscount}`}</span>
                        <span>{` ${t('discount')}`}</span>
                      </>
                    }

                  </Col>

                  {planType === 'P' &&
                    <Col span={24} className="__afterDiscount">
                    <s className="--basePrice">
                      <Statistic className="--after" valueStyle={{color: color}} value={basePrice} />
                    </s>
                    <Statistic className="--after" valueStyle={{color: color}} value={basePriceAfterDiscount} />
                  </Col>
                  }
                </> :
                baseDiscount &&
                <>
                  <Col span={24} className="__discount">
                    <span className={ `--baseDiscount` }>{`%${baseDiscount}`}</span>
                    <span>{` ${t('discount')}`}</span>
                  </Col>

                  <Col span={24} className="__afterDiscount">
                    <s className="--basePrice">
                      <Statistic className="--after" valueStyle={{color: color}} value={basePrice} />
                    </s>
                    <Statistic className="--after" valueStyle={{color: color}} value={fn_discount(basePrice, baseDiscount)} />
                  </Col>
                </>
              }


              <Col span={24} className="__price">
                <Statistic valueStyle={{color: color}} value={totalPrice} suffix={t('toman')} />
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
          planPrice={totalByBasePrice}
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