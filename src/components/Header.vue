<template>
  <header
    class="relative bg-white dark:bg-slate-800 shadow-sm border-b dark:border-b-slate-600"
  >
    <nav aria-label="Top" class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="px-4 pb-14 sm:px-0 sm:pb-0">
        <div class="h-16 flex items-center justify-between">
          <!-- Logo -->
          <div class="flex-1 flex">
            <router-link to="/" tag="a" class="flex items-center">
              <img
                src="https://omegion.dev/logo-200.png"
                class="mr-3 h-8"
                alt="Omegion Logo"
              />
              <span
                class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                >Scrummy</span
              >
            </router-link>
          </div>
          <div class="flex-1 flex items-center justify-end">
            <!-- Dark mode -->
            <div class="ml-4 flow-root lg:ml-8">
              <Switch
                v-model="isDark"
                :class="[
                  isDark ? 'bg-gray-600' : 'bg-gray-200',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-pink-500',
                ]"
              >
                <span
                  :class="[
                    isDark ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  ]"
                >
                  <span
                    :class="[
                      isDark
                        ? 'opacity-0 ease-out duration-100'
                        : 'opacity-100 ease-in duration-200',
                      'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <SunIcon class="h-3 w-3 text-gray-400" />
                  </span>
                  <span
                    :class="[
                      isDark
                        ? 'opacity-100 ease-in duration-200'
                        : 'opacity-0 ease-out duration-100',
                      'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <MoonIcon class="h-3 w-3 text-gray-600" />
                  </span>
                </span>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Switch,
} from "@headlessui/vue";

import { ServerIcon, ShoppingBagIcon } from "@heroicons/vue/24/outline";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ServerIcon,
    ShoppingBagIcon,
    Switch,
    SunIcon,
    MoonIcon,
  },
  data() {
    let isDark = localStorage.getItem("darkMode") == "true";
    return {
      holder: false,
      isDark: isDark,
    };
  },
  computed: {},
  watch: {
    isDark(val) {
      this.$emit("darkMoodToggled", val);
      localStorage.setItem("darkMode", val);
    },
  },
});
</script>
