import { useCallback, useEffect, useState } from "react";
import { Data, ServerData } from "./types";

const useCharts = () => {
  const [data, setData] = useState<Data>();
  const [zoomIndices, setZoomIndices] = useState<[number, number]>([0, 0]);

  const fetchData = useCallback(async (value: number) => {
    const response = await fetch(`https://busy-teal-magpie-tux.cyclic.app/?limit=${value}`);
    const data: ServerData = await response.json();
    
    const transformedData: Data = {
      title: data.title,
      units: data.units,
      data: {
        names: data.data.names,
        values: data.data.values.map((data) => {
          const [ timeStamp, used, limit ]=  data;
          return {
            timeStamp,
            used,
            limit,
          };
        })
      }
    }

    setZoomIndices([0, transformedData.data.values.length - 1]);
    setData(transformedData);
  }, []);

  useEffect(() => {
    fetchData(60);
  }, [fetchData]);

  const handleChangeZoom = useCallback(({ startIndex, endIndex }: { startIndex?: number | undefined; endIndex?: number | undefined; }) => {
    if (startIndex === undefined || endIndex === undefined) return;
    if (!data) return;
    setZoomIndices([startIndex, endIndex]);
  }, [data]);

  return {
    fetchData,
    data,
    handleChangeZoom,
    startIndex: zoomIndices[0],
    endIndex: zoomIndices[1],
  }
};

export default useCharts;
