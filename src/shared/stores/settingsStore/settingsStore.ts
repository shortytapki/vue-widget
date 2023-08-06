import { defineStore } from "pinia";
import type { Location } from "@shared/types";

type SavedLocations = null | Array<Location>;

interface SettingsStoreSchema {
  savedLocations: null | Array<Location>;
  currentLocation: undefined | Location;
  refetch: boolean;
}

const LOCAL_STORAGE_KEY = "savedLocations";

export const useSettingsStore = defineStore("settings", {
  state(): SettingsStoreSchema {
    const storageRecord = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedLocations: SavedLocations = storageRecord
      ? JSON.parse(storageRecord)
      : null;
    return {
      savedLocations,
      currentLocation: savedLocations?.at(0) || undefined,
      refetch: false,
    };
  },
  actions: {
    addLocation(value: string) {
      const location: Location = { id: Math.random(), title: value };
      if (!this.savedLocations) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([location]));
        this.savedLocations = [location];
        this.currentLocation = location;
        this.refetch = true;
        return;
      }
      this.savedLocations.push(location);
      const newLocations = this.savedLocations;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLocations));
    },

    setCurrentLocation(l: Location) {
      this.currentLocation = l;
    },

    updateLocationOnDragEnd() {
      this.setCurrentLocation(this.savedLocations.at(0));
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(this.savedLocations)
      );
      this.refetch = true;
    },

    setRefectch(value: boolean) {
      this.refetch = value;
    },

    deleteLocation(id: number) {
      let idxOfIem;
      this.savedLocations = this.savedLocations.filter(
        (l: Location, idx: number) => {
          if (l.id === id) {
            idxOfIem = idx;
          }
          return l.id !== id;
        }
      );
      if (!this.savedLocations.length) {
        this.savedLocations = null;
        this.currentLocation = null;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return;
      }
      this.currentLocation = this.savedLocations.at(0);
      const newLocations = JSON.stringify(this.savedLocations);
      localStorage.setItem(LOCAL_STORAGE_KEY, newLocations);
      if (idxOfIem === 0) {
        this.refetch = true;
      }
    },
  },
});
