export const timeConverter = (time: number): string => {
    
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
   
    if (hours === 0 && minutes === 0) return "0min";
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;

    return `${hours}h${formattedMinutes}min`;
};