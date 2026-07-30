import { formatDuration, type Duration } from "date-fns";

export function durationLeft(duration: Duration) {
    //Get the base value for each duration
    const { days = 0, hours = 0, minutes = 0, seconds = 0 } = duration;

    //Deadline ended
    const isPast = days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0;

    //Due todays
    const isToday = days === 0;

    //Send the signal to parent component
    if (isPast) return "Deadline passed";
    if (isToday) return "Due today!!";

    if (days > 0) {
        return `${formatDuration(duration, { format: ["days", "hours"] })} left`;
    }

    if (hours > 0) {
        return `${formatDuration(duration, { format: ["hours", "minutes"] })} left`;
    }

    return `${formatDuration(duration, { format: ["minutes"] })} left`;
}

export function urgent(duration: Duration) {
    const { days = 0, hours = 0, minutes = 0, seconds = 0 } = duration;

    const isPast = days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0;
    const isToday = days === 0;

    const isUrgent = isPast || isToday;

    return { isUrgent };
}
