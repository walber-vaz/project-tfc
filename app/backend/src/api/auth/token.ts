import { sign } from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/User/IUserLogin';

const JWT_SECRET = process.env.JWT_SECRET as string;

const tokenGenerator = (user: IUserLogin) =>
  sign(user, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });

export default tokenGenerator;
