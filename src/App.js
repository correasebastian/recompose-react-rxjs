import React, { Component, cloneElement, Children } from 'react';
import logo from './logo.svg';
import './App.css';
import { setObservableConfig, componentFromStream, createEventHandler } from "recompose";
import rxjsConfig from "recompose/rxjsObservableConfig";
import { Observable } from "rxjs/Observable";


setObservableConfig(rxjsConfig)

const Counter = ({ value, onInc, onDec }) => (
  <div>
    <button onClick={onInc}>+</button>
    <h2>{value}</h2>
    <button onClick={onDec}>-</button>
  </div>
)


const CounterStream = componentFromStream(props$ => {
  const { stream: onInc$, handler: onInc } = createEventHandler()
  const { stream: onDec$, handler: onDec } = createEventHandler()

  return props$
    .switchMap(props =>
      Observable.merge(
        onInc$.mapTo(1),
        onDec$.mapTo(-1)
      )
        .startWith(props.value)
        .scan((acc, curr) => acc + curr)
        .map(value => ({ value, onInc, onDec }))
        .map(newProps =>
          Children.map(props.children, 
            child => 
            cloneElement(child, newProps)
          )
        )
    )
})

const App = () => (
 <CounterStream value={3}>
    <Counter />
    <Counter />
 </CounterStream>
)

export default App;
