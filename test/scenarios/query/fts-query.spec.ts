import { Connection } from "typeorm";
import { LinqRepository } from "../../../src/repository/LinqRepository";
import { getTypeormConnection } from "../../connection/get-typeorm-connection.function";
import { Article } from "../../entities/article.entity";

describe("Query", () => {
    let connection: Connection;
    let articleRepository: LinqRepository<Article>;

    beforeAll(async () => {
        connection = await getTypeormConnection();
        articleRepository = new LinqRepository(Article);
    });

    it("works with Postgres full text search", async () => {
        let articles = await articleRepository
            .getAll()
            .where(s => s.documentWithWeights)
            .pgFtsSearch(`websearch_to_tsquery('english','jenny')`);
        expect(articles.length).toBe(1);
        
        articles = await articleRepository
            .getAll()
            .where(s => s.documentWithWeights)
            .pgFtsSearch(`websearch_to_tsquery('english','john')`);
        expect(articles.length).toBe(3);
        expect(articles.map(a=>a.id).join()).toEqual('1,2,3');

        articles = await articleRepository
            .getAll()
            .where(s => s.documentWithWeights)
            .pgFtsSearch(`websearch_to_tsquery('english','john')`)
            .orderByDescendingTsRank(s=>s.documentWithWeights);
        expect(articles.length).toBe(3);
        expect(articles.map(a=>a.id).join()).toEqual('2,1,3');
    });

    afterAll(async () => {
        await connection.close();
    });
});
