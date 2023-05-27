export interface IWorkspace {
    id: number;
    name: string;
    taskCount: number;
}

export interface IWorkspaceProps {
    workspace: IWorkspace
}