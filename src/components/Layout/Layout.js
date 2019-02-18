import React from 'react';
import './Layout.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
   <>
    <Toolbar></Toolbar>
    <SideDrawer></SideDrawer>
    <main className={"Content"}>
        {props.children}
    </main>
   </>
);

export default layout;