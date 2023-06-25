import React, {useEffect} from 'react';
import {Content} from "./components/Content";
import {Loading} from "./components/Loading";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {Layout} from "./components/Layout";
import {fetchAllWorkspaces} from "./store/slices/workspace.slice";
import {connectToWorkspaceSignalR} from "./api/workspaceAPI";
import './components/Layout/app.css';

function App() {
    const dispatch = useDispatch();
    const {tasks, error, loading} = useSelector((state: RootState) => state.todoList);

    const fetchWorkspaces = async () => {
        try {
            await dispatch(fetchAllWorkspaces());
            await connectToWorkspaceSignalR(dispatch);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    useEffect(() => {
        fetchWorkspaces();
    }, [])

    if (error) return <Layout>Error: {error}</Layout>;
    if (loading) return <Layout><Loading/></Layout>;

    return (<Layout><Content todos={tasks}/></Layout>);
}

export default App;