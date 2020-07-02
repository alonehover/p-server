import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity()
export class ConfigTag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, default: null })
    name: string;

    @Column({ length: 255, default: null })
    value: string;

    @Column({ length: 100, default: null })
    tagIds: string;

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
