import { Body, Controller, Get, Logger, NotFoundException, Param, Post, Query} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './schema/player.schema';
import { CreatePlayerDto } from './dto/player.dto';
import {QueryPlayersDto} from './dto/query.dto';
import { TeamsService } from '../teams/teams.service';
import {ObjectId} from "mongodb";
import mongoose from 'mongoose';
import { InjectConnection } from "@nestjs/mongoose";

@Controller('players')
export class PlayersController {
    constructor(@InjectConnection() private readonly connection: mongoose.Connection, private playerService: PlayersService, private teamsService: TeamsService) {
    }

    @Get()
    async getAll(): Promise<Player[]> {
        await this.playerService.delay(3000);
        return await this.playerService.getAll();
    }

    @Post()
    async addPlayer(@Body('data') data: CreatePlayerDto): Promise<Player> {
        await this.playerService.delay(3000);
        try {
            const newPlayer = {...data, _id: new ObjectId()}
            const player: Player = await this.playerService.addPlayer(newPlayer);
            if(player && player._id) await this.teamsService.addPlayer(newPlayer.team, player._id);
            return player;
        } catch (e) {
            Logger.log(e);
            throw e;
        }
    }


    @Get('query')
    async query(@Query() query: QueryPlayersDto): Promise<Player[]> {
        return await this.playerService.queryPlayers(query.name);
    }

    @Get('thumbnails')
    async getThumbnails(@Query() query: QueryPlayersDto): Promise<string[]> {
        return await this.playerService.getThumbnails(query.name);
    }

    @Get(':id')
    async getPlayer(@Param('id') id: string): Promise<Player> {
        try {
            return await this.playerService.getPlayer(id);
        } catch (e) {
            Logger.log(e)
            throw new NotFoundException('efzfzefzef')
        }


    }
}
