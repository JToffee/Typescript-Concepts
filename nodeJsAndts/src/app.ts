import express, { Request, Response, NextFunction } from "express";

import { json } from "body-parser";
import todoRoutes from "./routes/todos"; // link server to routes

//Server

const app = express();

//parse body of incoming requests and extract json data to populate body key on request obj with that parsed json data

app.use(json());

app.use("/todos", todoRoutes); //connect router to express app - forward requests starting with todos

//middleware fx for  error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.json({ message: err.message });
});

app.listen(3000);
