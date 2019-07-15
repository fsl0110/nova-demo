import React, { HTMLAttributes, PureComponent } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import classNames from "classnames";
import { Error } from "..";
require("highcharts-no-data-to-display")(Highcharts);

export interface Props extends HTMLAttributes<HTMLDivElement> {
  location: string;
  /** Is loading data. */
  isLoading?: boolean;
  /** Has an error. */
  hasError?: boolean;
  /** Options and Data of the chart */
  chartOptions: Highcharts.Options;
  /** Action for fetching data. */
  fetchHandler: (location: string, term?: string) => void;
}

export class ChartHighstock extends PureComponent<Props> {
  private chartInstance: any;

  constructor(props: Props) {
    super(props);

    this.afterChartCreated = this.afterChartCreated.bind(this);
  }

  afterChartCreated(chart: any) {
    this.chartInstance = chart;
  }

  componentDidMount() {
    this.props.fetchHandler(this.props.location);
  }

  render() {
    const {
      location,
      isLoading,
      hasError,
      chartOptions,
      fetchHandler,
      className
    } = this.props;

    if (!hasError && this.chartInstance && isLoading) {
      this.chartInstance.showLoading();
    }
    if (!hasError && this.chartInstance && !isLoading) {
      this.chartInstance.hideLoading();
    }

    return (
      <div className={classNames(className)} data-test="ChartHighstock">
        {!hasError ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            constructorType={"stockChart"}
            callback={this.afterChartCreated}
          />
        ) : (
          <Error
            location={location}
            fetchData={fetchHandler}
            isLoading={isLoading}
          />
        )}
      </div>
    );
  }
}

export default ChartHighstock;