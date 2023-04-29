import React from 'react';
import {useGetMessagesQuery} from "./api/todosAPI";
import {Content} from "./components/Content";
import {Loading} from "./components/Loading";
import './app.css';

function App() {
    const {data, isLoading, isError} = useGetMessagesQuery('redux');

    if (isLoading) return <Loading/>;
    if (isError) return <div>error</div>;

    return (
        <div className="App">
            <Content data={data}/>
        </div>
    );
}

export default App;
