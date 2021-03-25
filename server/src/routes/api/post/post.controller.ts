import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../../entity/User';
import Snippet from '../../../entity/Snippet';

export const loadAllposts = async (req: Request, res: Response) => {
  const userPosts = await getRepository(Snippet).find();
  console.log(userPosts);
  res.status(200).json(userPosts);
}

export const newPost = async (req: any, res: Response) => {
  const { title, markdown, writer } = req.body;
  const user = await getRepository(User).findOne({ email: req.user.me.email });
  
  if(user){
    const snippet = new Snippet();
    snippet.title = title;
    snippet.markdown = markdown;
    snippet.writer = writer;
    snippet.user = user;
    
    await getRepository(Snippet).save(snippet);
    res.status(200).send('done');
  } else {
    res.status(400).send(`can't find a user`);
  }
}

export const loadMyPost = async (req: Request, res: Response) => {
  const userPosts = await getRepository(User).findOne({ email: '1@2.com' }, { relations: ['snippets'] });
}