import { MigrationInterface, QueryRunner } from 'typeorm';

export class PgFtsSearch1643358395886 implements MigrationInterface {
  name = 'PgFtsSearch1643358395886';
  tableName = 'article';
  indexName = 'article_document_weights_idx';
  indexColumn = 'documentWithWeights';

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `create table ${this.tableName}
          (
              "id"                    serial,
              "name"                  varchar(100) not null,
              "content"               varchar(100) not null,
              "${this.indexColumn}"   tsvector
          );
        `,
      );
      await queryRunner.query(
        `CREATE INDEX "${this.indexName}" ON "${this.tableName}" USING GIN("${this.indexColumn}")`,
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "${this.tableName}"`);
  }
}
