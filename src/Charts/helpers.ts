import { format } from "date-fns";

const formatHour = (date: Date | number) => format(date, 'hh:mm a');
const formatDay = (date: Date | number) => format(date, 'dd/MM/yyyy');

export const formatTime = (date: number, timestamps: number[]) => {
  const minTimestamp = timestamps[0];
  const maxTimestamp = timestamps[timestamps.length - 1];
  const [minEpoch, maxEpoch] = [minTimestamp, maxTimestamp];
  const epochDiff = (maxEpoch - minEpoch) / 60;
  const epochDate = date * 1000;

  if (epochDiff > 60 * 24) {
    return formatDay(epochDate);
  }

  return formatHour(epochDate);
};
