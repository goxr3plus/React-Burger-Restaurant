import React from 'react';
import './Layout.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';

const layout = (props) => (
   <>
    <Toolbar></Toolbar>
    <main className={"Content"}>
        {props.children}
    </main>
   </>
);

export default layout;