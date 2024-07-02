import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { EntityManager, FindOptionsWhere, ILike, Repository } from "typeorm";
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import Client from "./models/client.entity";
import GetClientDto from "./views/get-client.dto";
import ListClientDto from "./views/list-client.dto";
import CreateClientDto from "./dtos/create-client.dto";
import UpdateClientDto from "./dtos/update-client.dto";
import PaginationDTO from "src/core/dtos/pagination.dto";

@Injectable()
class ClientService {
    constructor(@InjectRepository(Client) private readonly clientRepository: Repository<Client>) { };

    async create(createClientDto: CreateClientDto): Promise<Client> {
        try {
            const createTransaction = async (manager: EntityManager) => {
                const email = await manager.findOneBy(Client, { email: createClientDto.email });

                if (email) {
                    throw new BadRequestException('The E-mail Address already exists.');
                } else {
                    const client = this.clientRepository.create({
                        name: createClientDto.name,
                        email: createClientDto.email
                    });

                    return this.clientRepository.save(client);
                };
            };

            return await this.clientRepository.manager.transaction(createTransaction);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Unable to Create this Client.');
            };
        };
    };

    async read(id: number): Promise<GetClientDto> {
        const client = await this.clientRepository.findOne({ where: { id } });

        if (!client) {
            throw new NotFoundException('This Client was not found.');
        } else {
            return plainToInstance(GetClientDto, await this.clientRepository.findOne({ where: { id: client.id } }));
        };
    };

    async list(page: number, limit: number, search?: string): Promise<PaginationDTO<ListClientDto>> {
        const start = (page - 1) * limit;
        const where: FindOptionsWhere<Client> = {};

        if (search)
            where.name = ILike(`%${search}%`);

        const clients = await this.clientRepository.findAndCount({
            skip: start,
            take: limit,
            order: { id: "ASC" },
            where
        });

        return new PaginationDTO<ListClientDto>({
            items: plainToInstance(ListClientDto, clients[0]),
            page: page,
            limit: limit,
            total: clients[1]
        });
    };

    async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
        try {
            const updateTransaction = async (manager: EntityManager) => {
                const client = await manager.findOneBy(Client, { id });

                if (!client) {
                    throw new NotFoundException('This Client was not found.');
                } else {
                    client.name = updateClientDto.name;
                    client.email = updateClientDto.email;

                    return this.clientRepository.save(client);
                };
            };

            return await this.clientRepository.manager.transaction(updateTransaction);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Unable to Update this Client.');
            };
        };
    };

    async delete(id: number): Promise<Client> {
        try {
            const deleteTransaction = async (manager: EntityManager) => {
                const client = await manager.findOneBy(Client, { id });

                if (!client) {
                    throw new NotFoundException('This Client was not found.');
                } else if (client.tags.length > 0) {
                    throw new ConflictException('This Client has related Tags.');
                } else {
                    return await this.clientRepository.remove(client);
                };
            };

            return await this.clientRepository.manager.transaction(deleteTransaction);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else if (error instanceof ConflictException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Unable to Delete this Client.');
            };
        };
    };
};

export default ClientService;