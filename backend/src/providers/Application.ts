import { INestApplication } from "@nestjs/common";

class Application {
    public async init(app: INestApplication) {
        await app.listen('3000', () => {
            console.log('🔥 Server :: Running @ http://localhost:3000/v1');
        });
    };
};

export default new Application;