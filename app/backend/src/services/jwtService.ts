import { JwtPayload, sign, verify, decode } from 'jsonwebtoken';

import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'secret';

export default class JwtService {
  static sign(payload: { email: string }): string {
    return sign(payload, secret);
  }

  static verify(token: string): string | JwtPayload {
    return verify(token, secret);
  }

  static decode(token: string): string | JwtPayload | null {
    return decode(token);
  }
}
