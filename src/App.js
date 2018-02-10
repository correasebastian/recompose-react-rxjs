import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { setObservableConfig, componentFromStream } from "recompose";
import rxjsConfig from "recompose/rxjsObservableConfig";
import { Observable } from "rxjs/Observable";


setObservableConfig(rxjsConfig)

const personById = id => `https://swapi.co/api/people/${id}`

const loadById = id =>
  Observable.ajax(personById(id))
    .pluck('response')

const Card = props => (
  <div>
    <h1>{props.name}</h1>
    <h2>{props.homeworld}</h2>
  </div>
)


const CardStream = componentFromStream(
  props$ =>
    props$
      .switchMap(props =>
        loadById(props.id)
      )
      .map(Card)
)


export default CardStream;
