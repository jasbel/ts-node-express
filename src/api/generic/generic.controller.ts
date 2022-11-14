import { NextFunction, Request, RequestHandler, Response } from "express";
import { Generic } from "./generic.model";

const TODOS: Generic[] = [{id: 'probando', text: 'menssgage'}];

export const createGeneric: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const text =( req.body as {text: string}).text;
  const newGeneric = new Generic(Math.random().toString(), text);

  TODOS.push(newGeneric);

  res.status(201).json({message: 'Create the generic.', createGeneric: newGeneric});
};

export const getGenerics: RequestHandler = (req, res, next) => {
  res.status(200).json({generics: 'working'})
}

export const updateGeneric: RequestHandler<{id: string}> = (req, res, next) => {
  const genericId = req.params.id;

  const updatedText = (req.body as {text: string}).text;

  const generics= TODOS.map(t => {
    if (t.id === genericId) return {...t, text: updatedText}
    return t
  })

  const genericIndex = TODOS.findIndex(t => t.id === genericId)

  if (genericIndex<0) throw new Error('Could not find generic !!!');

  TODOS[genericIndex] = new Generic(TODOS[genericIndex].id, updatedText);

  res.status(200).json({message: 'Updated!!', updateGeneric: TODOS[genericIndex]})
}
export const deleteGeneric: RequestHandler<{id: string}> = (req, res, next) => {
  const genericId = req.params.id;

  const updatedText = (req.body as {text: string}).text;

  const generics= TODOS.map(t => {
    if (t.id === genericId) return {...t, text: updatedText}
    return t
  })

  const genericIndex = TODOS.findIndex(t => t.id === genericId)

  if (genericIndex<0) throw new Error('Could not find generic !!!');

  TODOS.splice(genericIndex, 1)

  res.status(200).json({message: 'Delete item!!'})
}