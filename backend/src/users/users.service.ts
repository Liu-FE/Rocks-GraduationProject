import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    //user对象实例化--本地用户账号&密码
    this.users = [
      {
        userId: 1,
        username: 'rocks',
        password: 'password123',
      },
    ];
  }
  //查找用户
  async findOne(username: string): Promise<User | undefined> {
    // eslint-disable-next-line prettier/prettier
    return this.users.find(user => user.username === username);
  }
}
