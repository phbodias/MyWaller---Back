import { db, objectId } from '../dbStrategy/mongo.js';
import { postSchema } from '../schemas/schemas.js';
import dayjs from "dayjs";

export async function getPosts(req, res) {
  const session = res.locals.session;

  const posts = await db
    .collection('posts')
    .find({ userId: new objectId(session.userId) })
    .toArray();

  res.send(posts);
}

export async function createPost(req, res) {
  const session = res.locals.session;
  const post = req.body;

  const { error } = postSchema.validate(post);

  if (error) {
    return res.sendStatus("erro no schema");
  }

  const date = dayjs().locale("pt-br").format("DD/MM");

  await db.collection('posts').insertOne({ ...post, userId: session.userId, date });
  res.status(201).send('Post criado com sucesso!');
}
