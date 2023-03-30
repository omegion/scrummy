<template>
  <section class="mt-16">
    <div class="max-w-7xl mx-auto sm:px-2 lg:px-8">
      <div class="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
        <div
          class="bg-white border border-gray-200 shadow-sm sm:rounded-lg sm:border dark:bg-slate-900 dark:border-slate-600"
        >
          <div class="px-4 py-5 sm:p-6">
            <div class="mt-0">
              <div class="flex items-center justify-between">
                <h3 class="text text-gray-900 font-medium dark:text-slate-50">
                  Choose your card
                </h3>
                <VotingDeckHelp>
                  <a
                    href="#"
                    class="text-sm font-medium text-pink-600 hover:text-pink-500"
                    >Voting guide</a
                  >
                </VotingDeckHelp>
              </div>
              <RadioGroup v-model="holderVote" class="mt-6">
                <div
                  class="grid grid-cols-10 gap-4 sm:grid-cols-8 lg:grid-cols-10"
                >
                  <RadioGroupOption
                    @click="radioClicked"
                    as="template"
                    v-for="item in deckItems"
                    :key="item.value"
                    :value="item"
                    v-slot="{ active, checked }"
                  >
                    <div
                      :class="[checked ? 'ring-2 ring-pink-500' : '']"
                      class="transition hover:transition-none group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-pink-300/50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer dark:bg-slate-800 dark:border-slate-500 dark:text-slate-50 dark:ring-pink-600 dark:hover:bg-pink-700/50"
                    >
                      <RadioGroupLabel as="p" class="text-xl font-bold">
                        {{ item.name }}
                      </RadioGroupLabel>
                      <div
                        :class="[
                          checked ? 'border-pink-500' : 'border-transparent',
                          'border absolute -inset-px rounded-md pointer-events-none',
                        ]"
                        aria-hidden="true"
                      />
                    </div>
                  </RadioGroupOption>
                  <CustomDeckCard @selected="newVote">
                    <RadioGroupOption
                      @click="radioClicked"
                      as="template"
                      :value="customVote"
                      v-slot="{ active, checked }"
                    >
                      <div
                        :class="[checked ? 'ring-2 ring-pink-500' : '']"
                        class="transition hover:transition-none group relative border rounded-md py-3 px-5 flex items-center justify-center text-sm font-medium uppercase hover:bg-pink-300/50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer dark:bg-slate-800 dark:border-slate-500 dark:text-slate-50 dark:ring-pink-600 dark:hover:bg-pink-700/50"
                      >
                        <RadioGroupLabel as="p" class="text-2xl font-bold">
                          <span v-if="customVote"> {{ customVote.name }} </span>
                          <span v-else>?</span>
                        </RadioGroupLabel>
                        <div
                          :class="[
                            checked ? 'border-pink-500' : 'border-transparent',
                            'border absolute -inset-px rounded-md pointer-events-none',
                          ]"
                          aria-hidden="true"
                        />
                      </div>
                    </RadioGroupOption>
                  </CustomDeckCard>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import CustomDeckCard from "@/components/CustomDeckCard.vue";
import VotingDeckHelp from "@/components/VotingDeckHelpModal.vue";

export default {
  components: {
    VotingDeckHelp,
    CustomDeckCard,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  },
  data() {
    return {
      vote: null,
      holderVote: null,
      customVote: {
        name: "😀",
        value: 0,
      },
    };
  },
  sockets: {
    reset_room() {
      this.vote = {};
      this.holderVote = {};
    },
  },
  computed: {
    deckItems() {
      return this.$store.state.deckItems.fibonacci;
    },
  },
  watch: {
    vote: function (vote) {
      this.emitVote(vote);
    },
  },
  methods: {
    emitVote(vote) {
      this.$socket.client.emit("vote", {
        vote: vote,
      });
    },
    radioClicked() {
      if (this.vote?.name === this.holderVote?.name) {
        this.vote = {};
        this.holderVote = {};

        return;
      }
      this.vote = this.holderVote;
    },
    newVote(vote) {
      this.customVote = vote;
      this.holderVote = vote;
      this.radioClicked();
    },
  },
};
</script>

<style scoped></style>
