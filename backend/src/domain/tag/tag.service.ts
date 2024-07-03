import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { EntityManager, FindOptionsWhere, ILike, Repository } from "typeorm";
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import Tag from "./models/tag.entity";
import GetTagDto from "./views/get-tag.dto";
import ListTagDto from "./views/list-tag.dto";
import LeaseTagDto from "./dtos/lease-tag.dto";
import CreateTagDto from "./dtos/create-tag.dto";
import UpdateTagDto from "./dtos/update-tag.dto";
import Client from "../client/models/client.entity";
import PaginationDTO from "src/core/dtos/pagination.dto";

@Injectable()
class TagService {
    constructor(
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
        @InjectRepository(Client) private readonly clientRepository: Repository<Client>
    ) { };

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        try {
            const createTransaction = async (manager: EntityManager) => {
                const tag = await manager.findOneBy(Tag, { mac: createTagDto.mac });

                if (tag) {
                    throw new BadRequestException('The Mac Address already exists.');
                } else {
                    const tag = this.tagRepository.create({
                        mac: createTagDto.mac,
                        name: createTagDto.name,
                        price: createTagDto.price,
                        leased: createTagDto.leased
                    });

                    return this.tagRepository.save(tag);
                };
            };

            return await this.tagRepository.manager.transaction(createTransaction);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Unable to Create this Tag.');
            };
        };
    };

    async read(id: number): Promise<GetTagDto> {
        const tag = await this.tagRepository.findOne({ where: { id } });

        if (!tag) {
            throw new NotFoundException('This Tag was not found.');
        } else {
            return plainToInstance(GetTagDto, await this.tagRepository.findOne({ where: { id: tag.id }, relations: ['client'] }));
        };
    };

    async list(page: number, limit: number, search?: string): Promise<PaginationDTO<ListTagDto>> {
        const start = (page - 1) * limit;
        const where: FindOptionsWhere<Tag> = {};

        if (search)
            where.name = ILike(`%${search}%`);

        const tags = await this.tagRepository.findAndCount({
            skip: start,
            take: limit,
            order: { id: "ASC" },
            where
        });

        return new PaginationDTO<ListTagDto>({
            items: plainToInstance(ListTagDto, tags[0]),
            page: page,
            limit: limit,
            total: tags[1]
        });
    };

    async update(id: number, updateTagDto: UpdateTagDto): Promise<Tag> {
        try {
            const updateTransaction = async (manager: EntityManager) => {
                const tag = await manager.findOneBy(Tag, { id });

                if (!tag) {
                    throw new NotFoundException('This Tag was not found.');
                } else {
                    tag.mac = updateTagDto.mac;
                    tag.name = updateTagDto.name;
                    tag.price = updateTagDto.price;
                    tag.leased = updateTagDto.leased;

                    return this.tagRepository.save(tag);
                };
            };

            return await this.tagRepository.manager.transaction(updateTransaction);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Unable to Update this Tag.');
            };
        };
    };

    async delete(id: number): Promise<Tag> {
        try {
            const deleteTransaction = async (manager: EntityManager) => {
                const tag = await manager.findOneBy(Tag, { id });

                if (!tag) {
                    throw new NotFoundException('This Tag was not found.');
                } else if (tag.client != null) {
                    throw new ConflictException('This Tag has related Client.');
                } else {
                    return await this.tagRepository.remove(tag);
                };
            };

            return await this.tagRepository.manager.transaction(deleteTransaction);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else if (error instanceof ConflictException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Unable to Delete this Tag.');
            };
        };
    };

    async lease(leaseTagDto: LeaseTagDto): Promise<Tag> {
        try {
            const leaseTransaction = async (manager: EntityManager) => {
                const tag = await manager.findOneBy(Tag, { id: leaseTagDto.id });

                if (!tag) {
                    throw new NotFoundException('This Tag was not found.');
                } else {
                    const client = await this.clientRepository.findOne({ where: { id: leaseTagDto.clientId } });

                    if (!client) {
                        throw new NotFoundException('This Client was not found.');
                    } else if (tag.leased != null) {
                        throw new ConflictException('This Tag is already leased.');
                    } else {
                        tag.client = client;
                        tag.leased = leaseTagDto.leased;
                    };

                    return this.tagRepository.save(tag);
                };
            };

            return await this.tagRepository.manager.transaction(leaseTransaction);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else if (error instanceof ConflictException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Unable to Lease.');
            };
        };
    };

    async shut(id: number): Promise<{ cost: number; time: number }> {
        try {
            const shutTransaction = async (manager: EntityManager) => {
                const tag = await manager.findOneBy(Tag, { id });

                if (!tag) {
                    throw new NotFoundException('This Tag was not found.');
                } else {
                    const millisecondsLeased = new Date().getTime() - tag.leased.getTime();
                    const time = Math.floor(millisecondsLeased / (1000 * 60));
                    const cost = time * (tag.price as number);

                    tag.leased = null;
                    tag.client = null;

                    await this.tagRepository.save(tag);

                    return { cost, time };
                };
            };

            return await this.tagRepository.manager.transaction(shutTransaction);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            } else {
                throw new InternalServerErrorException('Unable to Shut.');
            };
        };
    };
};

export default TagService;