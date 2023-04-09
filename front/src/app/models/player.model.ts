export class Player {
  _id?: string
  name: string;
  position: string;
  thumbnail: string;
  born: Date;
  signin : {
    amount: number;
    currency: string;
  }
  team?: string
}
