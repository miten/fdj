import {Injectable, Logger} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { League } from './schema/leagues.schema';
import { Model } from 'mongoose';

@Injectable()
export class LeaguesService {
    constructor(@InjectModel(League.name) private LeagueModel: Model<League>) {}

    async getAll(): Promise<League[]> {
        return this.LeagueModel.find().populate('players').exec();
    }

    async queryleagues(name: string): Promise<League[]> {
        return this.LeagueModel.find({name: { $regex: new RegExp('^' + name, 'i') }}).populate('teams').exec();
    }

    async getLeague(id: string): Promise<League> {
        return this.LeagueModel.findById(id).populate('players').exec();
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
