<template lang="">
  <div class="px-5 py-5">
    <div v-if="savedLocations && savedLocations.length > 0" class="mb-5">
      <draggable
        v-model="savedLocations"
        tag="div"
        :list="savedLocations"
        @end="setCurrentLocation"
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
    <v-form class="w-100" @submit.prevent>
      <v-text-field
        v-model="inputValue"
        label="Location"
        placeholder="Ex: London, UK"
        validate-on="blur"
        variant="outlined"
        append-icon="mdi-plus"
        :rules="[
          (value) => {
            if (value?.length) return true;
            return 'The field is empty.';
          },
        ]"
        @click:append="inputValue && handleAddition(inputValue)"
      />
    </v-form>
  </div>
</template>

<script lang="ts">
import { useAppStore } from "@shared/stores";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { ref } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  setup() {
    let inputValue = ref("");
    const settingsStore = useAppStore();
    const { savedLocations } = storeToRefs(settingsStore);
    const { addLocation, deleteLocation, setCurrentLocation } = settingsStore;

    const handleDeletion = (id: number) => {
      deleteLocation(id);
    };
    const handleAddition = (location: string) => {
      addLocation({ title: location, id: Math.floor(Math.random() * 10000) });
      inputValue.value = "";
    };
    return {
      savedLocations,
      addLocation,
      inputValue,
      handleDeletion,
      handleAddition,
      setCurrentLocation,
    };
  },

  components: {
    draggable,
  },
});
</script>
