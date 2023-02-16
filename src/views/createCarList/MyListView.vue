<template>
  <div class="container">
    <h2>My CarFleets</h2>
    <div v-if="carsFleet">
      <ListView :carsFleet="carsFleet" />
    </div>
    <router-link :to="{ name: ROUTES_NAME.CREATE_CAR }">
      <button class="btn btn-primary mb-3">Create New Car Fleet</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import getUser from "@/hooks/getUser";
import getCollection from "@/hooks/getCollection";
import ListView from "@/components/ListView.vue";
import { ROUTES_NAME, COLLECTIONS } from "@/router/constants";

export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    let userId = null;

    if (user.value !== null && user.value.uid !== null) {
      userId = user.value.uid;
    }
    const { documents: carsFleet } = getCollection(COLLECTIONS.CARS_FEET, [
      "userId",
      "==",
      userId,
    ]);
    return { carsFleet, ROUTES_NAME };
  },
};
</script>
