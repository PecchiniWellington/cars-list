import { projectStorage } from "../firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error: any = ref(null);
  const url: any = ref(null);
  const filePath: any = ref(null);

  const uploadImage = async (file: any) => {
    if (user && user.value) {
      filePath.value = `covers/${user.value.uid}/${file.name}`;
    }
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
    } catch (err: any) {
      error.value = err.message;
    }
  };

  const deleteImage = async (path: string) => {
    const storageRef = projectStorage.ref(path);
    try {
      await storageRef.delete();
    } catch (err: any) {
      error.value = err.message;
    }
  };

  return { uploadImage, url, filePath, error, deleteImage };
};

export default useStorage;
