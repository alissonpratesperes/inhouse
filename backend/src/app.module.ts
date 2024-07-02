import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TagModule } from "./domain/tag/tag.module";
import { ClientModule } from "./domain/client/client.module";
import { dataSourceOptions } from "./core/databases/connection";

@Module({
  providers: [],
  controllers: [],
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ClientModule, TagModule]
})
export class AppModule { };