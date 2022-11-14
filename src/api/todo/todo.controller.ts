import { NextFunction, Request, RequestHandler, Response } from "express";
import { Todo } from "./todo.model";

const TODOS: Todo[] = [{id: 'probando', text: 'menssgage'}];

export const createTodo: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const text =( req.body as {text: string}).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({message: 'Create the todo.', createTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({todos: TODOS})
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as {text: string}).text;

  const todos= TODOS.map(t => {
    if (t.id === todoId) return {...t, text: updatedText}
    return t
  })

  const todoIndex = TODOS.findIndex(t => t.id === todoId)

  if (todoIndex<0) throw new Error('Could not find todo !!!');

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.status(200).json({message: 'Updated!!', updateTodo: TODOS[todoIndex]})
}
export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as {text: string}).text;

  const todos= TODOS.map(t => {
    if (t.id === todoId) return {...t, text: updatedText}
    return t
  })

  const todoIndex = TODOS.findIndex(t => t.id === todoId)

  if (todoIndex<0) throw new Error('Could not find todo !!!');

  TODOS.splice(todoIndex, 1)

  res.status(200).json({message: 'Delete item!!'})
}