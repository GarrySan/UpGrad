import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./Components/Login/Login.js";
import logo from './logo.svg';
import './App.css';
import TopBar from './Components/TopBar.js';
import QuestionBuilder from './Components/Question/QuestionBuilder.js';
import Questions from './Components/Question/Questions.js';
import SelectStudent from './Components/Students/SelectStudent';
import Student from './Components/Students/Student';
import {Provider} from 'react-redux';
import { question } from './Reducers/QuestionReducer'
import { initialQuestions } from './InitialQuestions';
import { createStore } from 'redux'

let store = createStore(question, {questions: initialQuestions});
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/question-builder" render={() => <div><TopBar questionsLink={true}/><QuestionBuilder/></div>}/>
              <Route path="/questions" render={() => <div><TopBar logout={true}/><Questions/></div>}/>
              <Route path="/students" render={() => <div><TopBar logout={true}/><SelectStudent/></div>}/>
              <Route path="/student/:id?" render={({match}) => <div><TopBar logout={true}/><Student id={match.params.id}/></div>}/>
              <Route exact path="/" render={() => <div><TopBar/><Login/></div>}/>
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
