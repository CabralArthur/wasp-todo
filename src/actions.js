import { HttpError } from 'http-errors';

export const createTask = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401, 'You must be logged in to create a task.');
    }

    return context.entities.Task.create({
        data: { description: args.description, user: { connect: { id: context.user.id } } },
    })
}

export const updateTask = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401, 'You must be logged in to create a task.');
    }

    return context.entities.Task.update({
        where: { id: args.id, user: { id: context.user.id } },
        data: { done: args.done, },
    })
}