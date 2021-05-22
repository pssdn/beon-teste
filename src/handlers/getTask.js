import commonMiddleware from "../lib/commonMiddleware";
import { getTaskById } from "../lib/util";

async function getTask(event, context) {
    const { id } = event.pathParameters;
    const task = await getTaskById(id);

    return {
        statusCode: 200,
        body: JSON.stringify(task),
    };
}

export const handler = commonMiddleware(getTask);
