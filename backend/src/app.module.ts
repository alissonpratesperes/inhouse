import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { ClientModule } from "./domain/client/client.module";
import { dataSourceOptions } from "./core/databases/connection";

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ClientModule]
})
export class AppModule { };