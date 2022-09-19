import { createStore } from "vuex";

import type { Room } from "@/models/rooms";
import dockItems from "./dockItems";
import harryPotterNames from "./harry-potter-names";
import router from "@/router";

const store = createStore({
  state: {
    connect: false,
    isLight: false,
    deckItems: dockItems,
    harryPotterNames: harryPotterNames,
    message: null,
    rooms: [],
    room: {} as Room,
  },
  getters: {
    isRevealed(state) {
      return state.room?.revealed;
    },
    roomUsersCount(state) {
      return state.room?.users?.length;
    },
  },
  mutations: {
    SOCKET_DISCONNECT(state) {
      state.connect = false;
    },
    SOCKET_CONNECT: (state, status) => {
      state.connect = true;
    },
    SOCKET_UPDATE_ROOMS(state, payload) {
      console.log(payload);
      state.rooms = payload.rooms;
    },
    SOCKET_UPDATE_ROOM(state, payload) {
      state.room = payload.room;
    },
    SOCKET_ROOM_CREATED(state, payload) {
      console.log("created:", payload);
    },
    SOCKET_NEW_USER_JOINED(state, payload) {
      console.log("joined:", payload);
    },
    toggleLightMode(state) {
      // localStorage is not yet set.
      if (
        localStorage.getItem("lightMode") === null ||
        localStorage.getItem("lightMode") === "false"
      ) {
        localStorage.setItem("lightMode", "true");
      } else if (localStorage.getItem("lightMode") === "true") {
        localStorage.setItem("lightMode", "false");
      }
      this.commit("setLightMode");
    },
    setLightMode(state) {
      // localStorage is not yet set.
      if (
        localStorage.getItem("lightMode") === null ||
        localStorage.getItem("lightMode") === "false"
      ) {
        document.getElementById("html-root")?.classList.add("dark");
        state.isLight = false;
      } else if (localStorage.getItem("lightMode") === "true") {
        document.getElementById("html-root")?.classList.remove("dark");
        state.isLight = true;
      }
    },
  },
  actions: {
    socket_joined({ commit }) {
      console.log("hello form vuex");
    },
    socket_usernameTaken({ commit }, username) {
      console.log("username taken:", username);
      router.push("/?error=username_taken");
    },
  },
});

export default store;
