import { Request, Response } from "express";
import { v4 } from "uuid";
import { getConnection } from "../../database";

export const getTasks = (req: Request, res: Response) => {
  const tasks = getConnection().data.tasks;
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const newTask = {
    id: v4(),
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const db = getConnection();
    db.data.tasks.push(newTask);
    await db.write();

    res.json(newTask);
  } catch (error: any) {
    return res.status(500).send(error);
  }
};

export const getTask = (req: Request, res: Response) => {
  const taskFound = getConnection().data.tasks.find((t: { id: string; }) => t.id === req.params.id);
  if (!taskFound) res.sendStatus(404);
  res.json(taskFound);
};

export const updateTask = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const db = getConnection();
    const taskFound = db.data.tasks.find((t: { id: string; }) => t.id === req.params.id);
    if (!taskFound) return res.sendStatus(404);

    taskFound.name = name;
    taskFound.description = description;

    db.data.tasks.map((t: { id: string; }) => (t.id === req.params.id ? taskFound : t));

    await db.write();

    res.json(taskFound);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const db = getConnection();
  const taskFound = db.data.tasks.find((t: { id: string; }) => t.id === req.params.id);
  if (!taskFound) res.sendStatus(404);

  const newTasks = db.data.tasks.filter((t: { id: string; }) => t.id !== req.params.id);
  db.data.tasks = newTasks;
  await db.write();

  return res.json(taskFound);
};

export const count = async (req: Request, res: Response) => {
  const totalTasks = getConnection().data.tasks.length;
  res.json(totalTasks);
};
