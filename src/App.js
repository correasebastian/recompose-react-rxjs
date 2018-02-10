import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { setObservableConfig, componentFromStream, createEventHandler } from "recompose";
import rxjsConfig from "recompose/rxjsObservableConfig";
import { Observable } from "rxjs/Observable";


setObservableConfig(rxjsConfig)
const loginput = e => console.log(e.target.value);

const SimpleForm = ({ text, onInput }) => (
  <div>
    <input type="text" onInput={onInput} />
    <h2>{text}</h2>
  </div>
)

const SimpleFormStream =
  componentFromStream(props$ => {
    const { stream: onInput$, handler: onInput } = createEventHandler();

    const text$ = onInput$
      .map(e => e.target.value)
      .delay(500)
      .startWith('')

    return text$
      .map(text => ({ text, onInput }))
      .map(SimpleForm)

  })


const App = () => (
 <SimpleFormStream />
)

export default App;
