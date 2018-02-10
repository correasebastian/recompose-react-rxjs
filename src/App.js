import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { setObservableConfig, componentFromStream } from "recompose";
import rxjsConfig from "recompose/rxjsObservableConfig";


setObservableConfig(rxjsConfig)

const App = componentFromStream(
  props$ =>  props$.map(prop => (<h1>Hi</h1> ))
)

export default App;
