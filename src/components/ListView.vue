<template>
  <div v-for="carFleet in carsFleet" :key="carFleet.id" class="card mb-3">
    <router-link
      class="row g-0"
      v-if="carFleet.id"
      :to="{ name: ROUTES_NAME.CARFLEET_DETAILS, params: { id: carFleet.id } }"
    >
      <div class="col-md-4 p-4 text-center">
        <img :src="carFleet?.coverUrl" class="img-fluid rounded-start" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ carFleet.title }}</h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">
            <small class="text-muted">created by {{ carFleet.userName }}</small>
          </p>
        </div>
      </div>
      <div class="container-sm bg-light">
        <span
          class="badge bg-secondary m-2"
          v-for="tag in carFleet.tags"
          :key="tag?.id"
        >
          {{ tag?.title }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { ROUTES_NAME } from "../router/constants";
export default {
  props: ["carsFleet"],
  setup(props) {
    return { ROUTES_NAME, props };
  },
};
</script>
