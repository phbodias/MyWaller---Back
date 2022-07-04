import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { db } from '../dbStrategy/mongo.js';
import { cadastroSchema, loginSchema } from '../schemas/schemas.js';

export async function createUser(req, res) {
  const usuario = req.body;

  const userCadastrado = await db.collection('usuarios').findOne({ email: usuario.email });
  if (userCadastrado){
    return res.sendStatus(422).send("Email já cadastrado!")
  }

  const { error } = cadastroSchema.validate(usuario);

  if (error) {
    return res.sendStatus(422);
  }

  const senhaCriptografada = bcrypt.hashSync(usuario.password, 10);

  await db.collection('usuarios').insertOne({ ...usuario, password: senhaCriptografada });
  res.status(201).send('Usuário criado com sucesso!');
}

export async function loginUser(req, res) {
  const usuario = req.body;

  const { error } = loginSchema.validate(usuario);

  if (error) {
    return res.sendStatus(422);
  }

  const user = await db.collection('usuarios').findOne({ email: usuario.email });

  if (user && bcrypt.compareSync(usuario.password, user.password)) {
    const token = uuid();

    await db.collection('sessoes').insertOne({
      token,
      userId: user._id
    });

    return res.status(201).send({token, name: user.name});
  } else {
    return res.status(401).send('Senha ou email incorretos!');
  }
}
