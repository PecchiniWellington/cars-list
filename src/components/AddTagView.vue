<template>
  <div class="add-tags">
    <button class="btn btn-primary" @click="showForm = true" v-if="!showForm">
      Add Tags
    </button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <div class="mb-3 p-4">
        <h4>Add a Tag</h4>
        <input class="form-control" id="tag-title" aria-describedby="CarsFleet title" type="text" required
          placeholder="Tag title" v-model="title" />
        <div class="mb-3 pt-4">
          <button class="btn btn-primary">ADD</button>
        </div>
      </div>
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
.btn {
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .add-tags {
    margin-top: 20px;
    width: 100%;
  }

}
</style>
