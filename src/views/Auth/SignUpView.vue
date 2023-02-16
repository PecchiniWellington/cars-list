<template>
  <div
    class="container-sm border border-secondary-subtle p-5"
    style="max-width: 28rem"
  >
    <h3 class="mt-2 pb-4 text-center">Sign Up</h3>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="displayName" class="form-label"> User Name </label>
        <input
          class="form-control"
          id="displayName"
          aria-describedby="display Name"
          required
          type="text"
          placeholder="User name"
          v-model="displayName"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label"> Email address </label>
        <input
          class="form-control"
          id="carsFleetTitle"
          aria-describedby="CarsFleet title"
          required
          type="email"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label"> Password </label>
        <input
          class="form-control"
          id="carsFleetTitle"
          aria-describedby="CarsFleet title"
          required
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="mb-3">
        <div
          v-if="error"
          class="text-danger-emphasis bg-danger-subtle border border-dander-subtle rounded-3 p-2 mt-2 mb-2"
        >
          {{ error }}
        </div>
        <button class="btn btn-success" v-if="!isPending" type="submit">
          Sign Up
        </button>
        <button class="btn btn-secondary" v-if="isPending" disabled>
          Loading
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import useSignup from "@/hooks/useSignup";
import { ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { ROUTES_NAME } from "../../router/constants";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const router = useRouter();

    const email: Ref<string> = ref("");
    const password: Ref<string> = ref("");
    const displayName: Ref<string> = ref("");

    /* METHOS */
    const handleSubmit = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        router.push({ name: ROUTES_NAME.MY_CARFLEET });
      }
    };

    return { email, password, displayName, handleSubmit, error, isPending };
  },
};
</script>
