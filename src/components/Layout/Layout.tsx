import React, {PropsWithChildren} from 'react';
import Header from "../Header/Header";
import {SideBar} from "../SideBar";

export const Layout = ({children}: PropsWithChildren<{}>) => {
    return (
        <>
            <Header/>
            <div className="app-with-drawer">
            <SideBar/>
            <main className="App">
                {children}
            </main>
            </div>
        </>
    );
};

