const parseTime = (timeStr: string) => {
  const [time, modifier] = timeStr.split(/(am|pm)/i);
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  }
  if (modifier.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

//Recive la hora de costa rica y manda la de UTC
export const getCostaRicaToUTCTime = (
  year: number,
  month: number,
  day: number,
  hour: string
): Date => {
  const { hours, minutes } = parseTime(hour);
  return new Date(Date.UTC(year, month - 1, day, hours + 6, minutes));
};

//Este recibe la de utc y manda la de costa rica
export const getCRdayFromUTC = (isoString: string): number => {
  const dateObject = new Date(isoString);
  dateObject.setHours(dateObject.getHours() - 6);
  return dateObject.getUTCDate();
};

export const getCRDateFromUTC = (isoString: string): string => {
  const dateObject = new Date(isoString);
  dateObject.setHours(dateObject.getHours() - 6);
  return dateObject.toISOString();
};

//Mando UTC full string y recibo la fecha dia/mes/ano de costa rica
export function formatCRUTCDate(dateString: string): string {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 6);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

//Mando UTC full string y recibo la hora de costa rica
export function formatUTCTimeTo12Hour(time: string): string {
  const date = new Date(time);
  date.setHours(date.getHours() - 6);
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  const minutesStr = minutes.toString().padStart(2, "0");

  return `${hours}:${minutesStr} ${ampm}`;
}
