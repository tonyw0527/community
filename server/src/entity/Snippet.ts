import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import User from './User';
import marked from 'marked';
import createDomPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const dompurify = createDomPurify(new JSDOM().window);

@Entity()
export default class Snippet {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column('text')
    markdown!: string;

    @Column()
    writer!: string;

    @Column('text')
    sanitizedHtml!: string;

    @Column('timestampz')
    @CreateDateColumn()
    createdAt!: Date;

    @Column('timestamptz')
    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(type => User, user => user.snippets)
    user!: User;

    @BeforeInsert()
    handleBeforeInsert() {
      if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
      }
    }
    
    @BeforeUpdate()
    handleBeforeUpdate() {
      if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
      }
    }
}