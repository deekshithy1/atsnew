import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isLogin: false,
      user: null,

     
      login: (user) =>
        set(() => ({
          isLogin: true,
          user: user,
        })),

     
      logout: () =>
        set(() => ({
          isLogin: false,
          user: null,
        })),

     
      clearStorage: () => {
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-storage", 
    }
  )
);
export const vehicleStore=create(
  persist(
    (set)=>({
      vehicles:{},
      setVehicles: (vehiclesObj) => set(() => ({ vehicles: vehiclesObj })),
      getPendingVehicles: () => {
        const vehicles = get().vehicles;
        return Object.values(vehicles).filter((v) => v.status === "pending");
      },
      getCompletedVehicles: () => {
        const vehicles = get().vehicles;
        return Object.values(vehicles).filter((v) => v.status === "completed");
      },
      clearVehicles: () => set(() => ({ vehicles: {} })),
    }),
    {
      name: "vehicle-storage",
    }
  )
)