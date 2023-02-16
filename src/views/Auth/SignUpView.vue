<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign Up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending" type="submit">Sign Up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
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
