import { 
    Entity, PrimaryGeneratedColumn, Column, Timestamp,
    ManyToOne, 
} from 'typeorm';
import { SubscribeTag } from '../tag/subscribeTag.entity';

@Entity()
export class SubscribeList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, default: null })
    title: string;

    @Column({ length: 255, default: null })
    url: string;
    
    @Column({ length: 100, default: null })
    icon: string;

    // 会创建一个tagId的外键关联subscribe_tag表的id
    @ManyToOne(type => SubscribeTag, tag => tag.list)
    tag: SubscribeTag;

    @Column({ default: 0 })
    click: number;

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
}
