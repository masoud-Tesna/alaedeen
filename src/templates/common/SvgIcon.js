import {memo} from "react";
import styled from 'styled-components';


const Icon = styled.span`
    -webkit-mask-size: cover;
    mask-size: cover;
    -webkit-mask-image: url(${p => p.requireIcon});
    mask-image: url(${p => p.requireIcon});
    background-color: ${p => p.color};
    width: ${p => p.width}px;
    height: ${p => p.height}px;
    display: block;
  `;

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
  
  return <Icon
    requireIcon={requireIcon}
    color={color}
    width={width}
    height={height}
    className={`--svgIcon ${!!reset?.className ? reset?.className : ""}`}
    style={style}
  />
};

export default memo(SvgIcon);
