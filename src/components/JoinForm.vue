<template>
  <section class="mt-16">
    <div class="max-w-7xl mx-auto sm:px-2 lg:px-8">
      <div class="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
        <div class="space-y-6">
          <form @submit.prevent="join">
            <div
              class="shadow-sm border border-gray-200 sm:rounded-md sm:overflow-hidden dark:border-slate-700"
            >
              <div
                class="bg-white py-6 px-4 space-y-6 sm:p-6 dark:bg-slate-800 dark:border-b dark:border-slate-600"
              >
                <div>
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900 dark:text-slate-50"
                  >
                    Information
                  </h3>
                  <p class="mt-1 text-sm text-gray-500 dark:text-slate-400">
                    Use a nickname and room name to join the game. If not, you
                    will get a random nickname and room.
                  </p>
                </div>

                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="user"
                      class="block text-sm font-medium text-gray-700 dark:text-slate-100"
                      >Nickname</label
                    >
                    <input
                      v-model="user"
                      type="text"
                      name="user"
                      id="user"
                      ref="user"
                      :placeholder="userPlaceholder"
                      class="input-style"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="room"
                      class="block text-sm font-medium text-gray-700 dark:text-slate-100"
                      >Room name</label
                    >
                    <input
                      v-model="room"
                      type="text"
                      name="room"
                      id="room"
                      :placeholder="roomPlaceholder"
                      class="input-style"
                    />
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 sm:px-6 dark:bg-slate-800">
                <button
                  @click="join"
                  type="submit"
                  class="button-style"
                >
                  Join
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "JoinForm",
  data() {
    return {
      room: this.$route.query.room,
      user: this.$route.query.user,
      roomPlaceholder: "",
      userPlaceholder: "",
    };
  },
  mounted() {
    this.roomPlaceholder = this.randomName();
    this.userPlaceholder = this.randomUsername();
    this.$refs.user.focus();
  },
  methods: {
    join() {
      let room = this.room;
      let user = this.user;

      if (this.room === undefined || this.room === "") {
        room = this.roomPlaceholder;
      }

      if (this.user === undefined || this.user === "") {
        user = this.userPlaceholder;
      }

      this.$router.push(`/${room}?name=${user}`);
    },
    randomName() {
      return this.$store.state.harryPotterNames.houses[
        this.randomIntFromInterval(
          0,
          this.$store.state.harryPotterNames.houses.length - 1
        )
      ];
    },
    randomUsername() {
      return this.$store.state.harryPotterNames.characters[
        this.randomIntFromInterval(
          0,
          this.$store.state.harryPotterNames.characters.length - 1
        )
      ];
    },
    randomIntFromInterval(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
});
</script>
