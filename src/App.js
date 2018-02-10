import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { setObservableConfig, componentFromStream } from "recompose";
import rxjsConfig from "recompose/rxjsObservableConfig";
import { Observable } from "rxjs/Observable";


setObservableConfig(rxjsConfig)

const createTypeWritter = (msg, speed=100) =>
  Observable.zip(
    Observable.from(msg),
    Observable.interval(speed),
    letter => letter
  )
  .scan((acc, curr) => acc + curr)


const App = props => (
  <div>
    <h1>{props.message}</h1>
  </div>
)

const StreamApp = componentFromStream(
  props$ =>
    props$
      .switchMap(props =>
        createTypeWritter(props.message, props.speed))
      .map(message => ({ message }))
      .map(App)
)


export default StreamApp;
