import { MigrationInterface, QueryRunner } from 'typeorm'

export class createTaskTable1678634119623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE task (
        id serial4 NOT NULL,
        title varchar NOT NULL,
        description varchar NULL,
        creator_id int4 NULL,
        expire_at timestamp NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        PRIMARY KEY (id),
        FOREIGN KEY (creator_id) REFERENCES public."user"(id)
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task')
  }
}
