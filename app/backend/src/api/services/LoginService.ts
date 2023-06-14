import { compareSync } from 'bcryptjs';
import UserModel from '../models/UserModel';
import { IToken } from '../interface/IToken';
import { ServiceResponse, ServiceMessage } from '../interface/ServiceResponse';
import { ILogin, IUser } from '../interface/User/IUser';
import { IUserModel } from '../interface/User/IUserModel';
import Token from '../utils/token';

const unauthorizedRes: ServiceResponse<ServiceMessage> = {
  status: 'UNAUTHORIZED',
  data: { message: 'Invalid email or password' },
};

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwt = Token,
  ) { }

  async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!compareSync(data.password, user.password)) {
        return unauthorizedRes;
      }
      const { email } = user as IUser;
      const token = this.jwt.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return unauthorizedRes;
  }

  async getUserRole(email: string): Promise<ServiceResponse<ServiceMessage | string>> {
    const user = await this.userModel.findByEmail(email);
    if (user) {
      const { role } = user as IUser;
      return { status: 'SUCCESSFUL', data: role };
    }
    return unauthorizedRes;
  }
}
