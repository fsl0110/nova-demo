import React, { HTMLAttributes, PureComponent } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import classNames from "classnames";
require("highcharts-no-data-to-display")(Highcharts);

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Is loading data. */
  isLoading: boolean;
  /** Has an error. */
  hasError: boolean;
  /** Options and Data of the chart */
  chartOptions: Highcharts.Options;
  /** Action for fetching data. */
  fetchInitiator: () => void;
}

export class InitiatorChart extends PureComponent<Props> {
  private chartInstance: any;

  constructor(props: Props) {
    super(props);

    this.afterChartCreated = this.afterChartCreated.bind(this);
  }

  afterChartCreated(chart: any) {
    this.chartInstance = chart;
  }

  componentDidMount() {
    this.props.fetchInitiator();
  }

  render() {
    const { isLoading, hasError, chartOptions, className } = this.props;

    if (!hasError && this.chartInstance && isLoading) {
      this.chartInstance.showLoading();
    }
    if (!hasError && this.chartInstance && !isLoading) {
      this.chartInstance.hideLoading();
    }

    return (
      <div className={classNames(className)}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          callback={this.afterChartCreated}
        />
      </div>
    );
  }
}

export default InitiatorChart;
