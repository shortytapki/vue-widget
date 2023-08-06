import { defineStore } from "pinia";
import type { Forecast, Location } from "@shared/types";
import { getWeatherByLocation } from "@shared/lib";

interface MainStoreSchema {
  forecast: undefined | Forecast;
  mainView: boolean;
  isLoading: boolean;
  fetchError: null | string;
}

export const useMainStore = defineStore("app", {
  state(): MainStoreSchema {
    return {
      mainView: true,
      isLoading: true,
      fetchError: null,
      forecast: undefined,
    };
  },

  actions: {
    async getWeather(location: Location) {
      this.setIsLoading(true);
      const result = await getWeatherByLocation(location);
      if (result.message) {
        this.setFetchError(result.message);
        this.setIsLoading(false);
        this.forecast = undefined;
        return;
      }
      this.setForecast(result);
      this.setFetchError("");
      this.setIsLoading(false);
    },
    setForecast(f: Forecast | undefined) {
      this.forecast = f;
    },

    setFetchError(err: string) {
      this.fetchError = err;
    },
    toggleSettings() {
      this.mainView = !this.mainView;
    },
    setRefetch(value: boolean) {
      this.refetch = value;
    },
    setIsLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});
