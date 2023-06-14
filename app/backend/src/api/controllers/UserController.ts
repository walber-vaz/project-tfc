import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { message, status, token } = await this.userService.findByEmail(email, password);

    if (status) return res.status(status).json({ message });

    return res.status(200).json({ token });
  };
}

export default UserController;
