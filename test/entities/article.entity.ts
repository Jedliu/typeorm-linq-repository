import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryColumn()
    public id: number;

    @Column({ length: 100, nullable: false })
    public name: string;

    @Column({ length: 100, nullable: false })
    public content: string;

    @Column('tsvector', { select: false, nullable: true })
    documentWithWeights?: any;
}
