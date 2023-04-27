export interface ITask {
    id: number,
    title: string,
    completed: boolean,
    deadline: string
}


export interface ITaskProps {
    task: ITask
}


