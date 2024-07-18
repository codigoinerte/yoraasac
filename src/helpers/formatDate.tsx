import moment from "moment"

type datetime = Date | undefined;


export const formatDate = (date:datetime, withHour:boolean = true) : String => {
    if(!date) return '';
    return moment(date).format(`DD MMM YYYY ${withHour ? '[\n] h:mm a' : ''}`).toString();
}
