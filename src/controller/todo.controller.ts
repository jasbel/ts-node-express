import { NextFunction, Request, RequestHandler, Response } from "express";
import { Todo } from "../models/todo.model";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const text =( req.body as {text: string}).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({message: 'Create the todo.', createTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({todos: TODOS})
}