import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// 요청과 응답에 대해서 관여함 ( = 알고 있음 )
@Controller('abc')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user') // GET /abc/user
  getUser(): string {
    return this.appService.getUser();
  }

  @Post('user') // POST /abc/user
  postUser(): string {
    return this.appService.postUser();
  }
}
