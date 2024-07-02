import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import Tag from "./models/tag.entity";
import TagService from "./tag.service";
import TagController from "./tag.controller";
import LeaseController from "./lease.controller";
import Client from "../client/models/client.entity";

@Module({
  providers: [TagService],
  controllers: [TagController, LeaseController],
  imports: [TypeOrmModule.forFeature([Tag, Client])]
})
export class TagModule { };