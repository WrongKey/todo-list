import { MigrationInterface, QueryRunner } from 'typeorm'

export class seedUsers1678639379637 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "user"
            (id, name, avatar)
            VALUES
            (1, 'Kai Hu', 'https://avatars.githubusercontent.com/u/7872119?s=400&u=0216ccced388fbbe5c33eb4f83de4551da0b3b7a&v=4'),
            (2, 'somebody', 'https://avatars.githubusercontent.com/u/7872119?s=400&u=0216ccced388fbbe5c33eb4f83de4551da0b3b7a&v=4'),
            (3, 'someone', 'https://avatars.githubusercontent.com/u/7872119?s=400&u=0216ccced388fbbe5c33eb4f83de4551da0b3b7a&v=4');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM user WHERE id in (1, 2, 3)')
  }
}
