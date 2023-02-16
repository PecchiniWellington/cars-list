<template>
  <div
    v-if="error"
    class="text-danger-emphasis bg-danger-subtle border border-dander-subtle rounded-3 p-2 mt-2 mb-2"
  >
    Could not fetch the data
  </div>
  <div v-if="documents">
    <ListView :carsFleet="documents" />
  </div>
</template>

<script lang="ts">
import ListView from "@/components/ListView.vue";
import getCollection from "@/hooks/getCollection";
import { COLLECTIONS } from "@/router/constants";

export default {
  components: { ListView },
  setup() {
    const { error, documents } = getCollection(COLLECTIONS.CARS_FEET);
    return { error, documents };
  },
};
</script>
