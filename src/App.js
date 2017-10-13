import React from 'react';
import VisibleTodoList from './containers/VisibleTodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';
import './App.css';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const App = () => 
  <div className="App">
    <AddTodo/>
    <VisibleTodoList />
    <Footer/>
  </div>

export default DragDropContext(HTML5Backend)(App);
