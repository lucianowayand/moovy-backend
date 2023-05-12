import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesController } from './api/v1/movies/movies.controller';
import { MoviesService } from './api/v1/movies/movies.service';
import { HttpClientModule } from './http-client/http-client.module';
import { HttpClientService } from './http-client/http-client.service';
import { MoviesModule } from './api/v1/movies/movies.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: true, // Usado apenas para demonstração do desafio
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],

  controllers: [AppController, MoviesController],
  providers: [AppService, MoviesService, HttpClientService],
})
export class AppModule { }
