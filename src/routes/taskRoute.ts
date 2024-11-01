import { Router } from "express";
import { TaskController } from "../controllers/taskController";

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post("/api/v1/create-plan-ia", taskController.create);
taskRouter.get("/api/v1/get-plan-ia", taskController.get);
