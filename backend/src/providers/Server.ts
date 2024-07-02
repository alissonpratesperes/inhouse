import { NestFactory } from "@nestjs/core";
import { INestApplication } from "@nestjs/common";

import Application from "./Application";
import { AppModule } from "../app.module";
import Documentation from "./Documentation";

class Server {
    private _app: INestApplication;

    public async init() {
        this._app = await NestFactory.create(AppModule);

        Application.init(this._app);
        Documentation.init(this._app);
    };
};

export default new Server;