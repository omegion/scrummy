<template>
  <footer
    aria-labelledby="footer-heading"
    class="bg-white border-t border-gray-200 dark:bg-slate-800 dark:border-slate-600"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-20">
        <div class="lg:grid lg:grid-cols-3 lg:gap-8">
          <div class="mb-6 md:mb-0">
            <router-link to="/" tag="a" class="flex items-center group">
              <img
                :src="logo"
                class="mr-3 h-8 transition duration-300 group-hover:-rotate-45"
                alt="Omegion Logo"
              />
            </router-link>
            <div class="mt-6 text-sm text-gray-500 dark:text-slate-400">
              Scrummy is a story point estimation game for scrum teams,
              developed by
              <a href="https://omegion.dev" class="hover:underline">Omegion</a>
              to allow easier participation by remote team members.
            </div>
          </div>
        </div>
        <hr
          class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
        />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-slate-400"
            >© {{ new Date().getFullYear() }}
            <a href="https://omegion.dev" class="hover:underline">Omegion</a>.
            All Rights Reserved. v{{ version }}
          </span>
          <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a
              href="https://github.com/omegion/scrummy"
              target="_blank"
              class="text-gray-500 hover:text-gray-900 dark:hover:text-slate-50 transition"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
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
} from "@headlessui/vue";
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
  },
  data() {
    return {
      LogoDark,
      LogoLight,
      version: APP_VERSION,
    };
  },
  computed: {
    logo() {
      if (this.$store.state.isLight) {
        return LogoDark;
      }
      return LogoLight;
    },
  },
});
</script>
