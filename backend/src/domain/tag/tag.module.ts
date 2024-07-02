import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import Tag from "./models/tag.entity";
import TagService from "./tag.service";
import TagController from "./tag.controller";

@Module({
  providers: [TagService],
  controllers: [TagController],
  imports: [TypeOrmModule.forFeature([Tag])]
})
export class TagModule { };