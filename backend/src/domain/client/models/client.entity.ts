import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "clients" })
class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
};

export default Client;