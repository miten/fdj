import { Test, TestingModule } from '@nestjs/testing';
import { LeaguesService } from './leagues.service';

describe('leaguesService', () => {
  let service: LeaguesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaguesService],
    }).compile();

    service = module.get<LeaguesService>(LeaguesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
