<template>
  <nav class="navbar navbar-expand-lg nav-container">
    <div class="container-fluid">
      <div class="navbar-brand">
        <router-link :to="{ name: ROUTES_NAME.HOME }">
          <img class="logo" src="@/assets/logo-cristiano-ronaldo.jpeg" alt="" />
        </router-link>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="user">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: ROUTES_NAME.CREATE_CAR }">Create</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: ROUTES_NAME.MY_CARFLEET }">My Car Fleet</router-link>
          </li>
        </ul>
        <div class="d-flex" v-if="user">
          <div class="row">
            <div class="col text-align-center ps-4">
              <span>{{ user.displayName }}</span>
            </div>
            <div class="col">
              <button @click="handleClick" class="btn btn-outline-danger" type="submit">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="navbarSupportedContent" class="d-flex" v-if="!user">
        <router-link class="btn" :to="{ name: ROUTES_NAME.SIGN_UP }">
          <button class="btn btn-outline-info" type="submit">Signup</button>
        </router-link>
        <router-link class="btn" :to="{ name: ROUTES_NAME.LOGIN }">
          <button class="btn btn-outline-success" type="submit">Login</button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import getUser from "@/hooks/getUser";
import useLogout from "@/hooks/useLogout";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ROUTES_NAME } from "../router/constants";
export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      router.push({ name: ROUTES_NAME.LOGIN });
    };

    const display: any = computed(() => {
      return user.value ? "block" : "none";
    });

    return { handleClick, user, ROUTES_NAME, display };
  },
};
</script>

<style scoped>
.logo {
  height: 60px;
  background-color: #fff;
  padding: 5px;
}

.nav-container {
  display: v-bind(display);
  background-color: #0c1c20 !important;
  color: #ffff;
}

.text-align-center {
  display: flex;
  align-items: center;
}

.nav-link.router-link-active {
  border-bottom: 1px solid #2bffff;
  color: #ffff;
}

.nav-link {
  color: #ffff;
  padding-left: 15px;
}

.nav-link:hover {
  color: #ffff;
}

.nav-item {
  margin-left: 10px;
}

.navbar-toggler-icon {
  /* background-color: rgb(9, 54, 54); */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgb(9, 54, 54)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  border: none;
    outline: none;
  }
  .navbar-toggler{
  color: transparent !important;
  border: none;
    outline: none;
}
.navbar-toggler:active {
  border: none;
    outline: none;
  /* border: 1px solid rgb(9, 54, 54); */
}
button{
  border: none !important;
    outline: none !important;
}

@media only screen and (max-width: 600px) {
  .nav-item {
    margin-left: 10px;
  }

  .d-flex {
    margin-left: 10px;
  }
  .navbar-collapse{
    margin-top: 10px !important;
  }
}
</style>
