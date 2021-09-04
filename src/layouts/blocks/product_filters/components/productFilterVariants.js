import { Link } from "react-router-dom";
import { __ } from "../../../../functions/Helper";
import { Col } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";

const ProductFilterVariants = (props) => {
  const { t } = useTranslation();

  const { filter_id, features, featureKey } = props || [];

  return (
    <>
      {Object.values(features)?.map(feature => {
        return(
          <Col key={`${featureKey}_${feature?.variant_id}`} span={24} className="feature--item">
            <span
              className={ `py-2 px-4 ${feature.disabled ? 'text-bc' : 'text-primary cursor-pointer'} vv-font-size-1-7 d-block ${feature?.variant_id}` }
              onClick={() => {
                !feature.disabled &&
                  props.featureHandleClick(filter_id, feature?.variant_id)
              }}
            >
              { feature?.variant }
            </span>
          </Col>
        );
      })}
    </>
  );
};

export default ProductFilterVariants;
