<template>
  <div class="md:flex md:items-center md:justify-between">
    <div class="flex-1 min-w-0">
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 dark:text-slate-50 sm:text-3xl sm:truncate"
      >
        {{ $store.getters.roomUsersCount }} players playing
      </h2>
      <p class="mt-2 text-sm text-gray-500 dark:text-slate-400">
        There are
        <strong>{{ $store.getters.roomUsersCount }} </strong> players in the
        room <strong>{{ $route.params.room }}</strong
        >.
      </p>
    </div>
    <div class="mt-4 flex md:mt-0 md:ml-4">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-pink-500 transition dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        @click="copyRoomLink"
      >
        <span v-if="roomLinkCopied" class="transition"> Copied </span>
        <span v-else>
          <LinkIcon
            class="h-4 w-4 dark:text-slate-50 http://localhost:5173/Slytherin"
          />
        </span>
      </button>
      <button
        type="button"
        class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-pink-500 transition dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        @click="reset"
      >
        Reset
      </button>
      <button
        type="button"
        class="ml-3 inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-white bg-white focus:outline-none focus:ring-4 ring-offset-0 ring-pink-500 border-transparent text-white bg-pink-600 hover:bg-pink-700 transition"
        @click="toggleRevealCards"
      >
        <span v-if="$store.getters.isRevealed"> Hide cards </span>
        <span v-else>Reveal cards</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { LinkIcon } from "@heroicons/vue/24/solid";

export default {
  name: "RoomHeader",
  components: {
    LinkIcon,
  },
  data() {
    return {
      roomLinkCopied: false as boolean,
    };
  },
  methods: {
    reset() {
      this.$socket.client.emit("reset", {
        roomName: this.$route.params.room,
      });
    },
    toggleRevealCards() {
      this.$socket.client.emit("toggle_reveal_cards", {
        roomName: this.$route.params.room,
      });
    },
    copyRoomLink() {
      const roomLink = `${window.location.origin}${this.$route.path}`;
      navigator.clipboard.writeText(roomLink);
      this.roomLinkCopied = true;

      setTimeout(() => {
        this.roomLinkCopied = false;
      }, "2000");
    },
  },
};
</script>

<style scoped></style>
