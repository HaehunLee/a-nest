import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/decorators/user.decorator';
import { ChannelChats } from './entities/ChannelChats';
import { ChannelMembers } from './entities/ChannelMembers';
import { Channels } from './entities/Channels';
import { DMs } from './entities/DMs';
import { Mentions } from './entities/Mentions';
import { Users } from './entities/Users';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';

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
    }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule, // forRoot 등은 설정을 넣어줄 때
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces,
      ],
      synchronize: false,
      logging: 'all', // 로깅
      keepConnectionAlive: true, // 서버 자동 재시작 시, DB 연결 유지
      charset: 'utf8mb4', // for emoji
    }),
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
