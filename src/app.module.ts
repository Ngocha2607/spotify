import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.module';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';


@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: DevConfigService,
      useClass: DevConfigService,
    }
  ],
})
export class AppModule implements NestModule {
configure(consumer: MiddlewareConsumer) {
  consumer.apply(LoggerMiddleware).forRoutes(SongsController);
}
}
