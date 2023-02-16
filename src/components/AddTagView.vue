<template>
  <div class="add-tags">
    <button v-if="!showForm" @click="showForm = true">Add Tags</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a Tag</h4>
      <input type="text" placeholder="Tag title" required v-model="title" />
      <button>Add</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import useDocument from "@/hooks/useDocument";
import { COLLECTIONS } from "@/router/constants";

export default {
  props: ["carFleet"],
  setup(props) {
    const title = ref("");
    const showForm = ref(false);

    const { updateDoc } = useDocument(COLLECTIONS.CARS_FEET, props.carFleet.id);
    const handleSubmit = async () => {
      const newTag = {
        title: title.value,
        id: Math.floor(Math.random() * 1000000),
      };

      await updateDoc({
        tags: [...props.carFleet.tags, newTag],
      });
      title.value = "";
    };
    return { title, showForm, handleSubmit };
  },
};
</script>

<style scoped>
.add-tags {
  text-align: center;
  margin-top: 40px;
}

form {
  max-width: 100%;
  text-align: left;
}
</style>
