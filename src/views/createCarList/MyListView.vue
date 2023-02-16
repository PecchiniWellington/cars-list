<template>
  <div class="user-carsFleet">
    <h2>My CarFleets</h2>
    <div v-if="carsFleet">
      <ListView :carsFleet="carsFleet" />
    </div>
    <router-link :to="{ name: ROUTES_NAME.CREATE_CAR }" class="btn">
      Create a New CarsFleet
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

<style scoped>
h2 {
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--secondary);
}

.btn {
  margin-top: 20px;
}
</style>
