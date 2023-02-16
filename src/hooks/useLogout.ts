import { ref, type Ref } from "vue";
import { projectAuth } from "../firebase/config";

// refs
const error: Ref<null | string> = ref(null);
const isPending: Ref<boolean> = ref(false);

// logout function
const logout = async () => {
  error.value = null;
  isPending.value = true;

  try {
    await projectAuth.signOut();
    isPending.value = false;
  } catch (err: any | unknown) {
    error.value = err.message;
    isPending.value = false;
  }
};

const useLogout = () => {
  return { error, logout, isPending };
};

export default useLogout;
