<template>
  <div
    class="container mx-auto my-5"
    :key="`${currentLocation?.title}|${savedLocations?.length}`"
  >
    <v-card :loading="isLoading">
      <v-toolbar color="blue-darken-2" class="text-white py-2">
        <v-toolbar-title>
          {{
            mainView ? currentLocation?.title || "No location..." : "Settings"
          }}
        </v-toolbar-title>
        <v-btn
          :icon="mainView ? 'mdi-cog' : 'mdi-close'"
          color="blue-darken-2"
          class="bg-white"
          @click="toggleSettings"
        ></v-btn>
      </v-toolbar>
      <ForecastView v-if="mainView" />
      <SettingsView v-else />
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, onMounted, ref } from "vue";
import { ForecastView } from "@views/ForecastView";
import { SettingsView } from "@views/Settings";
import { useMainStore, useSettingsStore } from "@shared/stores";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const mainStore = useMainStore();

    const { fetchError, isLoading, mainView, forecast } =
      storeToRefs(mainStore);

    const { toggleSettings, getWeather, setIsLoading } = mainStore;

    const settingsStore = useSettingsStore();
    const { savedLocations, currentLocation, refetch } =
      storeToRefs(settingsStore);

    const { setRefectch } = settingsStore;
    const { setFetchError, setForecast } = mainStore;

    onMounted(() => {
      if (currentLocation?.value) {
        getWeather(currentLocation.value);
      }
      setIsLoading(false);
    });

    onUpdated(() => {
      if (currentLocation?.value && refetch.value) {
        getWeather(currentLocation.value);
        setRefectch(false);
      }
      if (!savedLocations.value?.length) {
        setForecast(undefined);
        setFetchError("");
      }
      setIsLoading(false);
    });

    return {
      isLoading,
      mainView,
      forecast,
      fetchError,
      toggleSettings,
      currentLocation,
      savedLocations,
    };
  },
  components: {
    ForecastView,
    SettingsView,
  },
});
</script>

<style lang="scss">
.container {
  width: 375px;
}
</style>
