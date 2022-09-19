<template>
  <div @click="open = true">
    <slot></slot>
  </div>

  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      :class="{ dark: !$store.state.isLight }"
      @close="open = false"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-slate-900 dark:bg-opacity-75"
          />
        </TransitionChild>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-slate-800 dark:border dark:border-1 dark:border-slate-700"
          >
            <div
              class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-slate-800 dark:border-b dark:border-slate-700"
            >
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-lg leading-6 font-semibold text-gray-900 dark:text-slate-50"
                  >
                    Voting guide
                  </DialogTitle>
                  <div class="mt-2">
                    <h3 class="font-semibold text-sm mt-4 dark:text-slate-50">
                      How voting works?
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-slate-400">
                      When you cast a vote, if the room's cards are not
                      revealed, others will not see your vote.
                    </p>
                    <div
                      class="grid grid-cols-4 gap-6 py-14 cards content-center"
                    >
                      <div
                        class="card group relative mx-3 border border-gray-300 rounded-lg bg-gray-200 sm:py-10 sm:px-8 py-8 px-4 flex items-center justify-center text-sm font-medium focus:outline-none sm:flex-1 shadow-sm text-gray-900 active ring-pink-500 dark:bg-slate-800 dark:border-slate-500 dark:text-slate-50"
                      >
                        <div
                          class="absolute -inset-px pointer-events-none"
                          aria-hidden="true"
                        />
                        <p class="absolute -mb-32">Unrevealed</p>
                      </div>
                      <div
                        class="card group relative mx-3 border border-gray-300 rounded-lg bg-gray-200 sm:py-10 sm:px-8 py-8 px-4 flex items-center justify-center text-sm font-medium focus:outline-none sm:flex-1 shadow-sm text-gray-900 ring-pink-500 dark:bg-slate-800 dark:border-slate-500 dark:text-slate-50"
                      >
                        <div class="text-xl font-bold absolute">8</div>
                        <div
                          class="absolute -inset-px pointer-events-none"
                          aria-hidden="true"
                        />
                        <p class="absolute -mb-32">Revealed</p>
                      </div>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-slate-400">
                      After someone in the room <code>Reveals</code> the cards,
                      then the votes will be visible to others.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-slate-800"
            >
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-offset-0 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                @click="open = false"
                ref="cancelButtonRef"
              >
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import Card from "@/components/Card.vue";

export default {
  name: "VotingDeckHelpModal",
  components: {
    Card,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },

  data() {
    return {
      open: false,
    };
  },
};
</script>

<style scoped></style>
