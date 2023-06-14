import { compareSync } from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import UserModel from '../../database/models/UserModel';
import tokenGenerator from '../auth/token';

class UserService {
  protected model: ModelStatic<UserModel> = UserModel;

  async findByEmail(email: string, password: string) {
    const user = await this.model.findOne({ where: { email } });

    if (!user) {
      return { status: 401, message: 'Invalid email or password' };
    }

    const isValidPassword = compareSync(password, user.password);

    if (isValidPassword) {
      return {
        token: tokenGenerator({
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username,
        }),
      };
    }

    return { status: 401, message: 'Invalid email or password' };
  }
}

export default UserService;
