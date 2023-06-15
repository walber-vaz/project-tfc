import { NextFunction, Request, Response } from 'express';
import Token from '../utils/token';

export default class Validate {
  static login(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!regex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static async token(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = Token.verify(authorization);

    if (token === 'Token must be a valid token') {
      return res.status(401).json({ message: token });
    }

    req.body.token = token;
    next();
  }
}
