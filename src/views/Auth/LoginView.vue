<template>
  <div
    class="container-sm border border-secondary-subtle p-5"
    style="max-width: 28rem"
  >
    <h3 class="mt-2 pb-4 text-center">Login</h3>
    <div class="card mt-4 mb-4">
      <button class="btn btn-primary" type="button" @click="loginWithGoogle">
        Login with Google
      </button>
    </div>

    <div class="mt-2 mb-2 text-center">OR</div>

    <form @submit.prevent="handleSubmit">
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
          Log in
        </button>
        <button class="btn btn-secondary" v-if="isPending" disabled>
          Loading
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import useLogin from "@/hooks/useLogin";
import { ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { ROUTES_NAME } from "../../router/constants";

export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const router = useRouter();

    const email = ref("");
    const password = ref("");
    const isLoginWithGoogle: Ref<boolean> = ref(true);

    const handleSubmit = async () => {
      await login(!isLoginWithGoogle.value, email.value, password.value);
      if (!error.value) {
        router.push({ name: ROUTES_NAME.MY_CARFLEET });
      }
    };
    const loginWithGoogle = async () => {
      await login(isLoginWithGoogle.value, "", "");
      if (!error.value) {
        router.push({ name: ROUTES_NAME.MY_CARFLEET });
      }
    };

    return {
      email,
      password,
      handleSubmit,
      loginWithGoogle,
      error,
      isPending,
      isLoginWithGoogle,
    };
  },
};
</script>
