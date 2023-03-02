import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import https from 'https';
import { Brewery } from 'src/types/brewery.types';
import { AxiosResponse } from 'axios';

@Injectable()
export class BreweryService {
  private readonly log: Logger = new Logger(BreweryService.name);
  private readonly agent: https.Agent;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.agent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  async getAll(page: number, pageSize: number): Promise<Brewery[]> {
    const openBreweryUrl = this.configService.get<string>(
      'OPEN_BREWERY_DB_URL',
    );
    this.log.log(
      `get all breweries using - url: ${openBreweryUrl} page: ${page} pageSize: ${pageSize}`,
    );
    const fullUrl = `${openBreweryUrl}/breweries?page=${page || 0}&per_page=${
      pageSize || 10
    }`;
    const response: AxiosResponse<any[]> = await this.httpService.axiosRef.get<
      any[]
    >(fullUrl, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      httpsAgent: this.agent,
    });

    if (response.status != HttpStatus.OK) {
      throw new HttpException(response.data, response.status);
    }

    return response.data.map((brw) => ({
      id: brw.id,
      name: brw.name,
      city: brw.city,
    }));
  }
}
