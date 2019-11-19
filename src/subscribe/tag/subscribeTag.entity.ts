import { 
    Entity, PrimaryGeneratedColumn, Column, Timestamp,
    OneToMany, JoinColumn
} from 'typeorm';
import { SubscribeList } from '../list/subscribeList.entity';

@Entity()
export class SubscribeTag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, default: null })
    name: string;

    @Column({ default: 1 })
    sort: number;

    @Column({ default: 1 })
    status: number;

    @Column({ type: 'timestamp', default: () => 'current_timestamp' })
    createdTime: Timestamp;

    @Column({
        type: 'timestamp',
        onUpdate: 'current_timestamp',
        default: () => 'current_timestamp',
    })
    updatedTime: Timestamp;

    @OneToMany(type => SubscribeList, subscribe => subscribe.tag)
    list: SubscribeList;
}
