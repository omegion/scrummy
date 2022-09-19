<template>
  <PopoverGroup as="nav" class="flex space-x-10">
    <Popover class="relative" v-slot="{ open }">
      <PopoverButton>
        <slot></slot>
      </PopoverButton>

      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <PopoverPanel
          v-slot="{ close }"
          class="absolute z-10 -mt-80 transform w-screen max-w-md lg:-ml-80 sm:-ml-0 sm:max-w-sm sm:shrink-0"
        >
          <div
            class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden border border-gray-50 dark:border-slate-600"
          >
            <div
              class="relative grid gap-6 bg-white px-5 pr-10 py-6 sm:gap-8 grid-cols-5 dark:bg-slate-800"
            >
              <div
                v-for="(item, index) in items"
                :key="index"
                class="p-3 lg:pr-11 sm:pr-4 flex items-center cursor-pointer rounded-lg hover:bg-pink-200 dark:hover:bg-pink-700/50"
                @click="select(item, close)"
              >
                <div
                  class="flex-shrink-0 flex items-center justify-center rounded-md lg:h-10 lg:w-10 sm:h-5 sm:w-5 lg:-ml-1 sm:ml-0 lg:text-4xl sm:text-3xl"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </PopoverGroup>
</template>

<script lang="ts">
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";

const items = [
  {
    name: "😀",
    value: 0,
  },
  {
    name: "🙁",
    value: 0,
  },
  {
    name: "😁",
    value: 0,
  },
  {
    name: "🥹",
    value: 0,
  },
  {
    name: "🤓",
    value: 0,
  },
  {
    name: "🤔",
    value: 0,
  },
  {
    name: "😵",
    value: 0,
  },
  {
    name: "🥴",
    value: 0,
  },
  {
    name: "🤢",
    value: 0,
  },
  {
    name: "🤯",
    value: 0,
  },
];

export default {
  name: "CustomDeckCard",
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
  },
  data() {
    return {
      items: items,
    };
  },
  methods: {
    select(item, fn) {
      this.$emit("selected", item);
      fn();
    },
  },
};
</script>
