import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { League, LeagueSchema } from './schema/leagues.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: League.name, schema: LeagueSchema }])],
    controllers: [LeaguesController],
    providers: [LeaguesService],
})


export class LeaguesModule {}
