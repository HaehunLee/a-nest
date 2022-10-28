import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// 요청과 응답에 대해서 관여함 ( = 알고 있음 )
@Controller('abc')
export class AppController {
  constructor(
    private readonly appService: AppService, // @Inject('CUSTOM_KEY') private readonly customValue,
  ) {} // 결합성을 낮출 수 있게됨.

  @Get('user') // GET /abc/user
  getUser(): string {
    return this.appService.getUser();
    // return new AppService().getUser(); // 매개변수 주입을 통해 결합성을 낮출 수 있게됨.
  }

  @Post('user') // POST /abc/user
  postUser(): string {
    return this.appService.postUser();
  }
}
