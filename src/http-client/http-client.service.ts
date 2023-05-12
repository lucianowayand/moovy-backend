import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpClientService {

    async get(url: string) {
        const { data } = await axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        const success = data.Response === 'True'
        
        if(!success) {
            console.log(`\n\x1b[31m>>> GET ${url}: FAIL - ${data.Error}\x1b[0m\n`);
        }else{
            console.info(`\n\x1b[32m>>> GET ${url}: SUCCESS\x1b[0m\n`)
        }

        return data;
    }
}
