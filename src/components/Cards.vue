<template>
  <section aria-labelledby="recent-heading" class="mt-16">
    <div class="max-w-7xl mx-auto sm:px-2 lg:px-8">
      <div class="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
        <ul
          v-if="$store.state.room"
          role="list"
          class="grid grid-cols-7 gap-6 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-8 lg:py-24 cards content-center"
        >
          <Card
            v-for="(user, index) in $store.state.room.users"
            :user="user"
            :key="index"
          />
        </ul>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "Cards",
  components: {
    Card,
  },
});
</script>
