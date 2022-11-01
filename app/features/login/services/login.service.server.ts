import type { Login } from '../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '~/db/utils/db.server';

export class LoginService {
  async login({ email, password }: Login.User) {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) throw 'password/email incorrect';
    const compare = bcrypt.compareSync(password, user.password);

    if (!compare) throw 'password/email incorrect';

    const payload = { id: user.id, email: user.email, name: user.name };

    return jwt.sign(payload, process.env.JWT_SECRET!);
  }
}
