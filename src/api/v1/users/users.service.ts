import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){
        this.userRepository = userRepository;
    }

    async findOne(id: number){
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

    async create(user: UserEntity){
        const hash = await bcrypt.hash(user.password, 8);
        user.password = hash;
        const newUser = await this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async update(id: number, user: UserEntity){
        try{
            await this.userRepository.update(id, user);
        } catch (error) {
            throw new HttpException(`Couldn't update user: ${error}`, HttpStatus.BAD_REQUEST);
        }

        return this.findOne(id);
    }

    async delete(id: number){
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            throw new HttpException(`Couldn't delete user: ${error}`, HttpStatus.BAD_REQUEST);
        }

        return {message: 'User deleted successfully'};
    }
}
