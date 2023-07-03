import { useEffect, useState } from "react";
import { Data } from "../types";
import { formatDay, formatHour } from "../helpers";

export interface UseChart2 {
  data: Data;
}

const useChart2 = ({ data }: UseChart2) => {
  const timestamps = data.data.values.map((value) => value.timeStamp);
  const minTimestamp = timestamps[0];
  const maxTimestamp = timestamps[timestamps.length - 1];

  const multiFormat = (date: number) => {
    const [minEpoch, maxEpoch] = [minTimestamp, maxTimestamp];
    const epochDiff = (maxEpoch - minEpoch) / 60;
    const epochDate = date * 1000;

    if (epochDiff > 60 * 24) {
      return formatDay(epochDate);
    }

    return formatHour(epochDate);
  }

  return { multiFormat };
};

export default useChart2;
