import React, { FC } from "react";
import * as d3 from "d3";
import { XYAxisBarChart } from "./XYAxisBarChart";
import { Bar } from "./bar";

interface Props {
  data: any;
  margins: any;
  svgDimensions: any;
}

export const Barchart: FC<Props> = ({ data, margins, svgDimensions }) => {
  if (!data) {
    return null;
  }

  const yMaxValue = Math.max(...data.map((d: any) => d.value));
  const months = [
    { month: "Jan" },
    { month: "Feb" },
    { month: "Mar" },
    { month: "Apr" },
    { month: "May" },
    { month: "Jun" },
    { month: "Jul" },
    { month: "Aug" },
    { month: "Sep" },
    { month: "Oct" },
    { month: "Nov" },
    { month: "Dec" }
  ];

  const xScale = d3
    .scaleBand()
    .domain(data.map((d: any) => d.month))
    .range([margins.left, svgDimensions.width - margins.right])
    .padding(0.2);

  const xScaleMonth = d3
    .scaleBand()
    .domain(months.map((d: any) => d.month))
    .range([margins.left, svgDimensions.width - margins.right]);

  const yScale = d3
    .scaleLinear()
    .domain([0, yMaxValue])
    .range([svgDimensions.height - margins.bottom, margins.top]);

  const text = (
    <text transform="translate(60,150)rotate(-90)" fontSize="13">
      Monthly Income ($)
    </text>
  );

  const rectOverlay = (
    <rect
      transform={`translate(${margins.left / 2},${margins.top / 2})`}
      className="rectOverlayBarChart"
      width={svgDimensions.width - margins.right}
      height={svgDimensions.height - margins.top}
      rx="5"
      ry="5"
    />
  );

  return (
    <svg width={svgDimensions.width} height={svgDimensions.height}>
      {rectOverlay}
      {text}
      <XYAxisBarChart
        scales={{ xScaleMonth, yScale }}
        margins={margins}
        svgDimensions={svgDimensions}
      />
      <Bar
        scales={{ xScale, yScale }}
        margins={margins}
        svgDimensions={svgDimensions}
        data={data}
        yMaxValue={yMaxValue}
      />
    </svg>
  );
};
