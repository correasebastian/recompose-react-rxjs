import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CardStream from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <CardStream id={1} />,
    document.getElementById('root')
);
registerServiceWorker();
