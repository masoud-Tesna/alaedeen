import {memo} from "react";
import styled from 'styled-components';

const SvgIcon = (
  {
    icon,
    type = "outline",
    color = "#82879B",
    width  = 24,
    height = 24,
    style = {},
    ...reset
  }
) => {
  
  const requireIcon = require(`../assets/svg-icon/${type}/${icon}.svg`);
  
  const Icon = styled.span`
    -webkit-mask-size: cover;
    mask-size: cover;
    -webkit-mask-image: url(${requireIcon});
    mask-image: url(${requireIcon});
    background-color: ${color};
    width: ${width}px;
    height: ${height}px;
    display: block;
  `;
  
  return <Icon className={`--svgIcon ${!!reset?.className ? reset?.className : ""}`} style={style} />
};

export default memo(SvgIcon);
