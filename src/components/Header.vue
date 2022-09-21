<template>
  <header
    class="relative bg-white dark:bg-slate-800 shadow-sm border-b dark:border-b-slate-600"
  >
    <nav aria-label="Top" class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="px-4 pb-14 sm:px-0 sm:pb-0">
        <div class="h-16 flex items-center justify-between">
          <!-- Logo -->
          <div class="flex-1 flex group">
            <router-link to="/" tag="a" class="flex items-center">
              <img
                :src="logo"
                class="mr-3 h-8 transition duration-300 group-hover:-rotate-45"
                alt="Logo"
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
                v-model="darkMode"
                :class="[
                  darkMode ? 'bg-gray-200' : 'bg-gray-600',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-pink-500',
                ]"
              >
                <span
                  :class="[
                    darkMode ? 'translate-x-0' : 'translate-x-5',
                    'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                  ]"
                >
                  <span
                    :class="[
                      darkMode
                        ? 'opacity-0 ease-out duration-100'
                        : 'opacity-100 ease-in duration-200',
                      'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <MoonIcon class="h-3 w-3 text-gray-600" />
                  </span>
                  <span
                    :class="[
                      darkMode
                        ? 'opacity-100 ease-in duration-200'
                        : 'opacity-0 ease-out duration-100',
                      'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <SunIcon class="h-3 w-3 text-gray-400" />
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
import { defineComponent } from "vue";
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

import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid";
import LogoDark from "@/assets/img/logo-dark.svg";
import LogoLight from "@/assets/img/logo-light.svg";

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
    Switch,
    SunIcon,
    MoonIcon,
  },
  data() {
    return {
      LogoDark,
      LogoLight,
    };
  },
  computed: {
    darkMode: {
      get() {
        return this.$store.state.isLight;
      },
      set() {
        this.$store.commit("toggleLightMode");
      },
    },
    logo() {
      if (this.$store.state.isLight) {
        return LogoDark;
      }
      return LogoLight;
    },
  },
});
</script>
