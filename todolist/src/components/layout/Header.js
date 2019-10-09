import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header style={headerStyle}>
            <h1>TodoList</h1>
            <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/completedToDoItems">Completed To Do Items</Link> | <Link style={linkStyle} to="/trashedToDoItems">Trashed To Do Items</Link>
        </header>
    )
};

const headerStyle = {
    background: 'cornflowerblue',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

export default Header;