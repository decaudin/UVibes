export interface UvApiResponse {
    result: {
        uv: number;
        uv_max: number;
        uv_max_time: string;
        ozone: number;
        safe_exposure_time: {
            [key: string]: number;
        };
    };
}