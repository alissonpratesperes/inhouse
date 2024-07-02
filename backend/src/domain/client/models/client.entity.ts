import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import Tag from "src/domain/tag/models/tag.entity";

@Entity({ name: 'clients' })
class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @OneToMany(() => Tag, (tag) => tag.client, { eager: true, cascade: true })
    tags: Tag[];
};

export default Client;