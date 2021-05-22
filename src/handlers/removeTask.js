import commonMiddleware from "../lib/commonMiddleware";
import { pushList, remove } from "../lib/commonRedis";
import { getAllTasksParsed } from "../lib/util";

async function removeTask(event, context) {
    const { id } = event.pathParameters;
    const allTasks = await getAllTasksParsed();

    await remove('tasks');

    for (let item of allTasks) {
        if (item.id !== id) {
            await pushList('tasks', JSON.stringify(item));
            continue;
        }
    }

    return {
        statusCode: 204,
        body: JSON.stringify({}),
    };
}

export const handler = commonMiddleware(removeTask);
