import React, { FC, HTMLAttributes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { Text, Search, ChartHighstock } from "../../../components";
import { AppState } from "../../../store/initialState";
import { fetchReports } from "../../../store/actions/actions";
import text from "../../../utils/data/text.json";

export interface StateProps {
  /** Is loading data. */
  isLoading?: boolean;
  /** Has an error. */
  hasError?: boolean;
  /** Options and Data of the chart */
  chartOptions: Highcharts.Options;
}

export interface DispatchProps {
  /** Action for fetching data. **/
  fetchReports: (term?: string) => void;
}

export interface OwnProps {}

export type Props = StateProps &
  DispatchProps &
  OwnProps &
  HTMLAttributes<HTMLDivElement>;

export const Reports: FC<Props> = ({
  isLoading,
  hasError,
  chartOptions,
  fetchReports,
  className
}) => (
  <div className={classNames(className)}>
    <Text
      topicTag="h1"
      topic={text.reports.topic}
      text={text.reports.text}
      data-test="text"
    />
    <Search
      location="reports"
      fetchData={fetchReports}
      isLoading={isLoading}
      data-test="search"
    />
    <div>
      <h3 className="horizontal-center">{text.reports.ChartTitle}</h3>
      <ChartHighstock
        location="reports"
        className="chart-wrapper"
        isLoading={isLoading}
        hasError={hasError}
        chartOptions={chartOptions}
        fetchHandler={fetchReports}
        data-test="chart"
      />
    </div>
  </div>
);

export const ReportsConnected = connect(
  (state: AppState, ownProps: OwnProps): StateProps => ({
    isLoading: state.reports.isLoading,
    hasError: state.reports.hasError,
    chartOptions: state.reports.chartOptions
  }),
  {
    fetchReports
  }
)(Reports);