import commonMiddleware from "../lib/commonMiddleware";
import { pushList, remove } from "../lib/commonRedis";
import { getAllTasksParsed, getTaskById } from "../lib/util";

async function updateTask(event, context) {
    const { id } = event.pathParameters;
    const { name, dateStart, situation, priority, dateConclusion } = event.body;
    console.log(id);
    const { task } = await getTaskById(id);
    const allTasks = await getAllTasksParsed();

    task.name = name ?? task.name;
    task.dateStart = dateStart ?? task.dateStart;
    task.situation = situation ?? task.situation;
    task.priority = priority ?? task.priority;
    task.dateConclusion = dateConclusion ?? task.dateConclusion;

    await remove('tasks');

    for (let item of allTasks) {
        if (item.id === id) {
            item.task = task;
            await pushList('tasks', JSON.stringify(item));
            continue;
        }
        await pushList('tasks', JSON.stringify(item));
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ id, task }),
    };
}

export const handler = commonMiddleware(updateTask);
