import { ApiTags } from "@nestjs/swagger";
import { Controller, Body, Param, Query, HttpCode, HttpStatus, Get, Post, Put, Delete } from "@nestjs/common";

import { ClientService } from "./client.service";
import CreateClientDto from "./dtos/create-client.dto";
import UpdateClientDto from "./dtos/update-client.dto";

@ApiTags('Client')
@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { };
};