import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
	title: { type: String, require: true, trim: false },
	topico: { type: String, require: true, trim: false },
	objetivo: { type: String, require: true, trim: false },
	model: { type: String, require: true, trim: false },
	created_at: { type: String },
});

export const taskModel = mongoose.model("task", taskSchema);
