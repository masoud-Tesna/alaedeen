import {
  Col,
  Collapse,
  Form,
  Row,
  Checkbox
} from "antd";
import { __, scrollIntoViewIfTargetNotOnDisplay } from "../../../../../../functions/Helper";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

const ExportCapabilityForm = (
  {
    acceptedDeliveries,
    paymentCurrencies,
    languagesSpoken
  }
) => {
  const { Panel } = Collapse;

  const { t } = useTranslation();

  const collapseRef = useRef(null);

  return (
    <Row>
      <Col span={24}>
        <Collapse
          accordion={true}
          onChange={() => window.setTimeout(() => scrollIntoViewIfTargetNotOnDisplay(collapseRef?.current), 500) }
          className="__collapse"
        >
          <Panel header={t(__('Accepted Delivery Terms'))} key="1">
            <div ref={collapseRef} className="CollapseScrollTop" />
            <div className="checkBoxGroup">
              <Form.Item
                name={['profile_fields', "69"]}
              >
                <Checkbox.Group>
                  <Row gutter={[0, 20]}>
                    {acceptedDeliveries?.length && acceptedDeliveries?.map(acceptedDelivery => {
                      return (
                        <Col key={`acceptedDeliveries_${acceptedDelivery?.value_id}`} span={8}>
                          <Checkbox
                            value={acceptedDelivery?.value_id}
                          >
                            { t(__(acceptedDelivery?.description)) }
                          </Checkbox>
                        </Col>
                      )
                    })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </Panel>

          <Panel header={t(__('Accepted Payment Currency'))} key="2">
            <div ref={collapseRef} className="CollapseScrollTop" />
            <div className="checkBoxGroup">
              <Form.Item
                name={['profile_fields', "70"]}
              >
                <Checkbox.Group>
                  <Row gutter={[0, 20]}>
                    {paymentCurrencies?.length && paymentCurrencies?.map(paymentCurrency => {
                      return (
                        <Col key={`paymentCurrencies_${paymentCurrency?.value_id}`} span={8}>
                          <Checkbox
                            value={paymentCurrency?.value_id}
                          >
                            { t(__(paymentCurrency?.description)) }
                          </Checkbox>
                        </Col>
                      )
                    })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </Panel>

          <Panel header={t(__('Language Spoken'))} key="3">
            <div ref={collapseRef} className="CollapseScrollTop" />
            <div className="checkBoxGroup">
              <Form.Item
                name={['profile_fields', "71"]}
              >
                <Checkbox.Group>
                  <Row gutter={[0, 20]}>
                    {languagesSpoken?.length && languagesSpoken?.map(languageSpoken => {
                      return (
                        <Col key={`languagesSpoken_${languageSpoken?.lang_id}`} span={8}>
                          <Checkbox
                            value={languageSpoken?.lang_code}
                          >
                            { t(__(languageSpoken?.lang_name)) }
                          </Checkbox>
                        </Col>
                      )
                    })}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default ExportCapabilityForm;
