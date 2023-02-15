<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New CarsFleet</h4>
      <input
        type="text"
        required
        placeholder="CarsFleet title"
        v-model="title"
      />
      <textarea
        required
        placeholder="CarsFleet description..."
        v-model="description"
      ></textarea>
      <!-- upload carFleet image -->
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
import useStorage from "@/hooks/useStorage";
import useCollection from "@/hooks/useCollection";
import { useRouter } from "vue-router";
import getUser from "@/hooks/getUser";
import { timestamp } from "@/firebase/config";
import { ROUTES_NAME } from "../../router/constants";

export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("carsFleet");
    const router = useRouter();
    const { user }: any = getUser();
    const title = ref("");
    const description = ref("");
    const externalUrl = ref("");
    const file: any = ref(null);
    const fileError: any = ref(null);
    const isPending = ref(false);
    const types = ["image/png", "image/jpeg", "image/jpg"];

    const handleSubmit = async () => {
      if (file.value) {
        /* TODO: clean up */
        isPending.value = true;

        await uploadImage(file.value);

        const res = await addDoc({
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
            params: res?.id as any,
          });
        }
      } else {
        /* TODO: clean up */
        isPending.value = true;

        const res = await addDoc({
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
            params: res?.id as any,
          });
        }
      }
    };

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      let selected = target.files !== null ? target.files[0] : null;

      if (selected && types.includes(selected.type)) {
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
