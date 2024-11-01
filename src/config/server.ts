import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { taskRouter } from "../routes/taskRoute";
import { mongooseConnection } from "./db";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

mongooseConnection();

app.use(taskRouter);

app.listen(8080, () => {
	console.log("Servidor rodando em http://localhost:8080");
});
