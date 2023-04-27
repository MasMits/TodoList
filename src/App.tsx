import React from 'react';
import {Content} from "./components/Content";
import {useGetMessagesQuery} from "./api/todosAPI";
import {Loading} from "./components/Loading";

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
