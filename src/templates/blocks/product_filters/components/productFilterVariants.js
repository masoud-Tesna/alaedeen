import { Col, Row } from "antd";

const ProductFilterVariants = (props) => {
  const { filter_id, features, featureKey } = props || [];

  return (
    <>
      {Object.values(features)?.map(feature => {
        return(
          <Col key={`${featureKey}_${feature?.variant_id}`} span={24} className={ `feature--item py-2 px-4 ${feature?.selected && 'selected'}` }>

            <Row>
              <Col
                flex="1 1"
                className={ ` ${feature.disabled ? 'text-bc' : 'text-primary cursor-pointer'} vv-font-size-1-7 ${feature?.variant_id}` }
                onClick={() => !feature.disabled && props.featureHandleClick(filter_id, feature?.variant_id) }
              >
                { feature?.variant }
              </Col>
              <Col
                flex="30px"
                className={ `cursor-pointer text-right feature--item__removeIcon ${!feature?.selected && 'd-none'}` }
                onClick={() => props.featureRemoveHandleClick(filter_id, feature?.variant_id) }
              >
                <i className="far fa-times display-6 font-weight-light" />
              </Col>
            </Row>
          </Col>
        );
      })}
    </>
  );
};

export default ProductFilterVariants;
