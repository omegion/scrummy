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
          class="absolute z-10 -ml-4 -mt-72 -ml-48 transform w-screen max-w-md"
        >
          <div
            class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden border border-gray-50 dark:border-slate-600"
          >
            <div
              class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 lg:grid-cols-5 dark:bg-slate-800"
            >
              <div
                v-for="(item, index) in items"
                :key="index"
                class="p-3 flex items-center cursor-pointer rounded-lg hover:bg-pink-200 dark:hover:bg-pink-700/50"
                @click="select(item, close)"
              >
                <div
                  class="flex-shrink-0 flex items-center justify-center h-10 w-10 -ml-1 rounded-md text-4xl"
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
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

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
    ChevronDownIcon,
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
