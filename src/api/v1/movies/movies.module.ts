import { Module } from '@nestjs/common';
import { HttpClientModule } from 'src/http-client/http-client.module';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';

@Module({
    imports: [HttpClientModule],
    providers: [MoviesService],
    controllers: [MoviesController],
})
export class MoviesModule { }
