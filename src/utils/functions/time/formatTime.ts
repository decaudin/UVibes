export const formatTime = (isoDate: string): string => {

    const timePart = isoDate.slice(11, 16);
    const [hours, minutes] = timePart.split(':');

    if (hours === "00" && minutes === "00") { return "00h"};

    const formattedHours = parseInt(hours, 10);
    const formattedMinutes = minutes.padStart(2, '0');

    return minutes === "00" ? `${formattedHours}h` : `${formattedHours}h${formattedMinutes}min`;
}