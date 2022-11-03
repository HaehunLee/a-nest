import { Injectable } from '@nestjs/common';

// $ nest g s users

@Injectable()
export class UsersService {
  postUsers(email: string, nickname: string, password: string) {}
}
