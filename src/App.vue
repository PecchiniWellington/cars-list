<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/NavbarComponent.vue";
</script>

<template>
  <Navbar />
  <div class="content">
    <RouterView />
  </div>
</template>
