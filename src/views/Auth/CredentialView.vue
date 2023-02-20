<template>
  <div class="wrapper">
    <video autoplay muted loop id="myVideo">
      <source src="@/assets/modern.mp4" type="video/mp4">
    </video>

    <div class="container-fluid main">
      <div class="row">
        <div class="col-md-6 side-image">
          <!-------Image-------->
          <div class="logo-contentainer">
            <div class="container-l">
              <img class="logo" src="@/assets/logo-cristiano-ronaldo.jpeg" alt="">

            </div>
            <h5 class="subtitle">Welcome to Cristiano's fleet</h5>
          </div>
        </div>
        <div class="col-md-6 right">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                <h5 class="text-white">
                  Login
                </h5>
              </button>
              <button class="nav-link" id="nav-signup-tab" data-bs-toggle="tab" data-bs-target="#nav-signup"
                type="button" role="tab" aria-controls="nav-signup" aria-selected="false">
                <h5 class="text-white">
                  Sign Up
                </h5>
              </button>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active p-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <LoginView />
            </div>
            <div class="tab-pane fade show p-3" id="nav-signup" role="tabpanel" aria-labelledby="nav-signup-tab">
              <SignUp />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useLogin from "@/hooks/useLogin";
import { ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import { ROUTES_NAME } from "../../router/constants";
import LoginView from "./LoginView.vue";
import SignUp from "./SignUpView.vue";

export default {
  components: {
    LoginView,
    SignUp,

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
.wrapper {
  background: url(/src/assets/modern.mp4) no-repeat 50%;
  padding: 0 20px 0 20px;
}

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

.subtitle {
  padding: 15px;
  text-align: center;
  background-color: #093636;
  color: #fff;
  margin-bottom: 0px;
  border-bottom: 3px solid #21c5c5;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
}

.row {
  width: 1400px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.533);
  box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

.bg-img {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 4px;
  width: 10px;
  background: url(/src/assets/logo-cristiano-ronaldo.jpeg) no-repeat 50%;
  height: 100vh;
  width: 100vw;

}

.logo {
  position: relative;
  width: -webkit-fill-available;
  padding: 20px;
  margin: 50px 20px 0px 20px;
}

.logo-contentainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: none;
  /*  */
}

.side-image {
  padding: 0px;
}

.tab-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.tab-content>.active {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
}

.tab-pane {
  margin: 0px 20px 50px 20px
}

.nav-tabs {
  border-top: 3px solid #21c5c5;
  text-align: center;
  background-color: #093636;
  color: #fff;
  margin-bottom: 0px;
}

.nav-link.active {
  border: none;
  border-bottom: 2px solid #21c5c5 !important;
  background-color: #093636 !important;

}

.nav-link:hover {
  border: none
}

@media only screen and (max-width: 768px) {
  .side-image {
    border-radius: 10px 10px 0 0;
  }

  .text {
    position: absolute;
    top: 70%;
    text-align: center;
  }

  .text p,
  i {
    font-size: 17px;
  }

  .right {
    padding-bottom: 20px;

  }

  .row {

    width: 100%;
  }
}
</style>