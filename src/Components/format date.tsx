import jalaliMoment from "jalali-moment";

export function formatDate(dateString: Date) {
  if (!dateString) {
    return "";
  } else {
    const inputDateTime = new Date(dateString);
    const parsedDate = jalaliMoment(inputDateTime, "YYYY-MM-DD");
    const formattedDate = parsedDate.format("jYYYY-jMM-jDD");
    return formattedDate;
  }
}
