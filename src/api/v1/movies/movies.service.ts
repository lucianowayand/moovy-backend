import { BadRequestException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpClientService } from 'src/http-client/http-client.service';

@Injectable()
export class MoviesService {
    private httpClientService: HttpClientService
    constructor() {
        this.httpClientService = new HttpClientService();
    }

    async findManyBy(search: string) {
        const res = await this.httpClientService.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${search}&type=movie`);
        if(res.Response !== 'True') {
            throw new HttpException(res.Error, HttpStatus.NOT_FOUND);
        } 
        
        return res.Search;
    }

    async findOneBy(id: string) {
        const res = await this.httpClientService.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`);
        if(res.Response !== 'True') {
            throw new HttpException(res.Error, HttpStatus.NOT_FOUND);
        }

        return res;
    }
}
