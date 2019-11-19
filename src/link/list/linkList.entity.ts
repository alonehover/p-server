import { 
    Entity, PrimaryGeneratedColumn, Column, Timestamp,
    ManyToOne, 
} from 'typeorm';
import { LinkTag } from '../tag/linkTag.entity';

@Entity()
export class LinkList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, default: null })
    title: string;

    @Column({ length: 255, default: null })
    url: string;
    
    @Column({ length: 100, default: null })
    icon: string;

    // 会创建一个tagId的外键关联link_tag表的id
    @ManyToOne(type => LinkTag, tag => tag.links)
    tag: LinkTag;

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
