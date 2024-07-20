import moment from "moment";
type dateparam = Date | string;
export const formatDateForInput = (date:dateparam) => {
    const newDate = new Date(date);
    return moment(newDate).format("yyyy-MM-DD hh:mm:ss");
}
