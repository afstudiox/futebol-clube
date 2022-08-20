import { sign } from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'secret';

export default class JwtService {
  static sign(payload: { email: string }): string {
    return sign(payload, secret);
  }
}
