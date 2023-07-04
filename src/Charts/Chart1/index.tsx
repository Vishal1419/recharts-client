import { Brush, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useChart1, { UseChart1 } from "./vm";
import { format } from "date-fns";
import { Box, Stack, Typography } from "@mui/material";

interface Chart1Props extends UseChart1 {
  handleChangeZoom: ({ startIndex, endIndex }: {
    startIndex?: number | undefined;
    endIndex?: number | undefined;
  }) => void;
}

const Chart1 = ({ handleChangeZoom, ...vmOptions }: Chart1Props) => {
  const { data, startIndex, endIndex } = vmOptions;
  const { lineChartData, canAnimate, xAxisTickFormatter } = useChart1(vmOptions);

  return (
    <Stack height="100%" flex={1} gap={1}>
      <Typography variant="h4" textAlign="center">
        {data.title}
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
              <Label angle={-90} value={`${data.data.names.map((name) => `${name} (${data.units})`).join(' and ')}`} position='insideLeft' style={{textAnchor: 'middle'}} />
            </YAxis>
            <Tooltip labelFormatter={(label, payload) => { return format(label * 1000, 'yyyy/MM/dd hh:mm a z'); }} />
            <Legend verticalAlign="top" align="right" />
            <Line type="monotone" dataKey="used" stroke="#8884d8" activeDot={{ r: 8 }} connectNulls dot={false} isAnimationActive={canAnimate} />
            <Line type="monotone" dataKey="limit" stroke="#82ca9d" dot={false}  isAnimationActive={canAnimate} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <ResponsiveContainer width="100%" height={50}>
          <LineChart width={500} height={300}
          data={data.data.values}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
            <Brush startIndex={startIndex} endIndex={endIndex} onChange={handleChangeZoom} />
          </LineChart>
        </ResponsiveContainer>
    </Stack>
  )
};

export default Chart1;
