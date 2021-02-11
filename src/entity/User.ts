import { Update } from "@material-ui/icons";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
//psql -U postgres for username postgres
import {v4 as uuid}  from 'uuid';

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    role: string;

    //3rd party package uuid
    //we'l use listeners for handling uuid
    @Column({type:'uuid'})
    uuid: string;

    //all beginning with @ are declarators
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
        createUuid(){
            this.uuid = uuid();
        }

}
