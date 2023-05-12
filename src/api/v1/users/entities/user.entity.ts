import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column({name:'full_name'})
    fullName: string;
    
    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;
}