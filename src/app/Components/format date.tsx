import jalaliMoment from "jalali-moment";

export function formatDate(dateString: Date) {
  if (!dateString) {
    return "";
  } else {
    const inputDateTime = dateString;
    const parsedDate = jalaliMoment(inputDateTime, "YYYY-MM-DD HH:mm:ss");
    const formattedDate = parsedDate.format("jYYYY-jMM-jDD");
    console.log(formattedDate);
    return formattedDate;
  }
}
