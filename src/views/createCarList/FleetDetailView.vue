<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="carFleet" class="carFleet-details">
    <!-- carFleet information -->
    <div class="carFleet-info">
      <div class="cover">
        <img :src="carFleet.coverUrl" />
      </div>
      <h2>{{ carFleet.title }}</h2>
      <p class="username">Created by {{ carFleet.userName }}</p>
      <p class="description">{{ carFleet.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete CarsFleet</button>
    </div>

    <!-- tags list -->
    <div class="tags-list">
      <div v-if="!carFleet?.tags?.length">
        No tags have been added to this car fleet yet.
      </div>
      <div v-for="tags in carFleet.tags" :key="tags.id" class="single-tags">
        <div class="details">
          <h3>{{ tags.title }}</h3>
          <p>{{ tags.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(tags.id)">delete</button>
      </div>
      <AddTagView v-if="ownership" :carFleet="carFleet" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
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

    return { error, carFleet, ownership, handleDelete, handleClick };
  },
};
</script>

<style>
.carFleet-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}

.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}

.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}

.carFleet-info {
  text-align: center;
}

.carFleet-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}

.carFleet-info p {
  margin-bottom: 20px;
}

.username {
  color: #999;
}

.description {
  text-align: left;
}

.single-tags {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
