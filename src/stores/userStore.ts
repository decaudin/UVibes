import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserStore } from "@/types/userStore";

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,

            status: "idle",
            
            pointsGPS: [],

            justLoggedOut: false,

            setUser: (userData) => set({ user: userData, justLoggedOut: false }),

            clearUser: () => set({ user: null, status: "fetched", justLoggedOut: true }),

            setStatus: (status) => set({ status }),

            setJustLoggedOut: (val) => set({ justLoggedOut: val }),

            addPoint: (point) => set((state) => ({ pointsGPS: [...state.pointsGPS, point] })),

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