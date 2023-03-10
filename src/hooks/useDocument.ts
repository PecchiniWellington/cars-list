import { ref, type Ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useDocument = (collection: string, id: string) => {
  const error: Ref<string | null> = ref(null);
  const isPending = ref(false);
  const docRef = projectFirestore.collection(collection).doc(id);

  const deleteDoc = async () => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.delete();
      isPending.value = false;
      return res;
    } catch (err: any | unknown) {
      isPending.value = false;
      error.value = "could not delete the document";
    }
  };

  const updateDoc = async (updates: any) => {
    isPending.value = true;
    error.value = null;

    try {
      const res = await docRef.update(updates);
      isPending.value = false;
      return res;
    } catch (err: any | unknown) {
      isPending.value = false;
      error.value = "could not update the document";
    }
  };

  return { error, isPending, deleteDoc, updateDoc };
};

export default useDocument;
