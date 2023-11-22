import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat";

//get current date time on ISO string date
export const currentDateTime = () => {
    return dayjs().toISOString();
}

//format from JS date to ISO string date
export const formatJSDateToIsoString = (datetime) => {
    return dayjs(datetime).toISOString();
}

//format from JS date to any available string date
export const formatJsDate = (datetime, dateFormat = "DD MMM YY") => {
    return dayjs(datetime).format(dateFormat);
}

//format from ISO string date to any available string date
export const formatDate = (isoDateTime, dateFormat = "DD MMM YY") => {
    return dayjs(isoDateTime).format(dateFormat);
}

//format from any available string date to any available string date
export const formatDateFrom = (isoDateTime, currentDateFormat, targetDateFormat = "DD MMM YY") => {
    dayjs.extend(customParseFormat);
    return dayjs(isoDateTime, currentDateFormat).format(targetDateFormat);
}

export const formatFromNowDate = (isoDateTime) => {
    const dayjs = require('dayjs')
    const relativeTime = require("dayjs/plugin/relativeTime")
    dayjs.extend(relativeTime)
    return dayjs(isoDateTime).fromNow()
}

//format from ISO string date to relative date
export const formatRelativeDate = (isoDateTime, dateFormat = "DD MMM YY") => {
    const day = dayjs(isoDateTime);
    let now = dayjs();
    let formattedDate = day.format(dateFormat);

    if (now.diff(day, "weeks") >= 2) {
        formattedDate = day.format(dateFormat);
    } else if (now.diff(day, "days") >= 7) {
        formattedDate = 'Last week';
    } else if (now.diff(day, "days") >= 2) {
        formattedDate = `${now.diff(day, "days")} days ago`;
    } else if (now.diff(day, "hours") >= 24) {
        formattedDate = `1 day ago`;
    } else if (now.diff(day, "hours") >= 2) {
        formattedDate = `${now.diff(day, "hours")} hours ago`;
    } else if (now.diff(day, "minutes") >= 60) {
        formattedDate = `1 hour ago`;
    } else if (now.diff(day, "minutes") >= 2) {
        formattedDate = `${now.diff(day, "minutes")} minutes ago`
    } else if (now.diff(day, "seconds") >= 60) {
        formattedDate = `1 hour ago`;
    } else if (now.diff(day, "seconds") >= 1) {
        formattedDate = `${now.diff(day, "seconds")} seconds ago`;
    } else if (now.diff(day, "seconds") < 1) {
        formattedDate = `just now`;
    }

    return formattedDate;
}