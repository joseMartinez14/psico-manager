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

export const getCostaRicaToUTCTime = (
  year: number,
  month: number,
  day: number,
  hour: string
): Date => {
  const { hours, minutes } = parseTime(hour);
  return new Date(Date.UTC(year, month - 1, day, hours + 6, minutes));
};

export const getCRdayFromUTC = (isoString: string): number => {
  const dateObject = new Date(isoString);
  dateObject.setHours(dateObject.getHours() - 6);
  return dateObject.getUTCDate();
};
