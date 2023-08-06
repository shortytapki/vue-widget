<template lang="">
  <div class="w-75 mx-auto py-5 px-5" v-if="forecast">
    <div class="d-flex align-center justify-center">
      <p class="text-h2">{{ Math.floor(forecast.temperature) }}&deg;C</p>
      <img
        width="80"
        :src="`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`"
        alt=""
      />
    </div>
    <p class="text-center mb-5">
      Feels like {{ Math.floor(forecast.feelsLike) }}&deg;C,
      {{ forecast.description }}.
    </p>
    <v-list-item
      v-for="(item, idx) of forecastListItems"
      :key="idx"
      :value="item"
    >
      <template v-slot:prepend>
        <v-icon :icon="item.icon"> </v-icon>
      </template>
      <v-list-item-title
        v-text="`${capitalize(item.text)}: ${forecast[item.text]}${item.unit}`"
      ></v-list-item-title>
    </v-list-item>
  </div>
  <v-card-text v-if="!savedLocations">
    Unable to show forecast without any location.
  </v-card-text>
  <v-card-text v-if="fetchError" class="text-red-darken-2">
    Error: {{ fetchError }}. Try to change or edit current location.
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { capitalize } from "@shared/lib";
import { useMainStore, useSettingsStore } from "@shared/stores";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const mainStore = useMainStore();
    const { forecast, fetchError } = storeToRefs(mainStore);

    const settingsStore = useSettingsStore();
    const { savedLocations } = storeToRefs(settingsStore);

    const forecastListItems = [
      { text: "visibility", icon: "mdi-car-light-fog", unit: "km" },
      { text: "humidity", icon: "mdi-water-percent", unit: "%" },
      { text: "wind", icon: "mdi-windsock", unit: "ms" },
      {
        text: "dewPoint",
        icon: "mdi-water-thermometer-outline",
        unit: "°C",
      },
      { text: "pressure", icon: "mdi-compass-outline", unit: "hPa" },
    ];

    return {
      capitalize,
      forecastListItems,
      forecast,
      savedLocations,
      fetchError,
    };
  },
});
</script>
