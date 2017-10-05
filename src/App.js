import React from 'react';
import VisibleTodoList from './containers/VisibleTodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';
import './App.css';

const App = () => 
  <div className="App">
    <AddTodo/>
    <VisibleTodoList />
    <Footer/>
  </div>

export default App;
