import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import Client from "./models/client.entity";
import ClientService from "./client.service";
import ClientController from "./client.controller";

@Module({
  providers: [ClientService],
  controllers: [ClientController],
  imports: [TypeOrmModule.forFeature([Client])]
})
export class ClientModule { };