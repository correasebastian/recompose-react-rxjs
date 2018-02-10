import React, { Component, cloneElement, Children } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  setObservableConfig,
  mapPropsStream,
  createEventHandler,
  compose
} from "recompose";
import rxjsConfig from "recompose/rxjsObservableConfig";
import { Observable } from "rxjs/Observable";


setObservableConfig(rxjsConfig)

const Counter = props => (
  <div>
    <button onClick={props.onInc}>+</button>
    <button onClick={props.onDec}>-</button>
    <h3>{props.count}</h3>
    <h1>{props.person.name}</h1>
  </div>
)

const count = mapPropsStream(props$ => {
  const { stream: onInc$, handler: onInc } = createEventHandler()
  const { stream: onDec$, handler: onDec } = createEventHandler()

  return props$
    .switchMap(props =>
      Observable.merge(
        onInc$.mapTo(1),
        onDec$.mapTo(-1)
      )
      .startWith(0)
      .scan((acc, curr) => acc + curr),
      (props, count) => ({
        ...props,
        count,
        onInc,
        onDec
      })
    )
})


const load = mapPropsStream(props$ =>
  props$
  .switchMap( props =>
      Observable.ajax(
        `https://swapi.co/api/people/${props.count}`
      )
      .pluck("response")
      .startWith({ name: "loading..." })
      .catch(err =>
        Observable.of({ name: "Not found" })
      ),
    (props, person) => ({ ...props, person })
  )
)

const type = mapPropsStream(props$ =>
  props$.
    switchMap(props =>
      Observable.zip(
        Observable.from(props.person.name),
        Observable.interval(300),
        letter => letter
      )
        .scan((acc, curr) => acc + curr),
    (props, name) => ({...props, person:{ ...props.person, name }})
  )
)

const CounterWithPersonLoader = compose(count, load, type)(Counter)


const App = () => (
 <CounterWithPersonLoader  />
)

export default App;
