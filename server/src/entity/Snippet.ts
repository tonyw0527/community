import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import User from './User';

@Entity()
export default class Snippet {

    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column()
    title!: string;

    @Column({ unique: true })
    slug!: string;

    @Column()
    sanitizedHtml!: string;

    @Column('timestampz')
    @CreateDateColumn()
    created_at!: Date;

    @Column('timestamptz')
    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne(type => User, user => user.snippets)
    user!: User;
}