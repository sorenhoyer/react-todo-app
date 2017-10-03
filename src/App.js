import React, { Component } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';
import './App.css';
import uuid from 'uuid';
// import $ from 'jquery';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      visibilityFilter: 'SHOW_ALL',
      todos: [],
      visibleTodos: []
    };
    // this.apiUrl = 'http://jsonplaceholder.typicode.com/todos';
  }

  getTodos() {
    this.setState(
      {
        todos: [
          {
            id: uuid.v4(),
            title: 'todo 1',
            completed: true,
            order: 1
          },
          {
            id: uuid.v4(),
            title: 'todo 2',
            completed: false,
            order: 2
          }
        ]
      }, function() {
        this.syncVisibleTodos();
      }
    );

    // use es2017 async https://facebook.github.io/react-native/docs/network.html
    // return fetch(this.apiUrl)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({todos:responseJson}, function() {
    //       // do something with new state
    //       console.log(this.state);
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // $.ajax({
    //   url: 'http://jsonplaceholder.typicode.com/todos',
    //   dataType: 'json',
    //   cache: false,
    //   success: function(data){
    //     this.setState({todos:data}, function(){
    //       console.log(this.state);
    //     });
    //   }.bind(this),
    //   error: function(xhr, status, err){
    //     console.log(err);
    //   }
    // })
  }

  componentWillMount() {
    this.setState(
      {
        todos: [
          {
            id: uuid.v4(),
            title: 'todo 1',
            completed: true,
            order: 1
          },
          {
            id: uuid.v4(),
            title: 'todo 2',
            completed: false,
            order: 2
          }
        ]
      }
    );

    this.getTodos();
  }

  handleAddTodo(todo) {
    let id = this.state.todos.length + 1;
    todo.id = uuid.v4();
    todo.order = id;
    let todos = this.state.todos;
    todos.push(todo);
    
    this.setState({todos: todos}, this.syncVisibleTodos());
  }

  handleDeleteTodo(id) {
    // Filter all todos except the one to be removed
    const remainder = this.state.todos.filter((todo) => {
      return (todo.id !== id ? todo : null)
    });
    this.setState({todos: remainder}, function(){
      this.syncVisibleTodos()
    });
  }

  handleClickTodo(id) {
    let todos = this.state.todos;
    let index = todos.findIndex(x => x.id === id);
    todos[index].completed = !todos[index].completed;
    this.setState({todos: todos});
  }

  handleClickFooterLink(filter) {
    let visibilityFilter; 
    switch(filter) {
      case 'SHOW_ACTIVE':
        visibilityFilter = 'SHOW_ACTIVE';
        break;
      case 'SHOW_COMPLETED':
        visibilityFilter = 'SHOW_COMPLETED';
        break;
      default:
      visibilityFilter = 'SHOW_ALL';
    }
    this.setState({visibilityFilter: visibilityFilter}, function(){ 
      this.syncVisibleTodos(); 
    });
  }

  syncVisibleTodos() {
    let visibleTodos;
    switch(this.state.visibilityFilter) {
      case 'SHOW_ACTIVE':
        visibleTodos = this.state.todos.filter(todo => !todo.completed);
        break;
      case 'SHOW_COMPLETED':
        visibleTodos = this.state.todos.filter(todo => todo.completed);
        break;
      default:
        visibleTodos = this.state.todos;
    }
    this.setState({visibleTodos: visibleTodos});
  }

  render() {
    return (
      <div className="App">
        <AddTodo addTodo={this.handleAddTodo.bind(this)}/>
        <TodoList todos={this.state.todos} visibleTodos={this.state.visibleTodos} onDelete={this.handleDeleteTodo.bind(this)} onClick={this.handleClickTodo.bind(this)} />
        <Footer visibilityFilter={this.state.visibilityFilter} onClick={this.handleClickFooterLink.bind(this)}/>
      </div>
    );
  }
}

export default App;
