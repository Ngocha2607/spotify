import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserPhone1727024750762 implements MigrationInterface {
    name = 'UpdateUserPhone1727024750762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
