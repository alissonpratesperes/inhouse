import { MigrationInterface, QueryRunner } from "typeorm";

export class Decimal1719949994464 implements MigrationInterface {
    name = 'Decimal1719949994464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tags\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD \`price\` decimal(6,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tags\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`tags\` ADD \`price\` int NOT NULL`);
    }

}
