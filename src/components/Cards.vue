<template>
  <section aria-labelledby="recent-heading" class="mt-16">
    <div class="max-w-7xl mx-auto sm:px-2 lg:px-8">
      <div class="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
        <transition-group
          v-if="$store.state.room"
          name="list"
          tag="ul"
          role="list"
          class="grid grid-cols-7 gap-6 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-8 lg:py-24 cards content-center"
          enter-active-class="duration-300 ease-in-out"
          enter-from-class="scale-50 opacity-0"
          leave-active-class="transition duration-200 ease-in"
          leave-to-class="scale-0 opacity-0"
        >
          <Card
            v-for="(user, index) in $store.state.room.users"
            :user="user"
            :key="index"
          />
        </transition-group>
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
