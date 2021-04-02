import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../../entity/User';
import Snippet from '../../../entity/Snippet';

export const loadAllposts = async (req: Request, res: Response) => {
  const allPosts = await getRepository(Snippet).find({ order: {
    createdAt: "DESC"
  } });
  res.status(200).json(allPosts);
}

export const loadOnePost = async (req: any, res: Response) => {
  const onePost = await getRepository(Snippet).findOne(req.params.id);
  res.status(200).json(onePost);
}

export const loadMyPosts = async (req: any, res: Response) => {
  const userPosts = await getRepository(User).findOne({ email: req.user.me.email }, { relations: ['snippets'] });
  res.status(200).json(userPosts?.snippets.sort((a,b)=>a.createdAt>b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0));
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

export const updatePost = async (req: any, res: Response) => {
  const { id, title, markdown, writer } = req.body;
  const snippet = await getRepository(Snippet).findOne(id);
  
  if(snippet){
    snippet.title = title;
    snippet.markdown = markdown;
    snippet.writer = writer;
    
    await getRepository(Snippet).save(snippet);
    res.status(200).send('done');
  } else {
    res.status(400).send(`can't find a user`);
  }
}

export const deletePost = async (req: Request, res: Response) => {
  const snippet = await getRepository(Snippet).findOne(req.params.id);
  try{
    await getRepository(Snippet).remove(snippet!);
    res.status(200).send('delete success');
  } catch(err) {
    console.error(err);
    res.status(400).send('delete error');
  }
}