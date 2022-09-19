<template>
  <li>
    <div class="grid grid-cols-1 content-center">
      <div class="space-y-1.5">
        <div
          class="transition-transform"
          :class="[cardTransClass, cardRevealedClass]"
        >
          <div
            class="card group relative lg:mx-3 border border-gray-300 rounded-lg bg-gray-200 sm:py-10 sm:px-8 py-8 px-4 flex items-center justify-center text-sm font-medium focus:outline-none sm:flex-1 shadow-sm text-gray-900 dark:bg-slate-800 dark:border-slate-500 dark:text-slate-50"
            :class="[cardClass]"
          >
            <div
              v-if="$store.getters.isRevealed"
              class="text-xl font-bold absolute"
            >
              {{ user?.vote?.name }}
            </div>
            <div
              class="absolute -inset-px pointer-events-none"
              aria-hidden="true"
            />
            <div
              v-if="$store.getters.isRevealed && !user?.vote.name"
              aria-hidden="true"
              class="absolute -inset-px rounded-md border-2 border-gray-300 pointer-events-none dark:border-slate-500"
            >
              <svg
                class="absolute inset-0 w-full h-full text-gray-300 stroke-2 dark:text-slate-500"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                stroke="currentColor"
              >
                <line
                  x1="0"
                  y1="100"
                  x2="100"
                  y2="0"
                  vector-effect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="space-y-2 text-center">
          <div
            class="text-lg leading-6 font-medium space-y-1 break-after-auto dark:text-slate-50"
          >
            <h3>{{ user?.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    user: Object,
  },
  computed: {
    cardClass() {
      return Object.keys(this.user?.vote).length &&
        !this.$store.getters.isRevealed > 0
        ? "active ring-pink-500"
        : "";
    },
    cardRevealedClass() {
      return Object.keys(this.user?.vote).length &&
        this.$store.getters.isRevealed
        ? "revealed"
        : "";
    },
    cardTransClass() {
      return Object.keys(this.user?.vote).length > 0
        ? "ease-in-out scale-110 duration-200 delay-75"
        : "";
    },
  },
});
</script>
