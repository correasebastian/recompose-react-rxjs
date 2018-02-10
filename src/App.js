import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { setObservableConfig, componentFromStream } from "recompose";
import rxjsConfig from "recompose/rxjsObservableConfig";
import { Observable } from "rxjs/Observable";


setObservableConfig(rxjsConfig)

const App = componentFromStream(
  props$ =>  Observable.interval(1000).map(count => (<h1>{count}</h1> ))
)

export default App;
