<template>
  <div class="max-w-7xl mx-auto sm:px-2 lg:px-8">
    <div class="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
      <RoomHeader />
    </div>
  </div>
  <Cards />
  <VotingDeck />
</template>

<script lang="ts">
import Cards from "@/components/Cards.vue";
import { defineComponent } from "vue";
import VotingDeck from "@/components/VotingDeck.vue";
import RoomHeader from "@/components/RoomHeader.vue";
import router from "@/router";

export default defineComponent({
  components: {
    RoomHeader,
    VotingDeck,
    Cards,
  },
  beforeRouteEnter(to, from, next) {
    if (to.query.name === undefined || to.query.name === "") {
      router.push(`/?room=${to.params.room}&nickname=false`);
    }
    next();
  },
  mounted() {
    this.join();
  },
  beforeUnmount() {
    this.leave();
  },
  methods: {
    join() {
      this.$socket.client.emit("join", {
        roomName: this.$route.params.room,
        userName: this.$route.query.name,
      });
    },
    leave() {
      this.$socket.client.emit("leave");
    },
  },
});
</script>
