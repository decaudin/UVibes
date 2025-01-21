export const formatTime = (isoDate: string): string => {

const date = new Date(isoDate);

date.setUTCHours(date.getUTCHours() + 1);

const hours = date.getUTCHours();
const minutes = date.getUTCMinutes();

const formattedMinutes = minutes.toString().padStart(2, '0');

if (hours === 0) return `${minutes}min`;
if (minutes === 0) return `${hours}h`;

return `${hours}h${formattedMinutes}min`;
};
  
  