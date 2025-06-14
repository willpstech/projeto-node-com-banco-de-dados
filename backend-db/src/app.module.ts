import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './modelo/produto';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'usbw',
      database: 'produtos',
      entities: [Produto],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Produto]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
