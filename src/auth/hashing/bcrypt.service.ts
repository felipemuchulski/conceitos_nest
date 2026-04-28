import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService extends HashingService {
  private readonly saltRounds = 10;
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
