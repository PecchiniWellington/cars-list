import { projectStorage } from "../firebase/config";
import { ref, type Ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error: Ref<null | string> = ref(null);
  const url: Ref<null | string> = ref(null);
  const filePath: Ref<undefined | string> = ref(undefined);

  const uploadImage = async (file: Blob | Uint8Array | ArrayBuffer | any) => {
    if (user && user.value) {
      filePath.value = `covers/${user.value.uid}/${file.name}`;
    }
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err: any | unknown) {
      error.value = err.message;
    }
  };

  const deleteImage = async (path: string) => {
    const storageRef = projectStorage.ref(path);
    try {
      await storageRef.delete();
    } catch (err: any | unknown) {
      error.value = err.message;
    }
  };

  return { uploadImage, url, filePath, error, deleteImage };
};

export default useStorage;
