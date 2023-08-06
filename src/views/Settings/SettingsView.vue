<template lang="">
  <div class="px-5 py-5">
    Your current location is the one at the top.
    <div v-if="savedLocations" class="mb-5">
      <draggable
        v-model="savedLocations"
        tag="div"
        itemKey="title"
        :list="savedLocations"
        @end="updateLocationOnDragEnd"
      >
        <template #item="{ element: item }">
          <v-list-item
            :key="item.title"
            :value="item"
            prepend-icon="mdi-menu"
            draggable
          >
            <template v-slot:append>
              <v-icon
                icon="mdi-trash-can-outline"
                @click="handleDeletion(item.id)"
              />
            </template>
            <template v-slot:prepend>
              <v-icon icon="mdi-menu" />
            </template>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </template>
      </draggable>
    </div>
    <p v-else class="mb-5">
      You don't have saved locations. Fill in the field below to add one.
    </p>
    <v-form class="w-100" @submit.prevent="handleAddition">
      <v-text-field
        v-model="input"
        label="Location"
        class="mb-3"
        placeholder="Ex: London, UK"
        validate-on="submit"
        variant="outlined"
        :rules="rules"
      />
      <v-btn type="submit" size="large" class="w-100" color="blue-darken-2">
        Add location
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { useSettingsStore } from "@shared/stores";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ref } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  setup() {
    let input = ref("");
    const settingsStore = useSettingsStore();
    const { savedLocations } = storeToRefs(settingsStore);
    const { addLocation, updateLocationOnDragEnd, deleteLocation } =
      settingsStore;

    const watchList = savedLocations.value ? [...savedLocations.value] : [];

    const isNotEmpty = (value: string) => {
      if (value?.length) return true;
      return "The field is required.";
    };

    const mathcesFormat = (value: string) =>
      /(\w+,\s[A-Z]{2})/.test(value) ||
      "Please fill the field according to the example.";

    const rules = [isNotEmpty, mathcesFormat];

    const handleDeletion = (id: number) => {
      deleteLocation(id);
    };

    const handleAddition = () => {
      if (!input.value.length || !/(\w+,\s[A-Z]{2})/.test(input.value)) return;
      addLocation(input.value);
      input.value = "";
    };
    return {
      savedLocations,
      input,
      handleDeletion,
      handleAddition,
      updateLocationOnDragEnd,
      rules,
      watchList,
    };
  },

  components: {
    draggable,
  },
});
</script>
