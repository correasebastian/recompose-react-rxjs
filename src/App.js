import React, { Component, cloneElement, Children } from 'react';
import logo from './logo.svg';
import './App.css';
import { setObservableConfig, mapPropsStream, createEventHandler } from "recompose";
import rxjsConfig from "recompose/rxjsObservableConfig";
import { Observable } from "rxjs/Observable";


setObservableConfig(rxjsConfig)

const Counter = ({ count }) => (
    <h2>{count}</h2>
)


const interval = mapPropsStream(props$ => {
  return props$
    .switchMap(props =>
      Observable.interval(1000),
      (props, count) => ({ ...props, count })
    )
})

const WithInterval = interval(Counter)

const App = () => (
 <WithInterval />
)

export default App;
