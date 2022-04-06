import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];
export const createTodo: RequestHandler = (req, res, Next) => {
	const text = (req.body as { text: string }).text;
	const newTodo = new Todo(Math.random().toString(), text);

	TODOS.push(newTodo);

	res.status(200).json({ message: "Created the todo.", createTodo: newTodo });
};
