<template>
  <div class="navbar">
    <nav>
      <img class="logo" src="@/assets/ronaldo.jpeg" />
      <h1>
        <router-link :to="{ name: ROUTES_NAME.HOME }"
          >Ronaldo Car fleet</router-link
        >
      </h1>
      <div class="links">
        <div v-if="user">
          <router-link class="btn" :to="{ name: ROUTES_NAME.CREATE_CAR }"
            >Create</router-link
          >
          <router-link class="btn" :to="{ name: ROUTES_NAME.MY_CARFLEET }"
            >My Car Fleet</router-link
          >
          <span>{{ user.displayName }}</span>
          <button @click="handleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: ROUTES_NAME.SIGN_UP }"
            >Signup</router-link
          >
          <router-link class="btn" :to="{ name: ROUTES_NAME.LOGIN }"
            >Login</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import getUser from "@/hooks/getUser";
import useLogout from "@/hooks/useLogout";
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
    return { handleClick, user, ROUTES_NAME };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

.logo {
  border-radius: 8%;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav img {
  max-height: 60px;
}

nav h1 {
  margin-left: 20px;
}

nav .links {
  margin-left: auto;
}

nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}

span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
}
</style>
