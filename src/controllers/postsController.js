import { db, objectId } from '../dbStrategy/mongo.js';
import joi from 'joi';

export async function getPosts(req, res) {
  const session = res.locals.session;

  const posts = await db
    .collection('posts')
    .find({ userId: new objectId(session.userId) })
    .toArray();

  res.send(posts);
}

export async function createPost(req, res) {
  const post = req.body;

  const postSchema = joi.object({
    titulo: joi.string().required(),
    tipo: joi.string().required(),
    post: joi.string().required()
  });

  const { error } = postSchema.validate(post);

  if (error) {
    return res.sendStatus(422);
  }

  const session = res.locals.session;

  await db.collection('posts').insertOne({ ...post, userId: session.userId });
  res.status(201).send('Post criado com sucesso');
}
