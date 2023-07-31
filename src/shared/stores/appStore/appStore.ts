import { defineStore } from "pinia";
import type { Forecast, Location } from "@shared/types";
import { getWeatherByLocation } from "@shared/lib";

interface AppStateSchema {
  forecast: undefined | Forecast;
  isConfigured: boolean;
  settingsAreOpened: boolean;
  savedLocations: null | Array<Location>;
  currentLocation: null | string;
  fetchError: string;
  isLoading: boolean;
  refetch: boolean;
}

const LOCAL_STORAGE_KEY = "savedLocations";

export const useAppStore = defineStore("app", {
  state: () => {
    const savedLocations = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const hasSavedLocations = savedLocations && savedLocations.length;
    return {
      forecast: undefined,
      fetchError: "",
      settingsAreOpened: false,
      currentLocation: hasSavedLocations ? savedLocations.at(0).title : null,
      isConfigured: hasSavedLocations,
      savedLocations,
      isLoading: false,
      refetch: false,
    } as AppStateSchema;
  },

  actions: {
    async getWeather(location: Location) {
      this.isLoading = true;
      const result = await getWeatherByLocation(location);
      if (result.message) {
        this.setFetchError(result.message);
        this.isLoading = false;
        this.refetch = false;
        return;
      }
      this.setForecast(result);
      this.setFetchError("");
      this.isLoading = false;
      this.refetch = false;
    },
    setForecast(f: Forecast) {
      this.forecast = f;
    },
    setFetchError(err: string) {
      this.fetchError = err;
    },
    toggleSettings() {
      this.settingsAreOpened = !this.settingsAreOpened;
    },
    setCurrentLocation() {
      const newLocations = this.savedLocations;
      this.currentLocation = newLocations.at(0).title;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocations));
      this.refetch = true;
    },
    addLocation(location: Location) {
      if (!this.savedLocations) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([location]));
        this.savedLocations = [location];
        this.refetch = true;
        this.currentLocation = location.title;
        this.isConfigured = true;
        return;
      }
      this.savedLocations.push(location);
      const newLocations = this.savedLocations;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocations));
    },
    deleteLocation(id: number) {
      this.savedLocations = this.savedLocations.filter(
        (l: Location) => l.id !== id
      );
      if (!this.savedLocations.length) {
        this.savedLocations = null;
        this.currentLocation = null;
        this.isConfigured = false;
        this.forecast = undefined;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return;
      }
      const newLocations = JSON.stringify(this.savedLocations);
      localStorage.setItem(LOCAL_STORAGE_KEY, newLocations);
    },
  },
});
