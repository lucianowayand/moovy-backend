import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryEntity } from './entities/library.entity';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { MoviesEntity } from '../movies/entities/movies.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([LibraryEntity, MoviesEntity])],
    providers: [LibraryService, JwtService],
    controllers: [LibraryController]
  })
  export class LibraryModule { }
  