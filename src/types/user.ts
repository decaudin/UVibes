export type User = {
    id: string;
    name: string;
    email: string;
    hasPassword: boolean;
    skinType?: number | null;
}