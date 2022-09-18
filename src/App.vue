<template>
  <div :class="{ dark: isDark }">
    <div
      class="bg-gray-50 dark:bg-slate-900 flex flex-col h-screen justify-between"
    >
      <Header @darkMoodToggled="darkMoodToggled" />
      <main class="py-24">
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { defineComponent } from "vue";
import Footer from "@/components/Footer.vue";
import RoomView from "@/views/RoomView.vue";
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

import { AdjustmentsVerticalIcon } from "@heroicons/vue/24/outline";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  components: {
    Footer,
    Header,
    RouterLink,
    RouterView,
    RoomView,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    CheckCircleIcon,
    AdjustmentsVerticalIcon,
  },
  data() {
    return {
      isDark: localStorage.getItem("darkMode") == "true",
    };
  },
  methods: {
    darkMoodToggled(val: boolean) {
      this.isDark = val;
    },
  },
});
</script>
