import { 
    Entity, PrimaryGeneratedColumn, Column, Timestamp,
    OneToMany, JoinColumn
} from 'typeorm';
import { LinkList } from '../list/linkList.entity';

@Entity()
export class LinkTag {
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

    @OneToMany(type => LinkList, link => link.tag)
    links: LinkList;
}
