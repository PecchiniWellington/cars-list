<template>
  <div
    class="container-sm border border-secondary-subtle p-5"
    style="max-width: 28rem"
  >
    <h3 class="mt-2 pb-4 text-center">Create Car Fleet</h3>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label"> Title Cars Fleet</label>
        <input
          class="form-control"
          id="carsFleetTitle"
          aria-describedby="CarsFleet title"
          type="text"
          required
          placeholder="CarsFleet title"
          v-model="title"
        />
      </div>
      <div class="mb-3">
        <label for="Description" class="form-label">Description</label>
        <textarea
          class="form-control"
          required
          placeholder="CarsFleet description..."
          v-model="description"
        ></textarea>
      </div>

      <label class="form-label">Upload image</label>
      <div class="mb-3 border border-secondary-subtle p-4">
        <div class="mb-3">
          <label for="upload" class="form-label">
            Choose from you computer</label
          >
          <input
            id="upload"
            class="form-control"
            type="file"
            @change="handleChange"
          />
        </div>
        <div class="mt-2 mb-2 text-center">OR</div>
        <div class="mb-3">
          <label for="copy-url" class="form-label">Copy here URL</label>
          <input
            id="copy-url"
            class="form-control"
            type="text"
            placeholder="Url"
            v-model="externalUrl"
          />
        </div>
        <div class="error">{{ fileError }}</div>
      </div>

      <button class="btn btn-primary" v-if="!isPending">Create</button>
      <button class="btn btn-secondary" v-else disabled>Saving...</button>
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
