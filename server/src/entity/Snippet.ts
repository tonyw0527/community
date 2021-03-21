import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import User from './User';
import slugify from 'slugify';
import marked from 'marked';
import createDomPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const dompurify = createDomPurify(new JSDOM().window);

@Entity()
export default class Snippet {

    @PrimaryGeneratedColumn('uuid')
    id!: number;

    @Column()
    title!: string;

    @Column()
    markdown!: string;

    @Column({ unique: true })
    slug!: string;

    @Column()
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
      if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
      }
      
      if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
      }
    }
    

    @BeforeUpdate()
    handleBeforeUpdate() {
      if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
      }
      
      if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
      }
    }
}
