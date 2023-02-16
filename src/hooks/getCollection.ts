import { ref, watchEffect, type Ref } from "vue";
import { projectFirestore } from "../firebase/config";
import type { DocumentData } from "firebase/firestore";

const getCollection = (collection: any, query?: any) => {
  const documents: Ref<{ doc: DocumentData; id: string }[] | null> = ref([
    { doc: {}, id: "" },
  ]);
  const error: Ref<null | string> = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  if (query) {
    collectionRef = collectionRef.where(query[0], query[1], query[2]);
  }

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      const results: { doc: DocumentData; id: string }[] = [];
      snap.docs.forEach((doc: DocumentData) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      error.value = null;
    },
    () => {
      documents.value = null;
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
