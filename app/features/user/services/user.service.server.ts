import type { User } from '../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '~/db/utils/db.server';

export class UserService {
  async login({ email, password }: User.Login) {
    const user = await this.getUserByEmail({ email });

    if (!user) throw 'U - password/email incorrect';
    const compare = bcrypt.compareSync(password, user.password);

    if (!compare) throw 'C - password/email incorrect';

    const payload = { id: user.id, email: user.email, name: user.name };

    return {
      user: payload,
      token: jwt.sign(payload, process.env.JWT_SECRET!),
    };
  }
  async create({ name, email, password }: User.Create) {
    const existsUser = await db.user.findUnique({ where: { email } });

    if (existsUser) throw 'User exists';

    const hashPassord = await bcrypt.hash(password, 10);

    return db.user.create({
      data: { email, name, password: hashPassord },
    });
  }

  async getUserById({ id }: User.GetUserById) {
    const user = await db.user.findUnique({ where: { id } });

    if (!user) throw 'User Not Found';

    return user;
  }
  private async getUserByEmail({ email }: User.GetUserByEmail) {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) throw 'User Not Found';

    return user;
  }
}
