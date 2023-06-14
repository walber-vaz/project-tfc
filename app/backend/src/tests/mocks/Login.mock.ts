export const isLoginWithoutEmail = {
  password: '123456'
};

export const isLoginWithoutPassword = {
  email: 'email@email.com'
};

export const isInvalidEmailLoginBody = {
  email: 'mail',
  password: '123456'
};

export const isInvalidPasswordLoginBody = {
  email: 'email@email.com',
  password: '12345'
};

export const isValidLoginBody = {
  email: 'email@email.com',
  password: '123456'
};

export const isInvalidLoginBody = {
  email: 'email@mail.com',
  password: '123458'
};

export const userRegistered = {
  id: 1,
  username: 'xablau',
  email: 'email@email.com',
  password: '$2a$10$GzSHv8k4jJQD./DiUAJ0GeV4wWhWOm./fL0LfCPTuM2QYkg02x8oG',
  role: 'user'
};

export const wrongPasswordUser = {
  id: 1,
  username: 'xablau',
  email: 'email@email.com',
  password: 'qweqweqw',
  role: 'user'
};