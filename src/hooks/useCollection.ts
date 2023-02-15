import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection: any) => {
  const error = ref(null);
  const isPending = ref(false);

  // add a new document
  const addDoc = async (doc: any) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await projectFirestore.collection(collection).add(doc);
      isPending.value = false;
      return res;
    } catch (err: any) {
      (error as any).value = "could not send the message";
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;
