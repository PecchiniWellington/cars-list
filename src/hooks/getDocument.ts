import { watchEffect, ref, type Ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getDocument = (collection: string, id: string) => {
  const document: Ref<any> = ref(null);
  const error: Ref<null | string> = ref(null);

  const documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "document does not exist";
      }
    },
    () => {
      error.value = "fetching the document error";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
