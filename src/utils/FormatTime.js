export const convertTime = (time) => {
  const [hours, minutes] = time.split(":");
  let period = "AM";
  let hour = parseInt(hours, 10);

  if (hour >= 12) {
    period = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  } else if (hour === 0) {
    hour = 12;
  }

  return `${hour}:${minutes} ${period}`;
};
