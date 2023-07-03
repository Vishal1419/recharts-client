import { useCallback, useEffect, useState } from "react";
import { Data, ServerData } from "./types";

const useCharts = () => {
  const [data, setData] = useState<Data>();

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

    setData(transformedData);
  }, []);

  useEffect(() => {
    fetchData(60);
  }, [fetchData]);

  return {
    fetchData,
    data,
  }
};

export default useCharts;
