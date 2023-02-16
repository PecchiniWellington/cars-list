import { ref, type Ref } from "vue";
import { projectAuth } from "../firebase/config";
const error: Ref<null | string> = ref(null);
const isPending = ref(false);

const login = async (email: string, password: string) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
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
