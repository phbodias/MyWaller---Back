import joi from "joi";

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const cadastroSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const postSchema = joi.object({
    titulo: joi.string().required(),
    tipo: joi.string().required(),
    valor: joi.string().required()
});