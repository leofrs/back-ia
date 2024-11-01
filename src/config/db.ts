import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.configDotenv();

const url = process.env.DATABASE_URL!;

export const mongooseConnection = async () => {
	await mongoose
		.connect(url)
		.then(() => console.log("Conectado ao banco de dados com o mongoose"))
		.catch((error) => console.error("Erro ao conectar:", error));
};

export const mongooseDisconnection = async () => {
	await mongoose
		.disconnect()
		.then(() => console.log("Conexão com o MongoDB fechada"))
		.catch((error) => console.error("Erro ao desconectar:", error));
};
