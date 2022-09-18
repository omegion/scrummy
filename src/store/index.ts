import { createStore } from "vuex";
import Cookies from "js-cookie";

import type { Room } from "@/models/rooms";
import dockItems from "./dockItems";
import harryPotterNames from "./harry-potter-names";
import router from "@/router";

const store = createStore({
  state: {
    connect: false,
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
    getLightModeVal() {
      return !!Cookies.get("light_mode");
    },
  },
  mutations: {
    SOCKET_DISCONNECT(state) {
      console.log("Socket disconnected");
      state.connect = false;
    },
    SOCKET_CONNECT: (state, status) => {
      console.log("Socket connected");
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
  },
  actions: {
    socket_joined({ commit }) {
      console.log("hello form vuex");
    },
    socket_usernameTaken({ commit }, username) {
      console.log("username taken:", username);
      router.push("/?error=username_taken");
    },
    toggleLightMode() {
      const current = Cookies.get("light_mode");
      if (current) {
        Cookies.remove("light_mode");
      } else {
        Cookies.set("light_mode", "true");
      }
    },
  },
});

export default store;
