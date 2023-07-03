import { format } from "date-fns";

export const formatMillisecond = (date: Date | number) => format(date, 'S');
export const formatSecond = (date: Date | number) => format(date, 'ss');
export const formatMinute = (date: Date | number) => format(date, 'mm:ss');
export const formatHour = (date: Date | number) => format(date, 'hh:mm a');
export const formatDay = (date: Date | number) => format(date, 'dd/MM/yyyy');
