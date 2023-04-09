import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Team } from '../../teams/schema/team.schema';

export type LeagueDocument = HydratedDocument<League>;

@Schema()
export class League {
  @Prop()
  name: string;

  @Prop()
  sport: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Team' })
  teams: Team[];
}

export const LeagueSchema = SchemaFactory.createForClass(League);
