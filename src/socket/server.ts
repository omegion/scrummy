import express from "express";
import cors from "cors";
import * as http from "http";
import * as socketio from "socket.io";

import { Rooms } from "../models/rooms";
import { User } from "../models/user";
import path from "path";

const staticFileMiddleware = express.static(
  path.join(__dirname, "..", "..", "frontend")
);

export class ChatServer {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private server: http.Server;
  private io: socketio.Server;
  private port: string | number;
  private rooms: Rooms;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();

    this.rooms = new Rooms();
  }

  private createApp(): void {
    var history = require("connect-history-api-fallback");

    this.app = express();
    this.app.use(cors());
    this.app.use(staticFileMiddleware);
    this.app.use(
      history({
        index: "/index.html",
      })
    );
    this.app.use(staticFileMiddleware);
  }

  private createServer(): void {
    this.server = http.createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT;
  }

  private sockets(): void {
    this.io = new socketio.Server(this.server, {
      allowEIO3: true,
      cors: {
        origin: "*",
      },
    });
  }

  private listen(): void {
    this.app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
    });

    this.server.listen(this.port, () => {
      console.log("Running server on port %s", this.port);
    });

    this.io.on("connect", (socket) => {
      console.log("[server] connected client on port %s.", this.port);
      console.log("[server] current room number:", this.rooms.rooms.length);

      let parent = this;
      socket.on("join", function ({ roomName, userName }) {
        socket.join(roomName);

        socket.data.roomName = roomName;
        socket.data.userId = socket.id;
        socket.data.userName = userName;

        const user = new User(userName, socket.id);

        parent.rooms.joinToRoom(roomName, user);

        console.log("[server] %s joined to the room %s", userName, roomName);

        parent.updateStats(roomName);
      });

      socket.on("vote", function ({ vote }) {
        parent.rooms.setUserVote(
          socket.data.roomName,
          socket.data.userId,
          vote
        );

        console.log(
          "[server] %s has voted %s in room %s",
          socket.data.userName,
          vote,
          socket.data.roomName
        );

        parent.updateStats(socket.data.roomName);
      });

      socket.on("toggle_reveal_cards", function () {
        parent.rooms.toogleRevealRoomCards(socket.data.roomName);

        console.log("[server] room %s revealed", socket.data.roomName);

        parent.updateStats(socket.data.roomName);
      });

      socket.on("reset", function () {
        parent.rooms.resetRoom(socket.data.roomName);

        console.log(
          "[server] %s has reset the room %s",
          socket.data.userName,
          socket.data.roomName
        );

        parent.io.to(socket.data.roomName).emit("reset_room", {});
        parent.updateStats(socket.data.roomName);
      });

      socket.on("leave", function () {
        parent.rooms.leaveFromRoom(socket.data.roomName, socket.data.userId);

        console.log(
          "[server] %s left the room %s",
          socket.data.userName,
          socket.data.roomName
        );

        if (parent.rooms.deleteRoomIfEmpty(socket.data.roomName)) {
          console.log("[server] room %s deleted", socket.data.roomName);
        }

        parent.updateStats(socket.data.roomName);
      });

      socket.on("disconnect", () => {
        parent.rooms.leaveFromRoom(socket.data.roomName, socket.data.userId);

        console.log(
          "[server] %s left from the room %s",
          socket.data.userName,
          socket.data.roomName
        );

        if (parent.rooms.deleteRoomIfEmpty(socket.data.roomName)) {
          console.log("[server] room %s deleted", socket.data.roomName);
        }

        console.log("[server] current room number:", this.rooms.rooms.length);

        parent.updateStats(socket.data.roomName);
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }

  private updateStats(roomName: string) {
    this.io
      .to(roomName)
      .emit("update_room", { room: this.rooms.getRoomByName(roomName) });
  }
}
