import { db } from '../dbStrategy/mongo.js';

async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization);

  const token = authorization?.replace('Bearer ', '');
  const session = await db.collection('sessoes').findOne({ token });
  console.log(token);

  if (!session) {
    return res.sendStatus(token);
  }

  res.locals.session = session;

  next();
}

export default validateUser;
