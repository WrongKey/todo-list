import { MigrationInterface, QueryRunner } from 'typeorm'

export class createUserTable1678634111922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        id serial4 NOT NULL,
        "name" varchar NOT NULL,
        avatar varchar NOT NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        PRIMARY KEY (id)
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
  }
}
