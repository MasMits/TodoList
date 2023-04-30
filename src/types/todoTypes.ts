export interface ITask {
    id: number,
    title: string,
    completed: boolean,
    deadline: string,
    order: number
}


export interface ITaskProps {
    task: ITask
}


