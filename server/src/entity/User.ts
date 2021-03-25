import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import Snippet from './Snippet';

@Entity()
export default class User {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ unique: true })
    nickname!: string;

    @Column({ type: 'varchar', nullable: true })
    token!: string | null;

    @Column('timestampz')
    @CreateDateColumn()
    created_at!: Date;

    @Column('timestamptz')
    @UpdateDateColumn()
    updated_at!: Date;

    @OneToMany(type => Snippet, snippet => snippet.user)
    snippets!: Snippet[];

}
