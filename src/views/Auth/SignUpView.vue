<template>
  <div class="input-box">
  
  <form @submit.prevent="handleSubmit">
    <div class="mb-3">
      <label for="email" class="form-label label"> Email </label>
      <input class="form-control" id="carsFleetTitle" aria-describedby="CarsFleet title" required
        type="email" placeholder="Email" v-model="email" />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label label"> Password </label>
      <input class="form-control" id="carsFleetTitle" aria-describedby="CarsFleet title" required
        type="password" placeholder="Password" v-model="password" />
    </div>
    <div class="mb-3">
      <div v-if="error"
        class="text-danger-emphasis bg-danger-subtle border border-dander-subtle rounded-3 p-2 mt-2 mb-2">
        {{ error }}
      </div>
      <div class="input-field btn-submit">
        <input type="submit" class="submit" value="Log in" v-if="!isPending">
      </div>
      <SpinnerView v-if="isPending" />
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


<style scoped>


.label {
  font-size: 1.25rem;
  color: #333;
}

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
  transition: .4s;
  font-size: 1.25rem;
  margin-top: 40px;
}

.submit:hover {
  background: #093636;
  color: #fff;
}
</style>
