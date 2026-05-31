export type Holding = {
  ticker: string;
  name: string;
  shares: number;
  price: number;
};

export const cash = 4250;

export const holdings: Holding[] = [
  { ticker: "VTI", name: "Vanguard Total Stock", shares: 42, price: 275.10 },
  { ticker: "VXUS", name: "Vanguard Total Intl", shares: 28, price: 62.40 },
  { ticker: "BND", name: "Vanguard Total Bond", shares: 15, price: 73.15 },
  { ticker: "GLD", name: "SPDR Gold", shares: 5, price: 215.80 },
];

export const performanceHistory = [
  { date: "Jun", value: 17200 },
  { date: "Jul", value: 17480 },
  { date: "Aug", value: 17890 },
  { date: "Sep", value: 17600 },
  { date: "Oct", value: 18100 },
  { date: "Nov", value: 18450 },
  { date: "Dec", value: 18820 },
  { date: "Jan", value: 19120 },
  { date: "Feb", value: 19340 },
  { date: "Mar", value: 19180 },
  { date: "Apr", value: 19560 },
  { date: "May", value: 19728 },
];
