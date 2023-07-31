<template>
  <div class="container mx-auto my-5" :key="currentLocation">
    <v-card :loading="isLoading">
      <v-toolbar color="blue-darken-2" class="text-white py-2">
        <v-toolbar-title>
          {{
            settingsAreOpened ? "Settings" : currentLocation || "No location..."
          }}
        </v-toolbar-title>
        <v-btn
          :icon="settingsAreOpened ? 'mdi-close' : 'mdi-cog'"
          color="blue-darken-2"
          class="bg-white"
          @click="toggleSettings"
        ></v-btn>
      </v-toolbar>
      <ForecastView
        v-if="!settingsAreOpened"
        :forecast="forecast"
        :fetch-error="fetchError"
      />
      <SettingsView v-if="settingsAreOpened" />
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ForecastView } from "@views/ForecastView";
import { SettingsView } from "@views/Settings";
import { useAppStore } from "@shared/stores";
import { storeToRefs } from "pinia";
import { onUpdated } from "vue";
import { onMounted } from "vue";

export default defineComponent({
  setup() {
    const store = useAppStore();
    const {
      isConfigured,
      settingsAreOpened,
      isLoading,
      currentLocation,
      forecast,
      savedLocations,
      refetch,
      fetchError,
    } = storeToRefs(store);
    const { toggleSettings, getWeather } = store;
    onMounted(() => {
      if (savedLocations.value) {
        getWeather(
          savedLocations.value.find((l) => l.title === currentLocation.value)
        );
      }
    });
    onUpdated(async () => {
      if (refetch.value) {
        getWeather(
          savedLocations.value.find((l) => l.title === currentLocation.value)
        );
      }
    });

    return {
      isLoading,
      settingsAreOpened,
      isConfigured,
      currentLocation,
      toggleSettings,
      forecast,
      fetchError,
    };
  },
  components: {
    ForecastView,
    SettingsView,
  },
  computed: {},
});
</script>

<style lang="scss">
.container {
  width: 350px;
}
</style>
