<template>
  <div class="input-box">
    <button
      class="btn btn-primary google"
      type="button"
      @click="loginWithGoogle"
    >
      Login with Google
    </button>
    <div class="mt-2 mb-2 text-center">OR</div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="email" class="form-label label"> Email </label>
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
        <label for="password" class="form-label label"> Password </label>
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
        <div class="input-field btn-submit">
          <input
            type="submit"
            class="submit"
            value="Log in"
            v-if="!isPending"
          />
        </div>
        <SpinnerView v-if="isPending" />
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
import SpinnerView from "@/components/SpinnerView.vue";

export default {
  components: {
    SpinnerView,
  },
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
.input-box {
  width: 330px;
  box-sizing: border-box;
  margin-top: -25px;
}

.input-field {
  display: flex;
  flex-direction: column;
  position: relative;
}

.submit {
  border: none;
  outline: none;
  height: 45px;
  background: #ececec;
  border-radius: 5px;
  transition: 0.4s;
  font-size: 1.25rem;
  margin-top: 40px;
}

.submit:hover {
  background: #093636;
  color: #fff;
}

.google {
  border: none;
  outline: none;
  height: 45px;
  background: #810101;
  border-radius: 5px;
  transition: 0.4s;
  font-size: 1.25rem;
  width: 100%;
}

.google:hover {
  background: #a00101;
}

.signin {
  text-align: center;
  font-size: small;
  margin-top: 25px;
}
</style>
