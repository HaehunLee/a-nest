import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Controller => Service로 분리를 하는 이유
 * 1. DB => transaction의 단계
 * 2. 비즈니스 로직 분리
 * 3. 테스크 코드에 용이
 *  요청, 응답 등에 대한 mocking이 필요 없음
 * 4. 요청과 응답에 대해서 관여하지 않음. ( = 알수 없음)
 */
@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getUser(): string {
    return this.configService.get('SECRET');
    // = process.env.SECRET
    // configService로 관리하면, nest에서 관리할 수 있게되어
    // 테스트 코드나 별도의 로직을 짤때 용이함.
  }

  postUser(): string {
    return 'post hi';
  }
}
