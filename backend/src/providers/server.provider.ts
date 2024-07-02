import { NestFactory } from "@nestjs/core";
import { INestApplication } from "@nestjs/common";

import { AppModule } from "../app.module";
import Application from "./application.provider";
import Documentation from "./documentation.provider";

class Server {
    private _app: INestApplication;

    public async init() {
        this._app = await NestFactory.create(AppModule);

        Application.init(this._app);
        Documentation.init(this._app);
    };
};

export default new Server;