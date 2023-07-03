import { CircularProgress, Stack } from "@mui/material";
import useCharts from "./vm";
import Filters from "./Filters";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";

const Charts = () => {
  const { fetchData, data } = useCharts();

  if (!data) return <Stack height="100%" width="100%" justifyContent="center" alignItems="center"><CircularProgress /></Stack>;

  return (
    <Stack style={{ height: 'calc(100% - 64px)' }} justifyContent="center" gap={2} p={4}>
      <Filters onChange={fetchData} />
      <Stack flex={1} direction="row" alignItems="center" gap={4}> 
        <Chart1 data={data} />
        <Chart2 data={data} />
      </Stack>
    </Stack>
  )
};

export default Charts;
