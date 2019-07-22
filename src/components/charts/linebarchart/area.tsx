import React, { FC } from "react";
import * as d3 from "d3";

interface Props {
  scales: any;
  margins: any;
  svgDimensions: any;
  data: any;
}

// Area Component
export const Area: FC<Props> = ({ scales, data, svgDimensions, margins }) => {
  const { xScale, yScale } = scales;
  const area = d3
    .area()
    .x((d: any) => xScale(d.year))
    .y0(svgDimensions.height - margins.bottom)
    .y1((d: any) => yScale(d.value))
    .curve(d3.curveMonotoneX);

  const areaGradient = (
    <linearGradient
      id="area-gradient"
      gradientUnits="userSpaceOnUse"
      x1="0"
      y1={yScale(0)}
      x2="0"
      y2={yScale(1000)}
    >
      <stop offset="0%" stopColor="#333333" stopOpacity="0" />
      <stop offset="100%" stopColor="#FFF056" stopOpacity="0.5" />
    </linearGradient>
  );

  const path = <path d={area(data) || undefined} className="area" />;
  return (
    <g>
      {areaGradient}
      {path}
    </g>
  );
};
