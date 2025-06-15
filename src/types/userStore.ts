type User = {
    id: string;
    name: string;
    email: string;
};

type Point = {
    id: string;
    latitude: number;
    longitude: number;
    altitude?: number;
    name: string;
};

type Status = "idle" | "loading" | "fetched";

export type UserStore = {
    user: User | null;
    status: Status;
    pointsGPS: Point[];
    justLoggedOut: boolean;

    setUser: (userData: User | null) => void;
    clearUser: () => void;
    setStatus: (status: Status) => void;
    setJustLoggedOut: (value: boolean) => void;

    addPoint: (point: Point) => void;
    updatePoint: (updatedPoint: Point) => void;
    removePoint: (id: string) => void;
    clearPoints: () => void;
};