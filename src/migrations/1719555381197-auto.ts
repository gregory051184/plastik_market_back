import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1719555381197 implements MigrationInterface {
    name = 'Auto1719555381197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "itemsNumber" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "itemsNumber"`);
    }

}
