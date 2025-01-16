/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
const bcrypt = require('bcryptjs');

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  public async comparePassword(
    password: string,
    hashedPassword: string | Buffer,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
