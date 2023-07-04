import { useCallback, useMemo } from "react";
import { Data } from "../types";
import usePrevious from "../../usePrevious";
import { formatTime } from "../helpers";

export interface UseChart2 {
  data: Data;
  startIndex: number;
  endIndex: number;
}

const useChart2 = ({ data, startIndex, endIndex }: UseChart2) => {
  const lineChartData = useMemo(() => data.data.values.slice(startIndex, endIndex + 1), [data, startIndex, endIndex]);
  const previousDataLength = usePrevious(data.data.values.length);
  const canAnimate = data.data.values.length !== previousDataLength;

  const xAxisTickFormatter = useCallback((date: number) => {
    const timestamps = lineChartData.map((value) => value.timeStamp);
    return formatTime(date, timestamps);
  }, [lineChartData]);

  return { lineChartData, canAnimate, xAxisTickFormatter };
};

export default useChart2;
