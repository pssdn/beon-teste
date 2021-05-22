import commonMiddleware from "../lib/commonMiddleware";
import { getAllTasksParsed } from "../lib/util";

async function getTasks(event, context) {
    const allTasks = await getAllTasksParsed();

    return {
        statusCode: 200,
        body: JSON.stringify(allTasks),
    };
}

export const handler = commonMiddleware(getTasks); 
