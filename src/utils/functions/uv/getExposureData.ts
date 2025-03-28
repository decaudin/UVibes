import { timeConverter } from "../time/timeConverter";

export const getExposureData = (exposureTime: number | null) => {
    
    if (exposureTime === null) {
        return 'Risk-free Exposure: No time limit - this skin’s good to go!';
    } else {
        return timeConverter(exposureTime);
    }
}