<template>
  <div class="login-with-google">
    <button type="button" @click="loginWithGoogle">Login with Google</button>
  </div>
  <span class="brake-or"> OR </span>

  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending" type="submit">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
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

<style scoped>
.login-with-google {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  border: 1px solid var(--secondary);
  background: white;
  display: flex;
  justify-content: center;
}

.brake-or {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  justify-content: center;
}
</style>
