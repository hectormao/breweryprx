import { Controller, Get, Logger, Query } from '@nestjs/common';
import { Brewery } from 'src/types/brewery.types';
import { BreweryService } from './brewery.service';

@Controller('brewery')
export class BreweryController {
  private readonly log: Logger = new Logger(Brewery.name);

  constructor(private readonly breweryService: BreweryService) {}

  @Get()
  async getBreweries(
    @Query('page') page: number,
    @Query('page_size') pageSize: number,
  ): Promise<Brewery[]> {
    this.log.log(`Brewery Request page: ${page} pageSize: ${pageSize}`);
    return this.breweryService.getAll(page, pageSize);
  }
}
