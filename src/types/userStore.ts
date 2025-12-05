import type { User } from "@/types/user";
import type { Point } from "@/schemas/pointSchema";

type Status = "idle" | "loading" | "fetched";

export type UserStore = {
    user: User | null;
    setUser: (userData: User | null) => void;
    clearUser: () => void;

    status: Status;
    setStatus: (status: Status) => void;
    justLoggedOut: boolean;
    setJustLoggedOut: (value: boolean) => void;

    pointsGPS: Point[];
    addPoint: (point: Point) => void;
    addPoints: (points: Point[]) => void;
    addPointAtIndex: (point: Point, index: number) => void;
    updatePoint: (updatedPoint: Point) => void;
    removePoint: (id: string) => void;
    clearPoints: () => void;
}