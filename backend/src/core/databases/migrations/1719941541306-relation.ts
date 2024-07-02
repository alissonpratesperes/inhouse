import { MigrationInterface, QueryRunner } from "typeorm";

export class Relation1719941541306 implements MigrationInterface {
    name = 'Relation1719941541306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tags\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD \`leased\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD CONSTRAINT \`FK_dfbfb8aed70814cc6e41e798c8b\` FOREIGN KEY (\`clientId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tags\` DROP FOREIGN KEY \`FK_dfbfb8aed70814cc6e41e798c8b\``);
        await queryRunner.query(`ALTER TABLE \`tags\` DROP COLUMN \`clientId\``);
        await queryRunner.query(`ALTER TABLE \`tags\` DROP COLUMN \`leased\``);
        await queryRunner.query(`ALTER TABLE \`tags\` DROP COLUMN \`price\``);
    }

}
