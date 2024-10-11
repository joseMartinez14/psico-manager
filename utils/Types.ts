export type MonthAvailabilityItem = {
  day: number;
  state: boolean;
};

export type DayHourAvailabilityItem = {
  hour: string;
  state: "selected" | "unavailable" | "available";
};
