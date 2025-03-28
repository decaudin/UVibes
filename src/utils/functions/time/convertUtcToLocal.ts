import { toZonedTime, format } from 'date-fns-tz';

export const convertUtcToLocal = (utcTime: string, timeZone: string | null) => {
    if (timeZone && utcTime) {
        const zonedTime = toZonedTime(utcTime, timeZone);
        return format(zonedTime, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });
    }
    return utcTime;
}