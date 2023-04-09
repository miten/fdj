import { Test, TestingModule } from '@nestjs/testing';
import { leaguesController } from './leagues.controller';

describe('leaguesController', () => {
  let controller: leaguesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [leaguesController],
    }).compile();

    controller = module.get<leaguesController>(leaguesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
