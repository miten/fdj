import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Player } from '../../players/schema/player.schema';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop()
  name: string;

  @Prop()
  thumbnail: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Player' })
  players: mongoose.Schema.Types.ObjectId[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
