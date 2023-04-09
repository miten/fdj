import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './schema/player.schema';
import {Team} from "../teams/schema/team.schema";
import {CreatePlayerDto} from "./dto/player.dto";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class PlayersService {
    constructor(@InjectModel(Player.name) private playerModel: Model<Player>, private readonly httpService: HttpService) {}

    async getAll(): Promise<Player[]> {
        return this.playerModel.find().exec();
    }

    async queryPlayers(name: string): Promise<Player[]> {
        return this.playerModel.find({name: { $regex: new RegExp('^' + name, 'i') }}).exec();
    }

    async getPlayer(id: string): Promise<Player> {
        return this.playerModel.findById(id).exec();
    }

    async addPlayer(playerDto: CreatePlayerDto): Promise<Player> {
        try {
            return this.playerModel.create(playerDto);
        } catch (e) {
            throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
        }
    }

    async getThumbnails(playerName: string): Promise<string[]> {
        try {
            const data = await this.httpService.get(`https://serpapi.com/search.json?engine=yandex_images&text=${playerName.replace(' ', '')}&key=eaacce4d7c81060266d59402f3b22531c79c9d2064f77ed6a457d9a2cf89de80`).toPromise().then(res => res.data)
            return data.images_results.map(e => e.thumbnail);
        } catch(e) {
            return e
        }

    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
