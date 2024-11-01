import { Request, Response } from "express";
import { taskModel } from "../model/taskModel";

const url = "http://localhost:11434/api/generate";

interface Task {
	title: string;
	topico: string;
	objetivo: string;
}

export class TaskController {
	async create(req: Request, res: Response) {
		const { title, topico, objetivo } = req.body as Task;

		if (!title || !topico || !objetivo) {
			res.status(400).json({
				success: "false",
				message:
					"Não foram passados todos os parametros para a requisição. Tente novamente!",
			});
		}

		const responseIA = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				model: "llama3.2:1b",
				prompt: `Generate a simple and easy explication for ${topico} with the context ${title} with the objective of ${objetivo}. Every block of code that will be used for explication should be a different color. At the final, give me an resume and two different exercices for put in pratice the abilities of content. All explication should be in Brazilian Portuguese.`,
				stream: false,
			}),
		});

		const data = await responseIA.json();
		const dataToString = data.response.toString().trim();
		const created_at = data.created_at;

		await taskModel
			.create({
				title: title,
				topico: topico,
				objetivo: objetivo,
				model: dataToString,
				created_at: created_at,
			})
			.then(() =>
				res.status(201).json({
					success: "True",
					message: "Tarefa criada com sucesso!",
				})
			)
			.catch((error) =>
				res.status(500).json({
					succes: "False",
					message: `Foi encontrado um erro ao criar a tarefa: ${error}`,
				})
			);
	}

	async get(req: Request, res: Response) {
		await taskModel
			.find()
			.then((response) => res.status(200).json(response))
			.catch((error) =>
				res.status(500).json({
					succes: "False",
					message: `Foi encontrado um erro ao buscar as tarefas: ${error}`,
				})
			);
	}
}
