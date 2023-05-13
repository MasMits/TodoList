import React, {useEffect} from 'react';
import {Content} from "./components/Content";
import {Loading} from "./components/Loading";
import './app.css';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {fetchTodos} from "./store/reducers/todo-item.slice";
import {connectToSignalR} from "./api/signalR";

function App() {
    const dispatch = useDispatch();
    const {tasks, error, loading} = useSelector((state: RootState) => state.todoList);

    useEffect(() => {
        connectToSignalR(dispatch);
        dispatch(fetchTodos());
    }, [])

    if (loading) return <Loading/>;
    if (error) return <div>error</div>;

    return (
        <div className="App">
            <Content todos={tasks}/>
        </div>
    );
}

export default App;
