export const DisplayformatDate = (date) => {

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const [year, month, day] = new Date(date).toLocaleDateString("en-CA", options).split("-");
  return  `${day}-${month}-${year}`;

};

export const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-CA", options); // For YYYY-MM-DD format
};
