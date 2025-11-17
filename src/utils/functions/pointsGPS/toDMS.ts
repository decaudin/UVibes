export const toDMS = (lat: number, lng: number) => {
    const convert = (coord: number, isLat: boolean) => {
        const absolute = Math.abs(coord);
        const degrees = Math.floor(absolute);
        const minutesFloat = (absolute - degrees) * 60;
        const minutes = Math.floor(minutesFloat);
        const seconds = Math.round((minutesFloat - minutes) * 60);
        const direction = isLat
            ? coord >= 0 ? "N" : "S"
            : coord >= 0 ? "E" : "W";

        return `${degrees}°${minutes}'${seconds}" ${direction}`;
    };

    return {
        lat: convert(lat, true),
        lng: convert(lng, false),
    }
}