import { v4 as uuid } from "uuid";
import createError from "http-errors";
import commonMiddleware from "../lib/commonMiddleware";
import { pushList } from "../lib/commonRedis";

async function createTask(event, context) {
	const id = uuid();
	const { name, dateStart, situation, priority, dateConclusion } = event.body;
	
	const task = { 
		id, 
		task: {
			name, 
			dateStart, 
			situation, 
			priority, 
			dateConclusion,
		},
	};

	try {
		await pushList('tasks', JSON.stringify(task));
	} catch (err) {
		throw new createError.InternalServerError(err);
	}

	return {
		statusCode: 201,
		body: JSON.stringify(task),
	};
}

export const handler = commonMiddleware(createTask);
