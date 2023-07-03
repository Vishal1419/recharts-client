import { useEffect, useState } from "react";
import { Data } from "../types";
import { formatDay, formatHour, formatMinute } from "../helpers";

export interface UseChart1 {
  data: Data;
}

const useChart1 = ({ data }: UseChart1) => {
  const timestamps = data.data.values.map((value) => value.timeStamp);
  const minTimestamp = timestamps[0];
  const maxTimestamp = timestamps[timestamps.length - 1];

  const [visibleTimestamps, setVisibleTimestamps] = useState<[number, number]>([minTimestamp, maxTimestamp]);

  useEffect(() => {
    setVisibleTimestamps([minTimestamp, maxTimestamp]);
  }, [maxTimestamp, minTimestamp]);

  const multiFormat = (date: number) => {
    const [minEpoch, maxEpoch] = visibleTimestamps;
    const epochDiff = (maxEpoch - minEpoch) / 60;
    const epochDate = date * 1000;
    console.log(epochDiff, maxEpoch, minEpoch)

    if (epochDiff > 60 * 24) {
      return formatDay(epochDate);
    }

    return formatHour(epochDate);
  }

  const handleChangeZoom = ({ startIndex, endIndex }: { startIndex?: number | undefined; endIndex?: number | undefined; }) => {
    if (!startIndex || !endIndex) return;
    console.log(startIndex, endIndex)
    const minValue = data.data.values[startIndex].timeStamp;
    const maxValue = data.data.values[endIndex].timeStamp;
    setVisibleTimestamps([minValue, maxValue]);
  };

  return { handleChangeZoom, multiFormat };
};

export default useChart1;
