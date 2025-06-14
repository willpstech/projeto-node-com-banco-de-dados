import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'produto'})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 200, nullable: false })
    descricao: string;

    @Column({type: 'varchar', length: 200, nullable: false })
    marca: string;

    @Column({type: 'int', nullable: false })
    valor: number;

}