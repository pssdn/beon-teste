import createError from "http-errors";
import { getList } from "../lib/commonRedis";

export async function getAllTasksParsed() {
    let allTasks;
    let allTasksParsed = [];

    try {
        allTasks = await getList('tasks', 0, -1);
    } catch (err) {
        throw new createError.InternalServerError(err);
    }

    for (let task of allTasks) {
        allTasksParsed.push(JSON.parse(task));
    }

    return allTasksParsed;
}

export async function getTaskById(id) {
    let task;
    const allTasks = await getAllTasksParsed();

    for (let item of allTasks) {
        if (item.id === id) {
            task = item;
        }
    }

    if (!task) {
        throw new createError.NotFound(JSON.stringify({ 'Not Found': `Task with ID ["${id}"]` }));
    }

    return task;
}
