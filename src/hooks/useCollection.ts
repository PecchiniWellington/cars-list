import type { DocumentData } from "firebase/firestore";
import { ref, type Ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection: string) => {
  const error: Ref<string | null> = ref(null);
  const isPending = ref(false);

  // add a new document
  const addDoc = async (doc: DocumentData) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await projectFirestore.collection(collection).add(doc);
      isPending.value = false;
      return res;
    } catch (err: any | unknown) {
      error.value = "could not send the message";
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;
