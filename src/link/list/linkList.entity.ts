import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

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

    @Column({ default: null })
    tagid: number;

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
