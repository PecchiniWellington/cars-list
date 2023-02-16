<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New CarsFleet</h4>
      <input type="text" required placeholder="CarsFleet title" v-model="title" />
      <textarea required placeholder="CarsFleet description..." v-model="description"></textarea>
      <label>Upload CarsFleet Cover Image</label>
      <input type="file" @change="handleChange" />
      <span>OR</span>
      <label>Copy here URL</label>
      <input type="text" placeholder="external Url" v-model="externalUrl" />
      <div class="error">{{ fileError }}</div>

      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import type { RouteParamsRaw } from "vue-router";
import { timestamp } from "@/firebase/config";
import type {
  DocumentData,
  DocumentReference,
} from "@firebase/firestore-types";
import useStorage from "@/hooks/useStorage";
import useCollection from "@/hooks/useCollection";
import getUser from "@/hooks/getUser";
import {
  ExtensionFileType,
  ROUTES_NAME,
  COLLECTIONS,
} from "../../router/constants";

export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection(COLLECTIONS.CARS_FEET);
    const router = useRouter();
    const { user }: any = getUser();

    const title: Ref<string> = ref("");
    const description: Ref<string> = ref("");
    const externalUrl: Ref<string> = ref("");
    const file: Ref<string | null | File> = ref(null);
    const fileError: Ref<string | null> = ref(null);
    const isPending: Ref<boolean> = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        /* TODO: clean up */
        isPending.value = true;

        await uploadImage(file.value);

        const res: DocumentReference<DocumentData> | undefined = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          tags: [],
          createdAt: timestamp(),
        });

        isPending.value = false;
        if (!error.value) {
          router.push({
            name: ROUTES_NAME.CARFLEET_DETAILS,
            params: res?.id as RouteParamsRaw | undefined,
          });
        }
      } else {
        /* TODO: clean up */
        isPending.value = true;

        const res: DocumentReference<DocumentData> | undefined = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: externalUrl.value,
          filePath: null,
          tags: [],
          createdAt: timestamp(),
        });

        isPending.value = false;
        if (!error.value) {
          router.push({
            name: ROUTES_NAME.CARFLEET_DETAILS,
            params: res?.id as RouteParamsRaw | undefined,
          });
        }
      }
    };

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      let selected = target.files !== null ? target.files[0] : null;

      if (selected && ExtensionFileType.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png / jpg / jpeg)";
      }
    };

    return {
      title,
      description,
      externalUrl,
      handleSubmit,
      fileError,
      handleChange,
      isPending,
    };
  },
};
</script>

<style>
form {
  background: white;
}

input[type="file"] {
  border: 0;
  padding: 0;
}

label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}

button {
  margin-top: 20px;
}
</style>
