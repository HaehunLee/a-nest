import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';

// 서버에서 env값을 비동기로 가져와 적용할 수 있음.
// const getEnv = async () => {
// const res = await axios.get('/비밀키요청')
// return res.data
// return {
//   SECRET: '네스트공부',
//   PORT: 3030,
// };
// };
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [getEnv]
    }), // forRoot 등은 설정을 넣어줄 때
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  // origin object // for custom provider
  // providers: [
  //   {
  //     provide: 'CUSTOM_KEY', // 고유한 key
  //     useValue: 'CUSTOM_VALUE',
  //     useClass: AppService,
  //     useFactory: () => {},
  //   },
  //   AppService,
  //   ConfigService,
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
