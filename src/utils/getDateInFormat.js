import moment from "moment";

const getDateInHuman = (date) => {
  if (date.toString().length < 10) return date;
  let d;
  if (isNaN(date)) {
    d = new Date(
      `${date.toString().split("-")[2]}-${date.toString().split("-")[1]}-${
        date.toString().split("-")[0]
      }`
    );
  } else {
    d = new Date(date);
  }
  const dateString = moment(d).format("DD-MM-YYYY");
  if (dateString == "Invalid date") {
    const tmp = new Date(
      `${date.toString().split("-")[2]}-${date.toString().split("-")[1]}-${
        date.toString().split("-")[0]
      }`
    );
    console.log(moment(tmp).format("DD-MM-YYYY"));
    return moment(tmp).format("DD-MM-YYYY");
  }
  return dateString;
};

export { getDateInHuman };
