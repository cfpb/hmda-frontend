import { useEffect } from "react";
import Select from "../Select";

export const PeriodSelectors = ({
  props,
  periodOpts,
  periodLow,
  setPeriodLow,
  periodHigh,
  setPeriodHigh,
  endpoint,
}) => {
  const showRangeReset =
    periodLow.value !== periodOpts[0].value ||
    periodHigh.value !== periodOpts[periodOpts.length - 1].value;

  let baseURL = "/data-browser/graphs";

  /* 
  Listens for period selections changes. Updates URL with period options if changed
  Allows people to directly link a graph with specfic periods 
  */
  useEffect(() => {
    props.history.push({
      pathname: `${baseURL}/${endpoint}`,
      search: `?periodLow=${periodLow.value}&periodHigh=${periodHigh.value}`,
    });
  }, [periodLow, periodHigh]);

  return (
    <div className="period-wrapper">
      <br />
      Filing Period Range{" "}
      {showRangeReset && (
        <button
          className="reset"
          onClick={() => {
            setPeriodLow(periodOpts[0]);
            setPeriodHigh(periodOpts[periodOpts.length - 1]);
          }}
        >
          Show All Quarters
        </button>
      )}
      <div className="period-range">
        <Select
          options={periodOpts.slice(0, -1)}
          onChange={(e) => setPeriodLow(e)}
          value={periodLow}
        />
        <div className="to">to</div>
        <Select
          options={periodOpts.filter((yq) =>
            periodLow ? yq.value > periodLow.value : yq
          )}
          onChange={(e) => setPeriodHigh(e)}
          value={periodHigh}
        />{" "}
      </div>
      <br />
      <br />
    </div>
  );
};
