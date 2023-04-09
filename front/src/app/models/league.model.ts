import {Team} from "./team.model";

export class League {
  _id: string
  name: string;
  sport: string;
  teams: Team[]
}
