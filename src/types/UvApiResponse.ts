export interface UvApiResponse {
    result: {
      uv: number;
      uv_time: string;
      uv_max: number;
      uv_max_time: string;
      ozone: number;
      ozone_time: string;
    };
}