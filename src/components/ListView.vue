<template>
  <div v-for="carFleet in carsFleet" :key="carFleet.id">
    <router-link
      :to="{ name: ROUTES_NAME.CARFLEET_DETAILS, params: { id: carFleet.id } }"
    >
      <div class="single">
        <div class="thumbnail">
          <img :src="carFleet.coverUrl" />
        </div>
        <div class="info">
          <h3>{{ carFleet.title }}</h3>
          <p>created by {{ carFleet.userName }}</p>
        </div>
        <div class="tags-container">
          <div class="tag-number" v-for="tag in carFleet.tags" :key="tag?.id">
            <p class="tag-title">{{ tag?.title }}</p>
          </div>
        </div>
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

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}

.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}

.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}

img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}

.info {
  margin: 0 30px;
}

.tags-container {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tag-number {
  margin-left: auto;
  border: 1px solid #333;
  background-color: rgb(61, 61, 61);
  padding: 2px 5px;
  margin-bottom: 5px;
  border-radius: 8px;
}

.tag-title {
  color: #fff !important;
}
</style>
