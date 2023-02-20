<template>
  <div class="container-fluid detail-container">
    <div
      class="text-danger-emphasis bg-danger-subtle border border-dander-subtle rounded-3 p-2 mt-2 mb-2"
      v-if="error"
    >
      {{ error }}
    </div>
    <div class="card" style="width: 100%">
      <img :src="carFleet?.coverUrl" class="card-img-top" />
      <h2 class="">{{ carFleet.title }}</h2>
      <p class="card-text text-center">
        <small class="text-muted text-white"
          >created by {{ carFleet.userName }}</small
        >
      </p>
      <div class="card-body">
        <div class="body-desc">
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
        </div>

        <div v-if="!carFleet?.tags?.length" class="text-center">
          No tags have been added to this car fleet yet.
        </div>
        <div v-if="carFleet?.tags?.length">
          <h3 class="mb-5 text-center">LIST OF TAGS</h3>
        </div>
        <div
          v-for="tags in carFleet.tags"
          :key="tags.id"
          class="row g-0 text-center row-tag"
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

<style scoped>
.detail-container {
  background-color: #0f2024;
  padding: 40px;
  min-height: calc(100vh - 68px);
  display: flex;
  justify-content: center;
}

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  background-color: #0c1c20;
}

.body-desc {
  width: 80%;
  text-align: center;
}

.text-muted {
  color: #fff !important;
}

.text-center {
  width: 100%;
  padding: 10px;
  transition: ease-in-out 2s;
}

.card-body {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0a1619;
  box-shadow: 0px -10px 40px #00000091;
}

img {
  padding: 20px;
  height: 200px;
  width: 200px;
}

@media only screen and (max-width: 600px) {
  .row-tag {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center;
    border-bottom: 1px solid #204b56;
    padding-bottom: 20px;
  }

  .text-start {
    text-align: center !important;
  }

  .text-end {
    text-align: center !important;
  }
}
</style>
