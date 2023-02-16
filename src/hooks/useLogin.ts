import { ref, type Ref } from "vue";
import { projectAuth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";

const error: Ref<null | string> = ref(null);
const isPending = ref(false);

const login = async (
  loginWithGoogle: boolean,
  email: string,
  password: string
) => {
  error.value = null;
  isPending.value = true;

  try {
    let res = null;
    if (loginWithGoogle) {
      const provide = new GoogleAuthProvider();
      res = await signInWithPopup(projectAuth, provide);
    } else {
      res = await projectAuth.signInWithEmailAndPassword(email, password);
    }
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err: any | unknown) {
    isPending.value = false;
    error.value = "Incorrect login credentials";
  }
};

const useLogin = () => {
  return { error, login, isPending };
};

export default useLogin;
