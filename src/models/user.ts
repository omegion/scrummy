export type Vote = {
  name: string;
  value: any;
};

export class User {
  public id: string;
  public name: string;
  public vote: Vote = {} as Vote;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
