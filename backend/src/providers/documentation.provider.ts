import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

class Documentation {
    public init(app: INestApplication) {
        const config = new DocumentBuilder().setTitle('In House').setDescription('API Endpoints Documentation').setVersion('v1 Beta').build();
        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup('v1/documentation', app, document);

        console.log('📜 Documentation :: Running @ http://localhost:3000/v1/documentation');
    };
};

export default new Documentation;