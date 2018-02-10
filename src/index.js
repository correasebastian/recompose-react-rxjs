import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StreamApp from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <StreamApp message='im a message yuju' speed={1000} />,
    document.getElementById('root')
);
registerServiceWorker();
