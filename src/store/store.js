import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isLogin: false,
      user: null,
     token:null,
     
      login: (user,token) =>
        set(() => ({
          isLogin: true,
          user: user,
          token:token,
        })),

     
      logout: () =>
        set(() => ({
          isLogin: false,
          user: null,
          token:null,
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
      currentVehicle:{},
      setCurrentVehicle:(vehicle) => set({ currentVehicle: vehicle }),
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