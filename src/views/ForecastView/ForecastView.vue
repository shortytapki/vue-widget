<template lang="">
  <div class="w-75 mx-auto py-5" v-if="props.forecast && !props.fetchError">
    <div class="d-flex align-center justify-center">
      <p class="text-h2">{{ Math.floor(props.forecast.temperature) }}&deg;C</p>
      <img
        width="80"
        :src="`https://openweathermap.org/img/wn/${props.forecast.icon}@2x.png`"
        alt=""
      />
    </div>
    <p class="text-center mb-5">
      Feels like {{ Math.floor(props.forecast.feelsLike) }}&deg;C,
      {{ props.forecast.description }}.
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
        v-text="
          `${capitalize(item.text)}: ${props.forecast[item.text]}${item.unit}`
        "
      ></v-list-item-title>
    </v-list-item>
  </div>
  <div class="px-5 py-5">
    <p v-if="!isConfigured && !settingsAreOpened">
      Unable to show forecast without any location.
    </p>
    <p v-if="props.fetchError" class="text-red-darken-2">
      Error: {{ props.fetchError }}. Try to change or edit current location.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from "@shared/stores";
import { storeToRefs } from "pinia";
import { Forecast } from "@shared/types";
import { PropType } from "vue";
export default defineComponent({
  setup(props) {
    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const store = useAppStore();
    const { isConfigured, settingsAreOpened } = storeToRefs(store);
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
      isConfigured,
      settingsAreOpened,
      forecastListItems,
      props,
    };
  },
  props: {
    forecast: {
      type: Object as PropType<Forecast>,
    },
    fetchError: {
      type: String,
    },
  },
});
</script>
