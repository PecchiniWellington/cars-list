<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents">
      <ListView :carsFleet="documents" />
    </div>
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
