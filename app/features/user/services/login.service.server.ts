import type { User } from '../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '~/db/utils/db.server';

export class UserService {
  async login({ email, password }: User.Login) {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) throw 'U - password/email incorrect';
    const compare = bcrypt.compareSync(password, user.password);

    if (!compare) throw 'C - password/email incorrect';

    const payload = { id: user.id, email: user.email, name: user.name };

    return {
      user: payload,
      token: jwt.sign(payload, process.env.JWT_SECRET!),
    };
  }
}
