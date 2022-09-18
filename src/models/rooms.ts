import { User, Vote } from "./user";

export type Room = {
  id: string;
  name: string;
  revealed: boolean;
  users: User[];
};

export class Rooms {
  public rooms: Room[];

  constructor() {
    this.rooms = [] as Room[];
  }

  public joinToRoom(name: string, user: User) {
    const roomIndex = this.getRoomIndex(name);

    if (roomIndex == -1) {
      this.rooms.push({
        id: "",
        name: name,
        revealed: false,
        users: [user] as User[],
      });
    } else {
      this.rooms[roomIndex].users.push(user);
    }
  }

  public leaveFromRoom(name: string, userId: string) {
    const roomIndex = this.getRoomIndex(name);

    if (roomIndex > -1) {
      const userIndex = this.rooms[roomIndex].users.findIndex(
        (e) => e.id === userId
      );
      if (userIndex > -1) {
        this.rooms[roomIndex].users.splice(userIndex, 1);
      }
    }
  }

  public deleteRoomIfEmpty(name: string): boolean {
    const roomIndex = this.getRoomIndex(name);

    if (roomIndex > -1) {
      if (this.rooms[roomIndex].users.length == 0) {
        this.rooms.splice(roomIndex, 1);

        return true;
      }
    }

    return false;
  }

  public setUserVote(name: string, userId: string, vote: Vote) {
    const roomIndex = this.getRoomIndex(name);

    if (roomIndex > -1) {
      const userIndex = this.rooms[roomIndex].users.findIndex(
        (e) => e.id === userId
      );

      this.rooms[roomIndex].users[userIndex].vote = vote;
    }
  }

  public toogleRevealRoomCards(name: string) {
    const roomIndex = this.getRoomIndex(name);

    if (roomIndex > -1) {
      this.rooms[roomIndex].revealed = !this.rooms[roomIndex].revealed;
    }
  }

  public resetRoom(name: string) {
    const roomIndex = this.getRoomIndex(name);

    if (roomIndex > -1) {
      this.rooms[roomIndex].revealed = false;
      this.rooms[roomIndex].users.forEach((value, index) => {
        this.rooms[roomIndex].users[index].vote = {} as Vote;
      });
    }
  }

  public getRoomByName(name: string): Room {
    return this.rooms[this.getRoomIndex(name)];
  }

  private getRoomIndex(name: string): number {
    return this.rooms.findIndex((e) => e.name === name);
  }
}
