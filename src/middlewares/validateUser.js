import { db } from '../dbStrategy/mongo.js';

async function validateUser(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace('bearer ', '');
  const session = await db.collection('sessoes').findOne({ token });

  if (!session) {
    return res.send("deuruim");
  }

  res.locals.session = session;

  next();
}

export default validateUser;
