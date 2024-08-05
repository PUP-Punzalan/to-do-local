export const formatYYYYMMDD = (e) => {
  const date = new Date(e);
  const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  return formattedDate;
};

export const formatMMMMDDYYYY = (e) => {
  const date = new Date(e);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // MMMM DD, YYYY format
  return formattedDate;
};

export const getCurrentDate = () => {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  return formattedDate;
};

export const getDayWord = (date) => {
  date = new Date(date);
  const today = new Date();

  const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Check if the due date is today
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }

  return days[dayOfWeek];
};
