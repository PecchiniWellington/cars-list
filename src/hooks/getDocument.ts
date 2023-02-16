import { watchEffect, ref, type Ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getDocument = (collection: string, id: string) => {
  const document: any = null;
  const error: Ref<null | string> = ref(null);

  const documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        error.value = "that document does not exist";
      }
    },
    (err) => {
      error.value = "problem fetching the document";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
