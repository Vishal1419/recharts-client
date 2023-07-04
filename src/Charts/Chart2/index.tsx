import { Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useChart2, { UseChart2 } from "./vm";
import { format } from "date-fns";
import { Box, Stack, Typography } from "@mui/material";

interface Chart2Props extends UseChart2 {}

const Chart2 = ({ ...vmOptions }: Chart2Props) => {
  const { data } = vmOptions;
  const { lineChartData, canAnimate, xAxisTickFormatter } = useChart2(vmOptions);
  
  return (
    <Stack height="100%" flex={1} gap={1}>
      <Typography variant="h4" textAlign="center">
        Syncronized Chart
      </Typography>
      <Box flex={1}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={lineChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 20,
            }}
            syncId="myChart"
            // syncMethod="value"
          >
            <XAxis dataKey="timeStamp" tickFormatter={xAxisTickFormatter}>
              <Label position="bottom">{`Time (${format(new Date(), 'z')})`}</Label>
            </XAxis>
            <YAxis>
              <Label angle={-90} value={`${data.data.names[0]} (${data.units})`} position='insideLeft' style={{textAnchor: 'middle'}} />
            </YAxis>
            <Tooltip labelFormatter={(label, payload) => { return format(label * 1000, 'yyyy/MM/dd hh:mm a z'); }} />
            <Legend verticalAlign="top" align="right" />
            <Line type="monotone" dataKey="used" stroke="#8884d8" activeDot={{ r: 8 }} connectNulls dot={false} isAnimationActive={canAnimate} /> {/*  isAnimationActive={}  /> */}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  )
};

export default Chart2;
