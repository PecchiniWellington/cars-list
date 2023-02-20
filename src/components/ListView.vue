<template>
  <div v-for="carFleet in carsFleet" :key="carFleet.id" class="card mb-3">
    <div class="card-cont">
      <router-link class="row g-0" v-if="carFleet.id"
        :to="{ name: ROUTES_NAME.CARFLEET_DETAILS, params: { id: carFleet.id } }">
        <div class="col-md-4 p-4 text-center img-card">
          <img :src="carFleet?.coverUrl" class="img-fluid rounded-start" />
        </div>
        <div class="col-md-8 content-desc">
          <div class="card-body">
            <h5 class="card-title">{{ carFleet.title.toUpperCase() }}</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </p>
            <p class="card-text created-by">
              <small class="text-muted">Created by {{ carFleet.userName }}</small>
            </p>
          </div>
        </div>
        <div class="container-sm bg-light footer-card">
          <span class="badge bg-secondary m-2" v-for="tag in carFleet.tags" :key="tag?.id">
            {{ tag?.title }}
          </span>
        </div>
      </router-link>
    </div>


    <div class="link-to"></div>
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
.card {
  background-color: #0c1c20;
  border-radius: 8px !important;
  display: flex !important;
  flex-direction: inherit;
  position: relative;
}


.card-cont {
  transition: all 1s;
  width: 100%;
}

.card:hover>.link-to {
  background-color: #093636;
  z-index: 1;
  width: 30px;
  transition: width 0.5s ease-in-out ;

}

.card:hover>.card-cont {
  width: calc(100% - 30px);
  transition: width 0.5s ease-in-out;
}

.link-to {
  width: 0px;
  position: absolute;
  z-index: 0;
  border-radius: 0px 8px 8px 0px;
  right: 0px;
  height: -webkit-fill-available;
}

.card-title {
  border-bottom: 1px solid #384865;
  padding-bottom: 5px;
}

.created-by {
  margin-top: auto
}

.footer-card {
  background-color: #0a1619 !important;
}

.img-card {
  background-color: #fff;
}

.badge {
  background-color: #093636 !important;
  box-shadow: 0px 3px 11px #141313;
}

a {
  text-decoration: none;
  color: #fff;
  text-decoration: none;
  box-shadow: 0px 10px 30px black;
  border-radius: 8px !important;
}

.text-muted {
  color: #fff !important;
}
</style>
