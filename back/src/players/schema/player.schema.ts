import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
class Signin {
  @Prop()
  amount: number;

  @Prop()
  currency: string;
}

@Schema()
export class Player {
  @Prop()
  _id: mongoose.Types.ObjectId

  @Prop()
  name: string;

  @Prop()
  position: string;

  @Prop()
  thumbnail: string;

  @Prop()
  born: Date;

  @Prop()
  signin: Signin;

}

export const PlayerSchema = SchemaFactory.createForClass(Player);
