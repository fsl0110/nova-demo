import React, { FC, HTMLAttributes } from "react";
import { Button } from "..";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  location: string;
  /** Is loading data */
  isLoading?: boolean;
  /** ClickHandler for fetching data */
  fetchData: (location: string) => void;
}

export const Error: FC<Props> = ({ isLoading, fetchData, location }) => (
  <div className="error" data-test="Error">
    <div className="text-center">
      <h4>An error occured</h4>
      <p>This Chart can't be shown. Click the reload button to try again.</p>
      {/*       <button onClick={() => fetchData(location)} data-test="test-button">
        Testbutton
      </button>
      {isLoading && <div>Is Loading</div>} */}
      <Button
        aria-label="Reloadbutton for reloading Chartdatas"
        className="error__button"
        iconName="refresh"
        iconAlign="after"
        iconSize="m"
        isLoading={isLoading}
        isLoadingSpin={true}
        onClick={() => fetchData(location)}
        data-test="error-button"
      >
        {isLoading ? "Loading" : "Reload"}
      </Button>
    </div>
  </div>
);

export default Error;