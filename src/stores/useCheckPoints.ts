import { create, StateCreator } from "zustand";
import axios from "axios";
import { useEffect } from 'react';
import { getAllCheckPointData } from "../utils/types";

type CheckPointsState = {
  checkPointEndPoint: string;
  checkpoints: Record<string, getAllCheckPointData[]>;
  fetch: () => Promise<void>;
  triggerFetch?: number;
};

const useCheckPoints: StateCreator<CheckPointsState> = (set, get) => ({
  checkPointEndPoint: `${import.meta.env.VITE_BACKEND_BASE_URL}/check-point-master/get-all-check-points`,
  checkpoints: {},
  fetch: async () => {
    try {
      const checkPointEndPoint = get().checkPointEndPoint;
      const response = await axios.get(checkPointEndPoint);
      set({ checkpoints: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
});

const checkPointsStore = create(useCheckPoints);

const useCheckPointsData = (triggerFetch?: number) => {
  const { checkpoints, fetch, triggerFetch: storeTriggeredFetch } = checkPointsStore((state) => ({
    ...state,
    triggerFetch,
  }));

  useEffect(() => {
    fetch();
  }, [fetch, triggerFetch]);

  useEffect(() => {
    if (storeTriggeredFetch) {
      fetch();
    }
  }, [fetch, storeTriggeredFetch]);

  return checkpoints;
};

export default useCheckPointsData;