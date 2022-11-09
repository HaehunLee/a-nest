import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

// $ nest g s users

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async join(email: string, nickname: string, password: string) {
    if (!email) {
      throw new Error('이메일이 없네요');
    }
    if (!nickname) {
      throw new Error('닉네임이 없네요');
    }
    if (!password) {
      throw new Error('비밀번호가 없네요');
    }
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      // 이미 존재하는 유저 에러
      throw new Error('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.userRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
