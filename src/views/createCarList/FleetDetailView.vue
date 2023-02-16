<template>
  <div
    class="text-danger-emphasis bg-danger-subtle border border-dander-subtle rounded-3 p-2 mt-2 mb-2"
    v-if="error"
  >
    {{ error }}
  </div>

  <div v-if="carFleet" class="row">
    <div class="card col" style="width: 18rem">
      <img :src="carFleet?.coverUrl" class="card-img-top" />
      <div class="card-body">
        <h2 class="text-center">{{ carFleet.title }}</h2>
        <p class="card-text text-center">
          <small class="text-muted">created by {{ carFleet.userName }}</small>
        </p>
        <div class="text-center">
          <p
            class="p"
            v-if="carFleet.description.length < 100 && !readActivated"
          >
            {{ carFleet.description }}
          </p>
          <p
            class="p"
            v-if="carFleet.description.length > 100 && !readActivated"
          >
            {{ carFleet.description.slice(0, 100) }}...
          </p>
          <p class="p" v-if="readActivated">{{ carFleet.description }}</p>
          <div class="mb-2" v-if="carFleet.description.length > 100">
            <button
              v-if="readActivated"
              class="read btn btn-secondary"
              @click="handleReadMore"
            >
              ..read less
            </button>
            <button
              v-if="!readActivated"
              class="read btn btn-secondary"
              @click="handleReadMore"
            >
              ..read more
            </button>
          </div>
          <button class="btn btn-danger" v-if="ownership" @click="handleDelete">
            Delete Car Fleet
          </button>
        </div>
      </div>
    </div>

    <div class="col">
      <!-- tags list -->
      <div v-if="!carFleet?.tags?.length">
        No tags have been added to this car fleet yet.
      </div>
      <div v-if="carFleet?.tags?.length">
        <h3 class="mb-5 text-center">LIST OF TAGS</h3>
      </div>
      <div
        v-for="tags in carFleet.tags"
        :key="tags.id"
        class="row g-0 text-center"
      >
        <div class="text-start col-sm-6 col-md-8">
          <h3>{{ tags.title }}</h3>
          <p>{{ tags.artist }}</p>
        </div>
        <div class="col-6 col-md-4 text-end">
          <button
            class="btn btn-danger"
            v-if="ownership"
            @click="handleClick(tags.id)"
          >
            delete
          </button>
        </div>
      </div>
      <AddTagView v-if="ownership" :carFleet="carFleet" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import type { Ref } from "vue";
import { useRouter } from "vue-router";
import getDocument from "@/hooks/getDocument";
import useDocument from "@/hooks/useDocument";
import getUser from "@/hooks/getUser";
import useStorage from "@/hooks/useStorage";
import AddTagView from "@/components/AddTagView.vue";
import { ROUTES_NAME, COLLECTIONS } from "@/router/constants";

export default {
  props: ["id"],
  components: { AddTagView },
  setup(props) {
    const { error, document: carFleet } = getDocument(
      COLLECTIONS.CARS_FEET,
      props.id
    );
    const { deleteDoc, updateDoc } = useDocument(
      COLLECTIONS.CARS_FEET,
      props.id
    );
    const { user } = getUser();
    const { deleteImage } = useStorage();
    const router = useRouter();

    let readActivated: Ref<boolean> = ref(false);

    const ownership = computed(() => {
      return (
        carFleet.value && user.value && user.value.uid == carFleet.value.userId
      );
    });

    /* METHODS */
    const handleDelete = async () => {
      await deleteImage(carFleet.value.filePath);
      await deleteDoc();
      router.push({ name: ROUTES_NAME.HOME });
    };

    const handleClick = async (id: string) => {
      if (carFleet.value.tags) {
        const tags = carFleet.value.tags.filter((tags: any) => tags.id != id);

        await updateDoc({ tags });
      }
    };

    const handleReadMore = () => {
      readActivated.value = !readActivated.value;
    };

    return {
      error,
      carFleet,
      ownership,
      handleDelete,
      handleClick,
      handleReadMore,
      readActivated,
    };
  },
};
</script>
