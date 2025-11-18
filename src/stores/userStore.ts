import type { UserStore } from "@/types/userStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,

            setUser: (userData) => set({ user: userData, justLoggedOut: false }),

            clearUser: () => set({ user: null, status: "fetched", justLoggedOut: true }),

            status: "idle",

            setStatus: (status) => set({ status }),
            
            justLoggedOut: false,

            setJustLoggedOut: (val) => set({ justLoggedOut: val }),
            
            pointsGPS: [],

            addPoint: (point) => set((state) => ({ pointsGPS: [...state.pointsGPS, point] })),

            addPoints: (points) => set((state) => ({ pointsGPS: [...state.pointsGPS, ...points] })),

            addPointAtIndex: (point, index) =>
                set((state) => {
                    const newPoints = [...state.pointsGPS];
                    newPoints.splice(index, 0, point);
                    return { pointsGPS: newPoints };
                }),

            updatePoint: (updatedPoint) =>
                set((state) => ({ pointsGPS: state.pointsGPS.map((p) => p.id === updatedPoint.id ? updatedPoint : p) })),

            removePoint: (id) => set((state) => ({ pointsGPS: state.pointsGPS.filter((p) => p.id !== id) })),

            clearPoints: () => set({ pointsGPS: [] }),
        }),
        {
            name: "user-store",
            storage: {
                getItem: (key) => {
                    const stored = sessionStorage.getItem(key);
                    return stored ? JSON.parse(stored) : null;
                },
                setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
                removeItem: (key) => sessionStorage.removeItem(key),
            },
            onRehydrateStorage: () => (state) => state?.setStatus("fetched"),
        }
    )
)