<template>
  <div :class="{ dark: !$store.state.isLight }">
    <div
      class="bg-gray-50 dark:bg-slate-900 flex flex-col h-screen justify-between"
    >
      <Header />
      <main class="py-16">
        <router-view v-slot="{ Component, route }">
          <transition
            enter-active-class="duration-200 ease-out delay-300"
            enter-from-class="transform opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
            <div :key="route.name">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
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
  },
  watch: {
    $route: {
      handler: (to, from) => {
        document.title = to.meta.title;
      },
      immediate: true,
    },
  },
  mounted() {
    this.$store.commit("setLightMode");
  },
});
</script>
