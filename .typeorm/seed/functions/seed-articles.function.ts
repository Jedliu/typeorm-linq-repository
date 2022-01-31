import { LinqRepository } from "../../../src/repository/LinqRepository";
import { Article } from './../../../test/entities/article.entity';

export async function seedArticles(): Promise<void> {
    console.log("Seeding articles.");

    const articleRepository = new LinqRepository(Article);

    const articles: Article[] = [
        {
            id: 1,
            name: "Jason Wang",
            content: "John and Jason are best friends.",
            documentWithWeights: "'best':7B 'friend':8B 'jason':1A,5B 'john':3B 'wang':2A"
        },
        {
            id: 2,
            name: "John Doe",
            content: "John has written a famous book.",
            documentWithWeights: "'book':8B 'doe':2A 'famous':7B 'john':1A,3B 'written':5B"
        },
        {
            id: 3,
            name: "Lucky Zhang",
            content: "John has invited her to the party.",
            documentWithWeights: "'invit':5B 'john':3B 'lucki':1A 'parti':9B 'zhang':2A"
        },
        {
            id: 4,
            name: "Jenny Liu",
            content: "Jenny is keen on the detective books.",
            documentWithWeights: "'book':9B 'detect':8B 'jenni':1A,3B 'keen':5B 'liu':2A"
        },
    ];

    await articleRepository.typeormRepository.insert(articles);

    console.log("Done seeding articles.");
}
