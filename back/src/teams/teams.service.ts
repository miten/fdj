import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schema/team.schema';
import { Model } from 'mongoose';

@Injectable()
export class TeamsService {
    constructor(@InjectModel(Team.name) private teamModel: Model<Team>) {}

    async getAll(): Promise<Team[]> {
        return this.teamModel.find().populate('players').exec();
    }

    async queryTeams(name: string): Promise<Team[]> {
        return this.teamModel.find({name: { $regex: new RegExp('^' + name, 'i') }}).populate('players').exec();
    }

    async getTeam(id: string): Promise<Team> {
        return this.teamModel.findById(id).populate('players').exec();
    }

    async addPlayer(teamId: string, player: any) {
        try {
            const t = await this.teamModel.findById(teamId).exec();
            t.players.push(player);
            await t.save()
        } catch (e) {
            throw new NotFoundException(e);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
