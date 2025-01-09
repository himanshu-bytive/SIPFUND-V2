import moment from "moment";

const getDateInHuman = (date) => {
  const dateStr = date.toString();

  // Handle 8-digit dates (e.g., 18122024 -> 18-Dec-2024)
  if (dateStr.length === 8 && !isNaN(date)) {
    const day = dateStr.slice(0, 2);
    const month = dateStr.slice(2, 4);
    const year = dateStr.slice(4, 8);
    return `${day}-${moment().month(month - 1).format("MMM")}-${year}`;
  }

  // Handle 7-digit dates (e.g., 4122024 -> 04-Dec-2024)
  if (dateStr.length === 7 && !isNaN(date)) {
    const day = `0${dateStr.slice(0, 1)}`; // Pad single-digit day with '0'
    const month = dateStr.slice(1, 3);
    const year = dateStr.slice(3, 7);
    return `${day}-${moment().month(month - 1).format("MMM")}-${year}`;
  }

  // Handle other cases with existing logic
  let d;
  if (isNaN(date)) {
    d = new Date(
      `${dateStr.split("-")[2]}-${dateStr.split("-")[1]}-${dateStr.split("-")[0]}`
    );
  } else {
    d = new Date(date);
  }

  const dateString = moment(d).format("DD-MMM-YYYY");
  if (dateString === "Invalid date") {
    const tmp = new Date(
      `${dateStr.split("-")[2]}-${dateStr.split("-")[1]}-${dateStr.split("-")[0]}`
    );
    return moment(tmp).format("DD-MMM-YYYY");
  }
  return dateString;
};

export { getDateInHuman };
