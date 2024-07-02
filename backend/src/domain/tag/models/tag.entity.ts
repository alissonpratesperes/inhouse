import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import Client from "src/domain/client/models/client.entity";

@Entity({ name: 'tags' })
class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mac: string;

    @Column('decimal', { precision: 6, scale: 2 })
    price: number;

    @Column({ nullable: true })
    leased?: Date;

    @ManyToOne(() => Client, (client) => client.tags)
    client: Client;
};

export default Tag;