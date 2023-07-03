import { Brush, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useChart1, { UseChart1 } from "./vm";
import { format } from "date-fns";
import { Box, Stack, Typography } from "@mui/material";

interface Chart1Props extends UseChart1 {

}

const Chart1 = ({ ...vmOptions }: Chart1Props) => {
  const { data } = vmOptions;
  const { handleChangeZoom, multiFormat } = useChart1(vmOptions);

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
            data={data.data.values}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            syncId="myChart"
            syncMethod="value"
          >
            <XAxis dataKey="timeStamp" tickFormatter={multiFormat} />
            <YAxis>
              <Label angle={-90} value={`${data.data.names.map((name) => `${name} (${data.units})`).join(' and ')}`} position='insideLeft' style={{textAnchor: 'middle'}} />
            </YAxis>
            <Tooltip labelFormatter={(label, payload) => { return format(label * 1000, 'dd/MM/yyyy hh:mm a'); }} />
            <Legend />
            <Line type="monotone" dataKey="used" stroke="#8884d8" activeDot={{ r: 8 }} connectNulls dot={false} />
            <Line type="monotone" dataKey="limit" stroke="#82ca9d" dot={false} />
            <Brush onChange={handleChangeZoom} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  )
};

export default Chart1;
