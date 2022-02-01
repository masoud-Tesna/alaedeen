import "./styles/Pricing.less";

import { Checkbox, Col, Row } from "antd";
import { __ } from "../../functions/Helper";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const Pricing = (
  {
    features,
    price,
    currency,
    duration,
    color,
    backgroundColor,
    gradient,
    planId,
    planIds,
    handlePriceList,
    priceText,
    headerText,
  }
) => {

  const { t } = useTranslation();

  const checked = planIds?.length ? (planIds?.find(id => id === planId) ? "__checked" : "") : "";

  return (
    <Row
      className="pricing"
      gutter={[0, 20]}
      style={
        gradient ?
          { backgroundImage: gradient, backgroundSize: "200%" } :
          backgroundColor &&
            { background: backgroundColor }
      }
    >
      <Col span={24}>
        <Row gutter={[0, 30]}>
          <Col span={24} className="__header" style={{ color: color }}>{headerText}</Col>

          <Col span={24} className="__price--content">
            <Row gutter={[0, 5]}>
              <Col span={24}>
                <div style={{ display: "flex" }} className="justify-content-center align-items-center">
                  <div className="__currency">
                    <span style={{ color: color }}>{currency}</span>
                  </div>
                  <div className="__price">
                    <span style={{ color: color }}>{price}</span>
                  </div>

                  {price > 0 && (
                    <div className="__duration">
                      <span style={{ color: color }}> {duration === "m" ? "/ Month" : "/ Year"}</span>
                    </div>
                  )}
                </div>
              </Col>

              { priceText && <Col span={24} className="__priceText" style={{ color: color }}>{priceText}</Col> }

            </Row>
          </Col>

          {features?.length &&
            <Col span={24} className="__features">
              <Row gutter={[0, 10]}>
                {features?.map((feature, i) => (
                  <Col key={`planFeature_${i}`} span={24} className="__feature" style={{ color: color }}>
                    {feature.value ? (
                      <i className="fas fa-check true" />
                    ) : (
                      <i className="fas fa-times false" />
                    )}
                    {feature.text}
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
            {t('please_check')}
          </span>
        </Checkbox>
      </Col>
    </Row>
  );
};

Pricing.propTypes = {
  features: PropTypes.array,
  price: PropTypes.number.isRequired,
  duration: PropTypes.oneOf(["y", "m"]).isRequired,
  currency: PropTypes.string,
  priceText: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
};

Pricing.defaultProps = {
  color: "#333333",
  currency: "$",
  backgroundColor: "#FFFFFF",
  features: {}
};

export default Pricing;