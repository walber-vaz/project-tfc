import { IUser } from '../interface/User/IUser';
import User from '../../database/models/SequelizeUser';

export default class UserModel {
  private model = User;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.password,
      role: user.role,
    };
  }
}
