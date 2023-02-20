<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/NavbarComponent.vue";
import getUser from "./hooks/getUser";
</script>

<template>
  <Navbar />
  <div class="app">
    <RouterView />
  </div>
</template>

<style scoped>
.app {
  background-color: #212529;
}
</style>
