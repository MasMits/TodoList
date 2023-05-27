import React, {useEffect} from 'react';
import {Content} from "./components/Content";
import {Loading} from "./components/Loading";
import './components/Layout/app.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {fetchTodos} from "./store/slices/todo-list.slice";
import {sendConnectToWorkspaceRequest} from "./api/signalR";
import {Layout} from "./components/Layout";
import {fetchAllWorkspaces} from "./store/slices/workspace.slice";
import {connectToWorkspaceSignalR} from "./api/workspaceAPI";

function App() {
    const dispatch = useDispatch();
    const {tasks, error, loading} = useSelector((state: RootState) => state.todoList);
    const {activeWorkspace} = useSelector((state: RootState) => state.workspaces);

    const fetchWorkspaces = async () => {
        try {
            await dispatch(fetchAllWorkspaces());
            await dispatch(fetchTodos(activeWorkspace));
            await connectToWorkspaceSignalR(dispatch);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    useEffect(() => {
        fetchWorkspaces();
    }, [])

    useEffect(() => {
        dispatch(fetchTodos(activeWorkspace));
        sendConnectToWorkspaceRequest(activeWorkspace);
    }, [activeWorkspace])

    if (error) return <div>Error: {error}</div>;

    return (
        <Layout>
            {loading
                ?
                <Loading/> :
                <Content todos={tasks}/>
            }
        </Layout>
    );
}

export default App;