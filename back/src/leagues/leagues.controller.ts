import { Controller, Get, Logger, NotFoundException, Param, Query} from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { League } from './schema/leagues.schema';
import { QueryLeaguesDto } from './dto/query.dto';

@Controller('leagues')
export class LeaguesController {
    constructor(private leaguesService: LeaguesService) {
    }

    @Get()
    async getAll(): Promise<League[]> {
        await this.leaguesService.delay(3000);
        return await this.leaguesService.getAll();
    }

    @Get('query')
    async query(@Query() query: QueryLeaguesDto): Promise<League[]> {
        return await this.leaguesService.queryleagues(query.name);
    }


    @Get(':id')
    async getTeam(@Param('id') id: string): Promise<League> {
        try {
            return await this.leaguesService.getLeague(id);
        } catch (e) {
            Logger.log(e)
            throw new NotFoundException()
        }
    }
}
