import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'tags' })
class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mac: string;
};

export default Tag;