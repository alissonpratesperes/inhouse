import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { dataSourceOptions } from "./core/databases/connection";

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { };