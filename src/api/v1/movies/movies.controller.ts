import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('api/v1/movies')
export class MoviesController {
    private moviesService: MoviesService
    constructor() {
        this.moviesService = new MoviesService();
    }
    
    @Get()
    findBy(@Query('search') search: string ){
        return this.moviesService.findBy(search);
    }


}
