import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { Controller, Body, Param, Query, HttpCode, HttpStatus, Get, Post, Put, Delete } from "@nestjs/common";

import Client from "./models/client.entity";
import ClientService from "./client.service";
import GetClientDto from "./views/get-client.dto";
import ListClientDto from "./views/list-client.dto";
import ResponseDTO from "src/core/dtos/response.dto";
import CreateClientDto from "./dtos/create-client.dto";
import UpdateClientDto from "./dtos/update-client.dto";
import PaginationDTO from "src/core/dtos/pagination.dto";

@ApiTags('Clients')
@Controller('clients')
class ClientController {
    constructor(private readonly clientService: ClientService) { };

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() createClientDto: CreateClientDto): Promise<ResponseDTO<Client>> {
        await this.clientService.create(createClientDto);

        return ResponseDTO.success();
    };

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async read(@Param('id') id: number): Promise<ResponseDTO<GetClientDto>> {
        const getted = await this.clientService.read(id);

        return new ResponseDTO<GetClientDto>({ success: !!getted, data: getted });
    };

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiQuery({ name: 'search', required: false })
    async list(@Query('page') page: string = "1", @Query('limit') limit: string = '10', @Query('search') search: string = ''): Promise<ResponseDTO<PaginationDTO<ListClientDto>>> {
        const listed = await this.clientService.list(parseInt(page), parseInt(limit), search);

        return new ResponseDTO<PaginationDTO<ListClientDto>>({ success: !!listed, data: listed });
    };

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto): Promise<ResponseDTO<Client>> {
        await this.clientService.update(id, updateClientDto);

        return ResponseDTO.success();
    };

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: number): Promise<ResponseDTO<Client>> {
        await this.clientService.delete(id);

        return ResponseDTO.success();
    };
};

export default ClientController;