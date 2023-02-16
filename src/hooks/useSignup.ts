import { ref } from "vue";
import { projectAuth } from "../firebase/config";
import type { UserCredential } from "@firebase/auth-types";

const error = ref(null);
const isPending = ref(false);

const signup = async (email: string, password: string, displayName: string) => {
  error.value = null;
  isPending.value = true;

  try {
    const res: UserCredential =
      await projectAuth.createUserWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("Could not complete signup");
    }
    if (res.user) {
      await res.user.updateProfile({ displayName });
    }
    error.value = null;
    isPending.value = false;

    return res;
  } catch (err: any | unknown) {
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, signup, isPending };
};

export default useSignup;
