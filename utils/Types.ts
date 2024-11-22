export type MonthAvailabilityItem = {
  day: number;
  state: boolean;
  month: number;
};

export type DayAvailabilityItem = {
  day: number;
  state: boolean;
  month: number;
  year: number;
  hour: string;
  document_id: string;
};

export type AppointmentAttributeItem = {
  value: string;
  id: string;
};

export type DayHourAvailabilityItem = {
  document_id: string;
  hour: string;
  state: "selected" | "unavailable" | "available";
};

export type AppointmentItem = {
  id: string;
  clientEmail: string;
  clientName: string;
  clientPhone: string;
  type: string;
  mode: string;
  date: string;
  hour: string;
  duration: number;
};
