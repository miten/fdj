import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './schema/player.schema';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { TeamsModule } from '../teams/teams.module';
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
        TeamsModule,
        HttpModule
    ],
    controllers: [PlayersController],
    providers: [PlayersService],
})
export class PlayersModule {}
