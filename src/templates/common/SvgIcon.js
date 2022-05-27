import styled from 'styled-components';
import {upperFirst} from "../../functions/Helper";

const SvgIcon = (
  {
    icon,
    type = "outline",
    color = "#82879B",
    width = 60,
    height = 60,
    ...reset
  }
) => {
  
  const requireIcon = require(`../assets/svg-icon/${type}/${upperFirst(icon)}.svg`);
  
  const Icon = styled.i`
    -webkit-mask-size: cover;
    mask-size: cover;
    -webkit-mask-image: url(${requireIcon});
    mask-image: url(${requireIcon});
    background-color: ${color};
    width: ${width}px;
    height: ${height}px;
    display: inline-block;
  `;
  
  return <Icon className={`--svgIcon ${!!reset?.className ? reset?.className : ""}`} />
};

export default SvgIcon;
