import { MigrationInterface, QueryRunner } from 'typeorm'

export class createCommentTable1678634135942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE task_change_history (
            id serial4 NOT NULL,
            description text NOT NULL,
            author_id int4 NULL,
            task_id int4 NULL,
            created_at timestamp NOT NULL DEFAULT now(),
            updated_at timestamp NOT NULL DEFAULT now(),
            PRIMARY KEY (id),
            FOREIGN KEY (author_id) REFERENCES public."user"(id),
            FOREIGN KEY (task_id) REFERENCES public.task(id)
        );
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_change_history')
  }
}
