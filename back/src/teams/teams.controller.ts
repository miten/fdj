import { Controller, Get, Logger, NotFoundException, Param, Query} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './schema/team.schema';
import { QueryTeamsDto } from './dto/query.dto';

@Controller('teams')
export class TeamsController {
    constructor(private teamsService: TeamsService) {
    }

    @Get()
    async getAll(): Promise<Team[]> {
        await this.teamsService.delay(3000);
        return await this.teamsService.getAll();
    }

    @Get('query')
    async query(@Query() query: QueryTeamsDto): Promise<Team[]> {
        return await this.teamsService.queryTeams(query.name);
    }


    @Get(':id')
    async getTeam(@Param('id') id: string): Promise<Team> {
        try {
            return await this.teamsService.getTeam(id);
        } catch (e) {
            Logger.log(e)
            throw new NotFoundException()
        }

    }
}
