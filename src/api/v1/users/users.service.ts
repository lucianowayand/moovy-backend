import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){
        this.userRepository = userRepository;
    }

    async get(id: number){
        const user = await this.userRepository.findOne({
            where: {
                id: id
            }
        });
        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }
}
