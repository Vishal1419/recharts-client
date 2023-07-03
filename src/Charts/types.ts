export interface ServerData {
  title: string;
  units: string;
  data: {
    names: [string, string];
    values: [number, number, number][];
  }
}

export interface Data {
  title: string;
  units: string;
  data: {
    names: [string, string];
    values: { timeStamp: number; used: number; limit: number; }[];
  }
}
