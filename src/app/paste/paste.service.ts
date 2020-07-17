import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class PasteService {
  constructor(
    private readonly redisService: RedisService,
  ) { }
  async set(key: string, value: string): Promise<boolean> {
    const client = await this.redisService.getClient('pserver')
    client.set(key, value);
    return true
  }

  async get(key: string): Promise<String> {
    const client = await this.redisService.getClient('pserver')
    return await client.get(key);
  }
}