import React, { Component } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";
import axios from "axios";

import "./App.css";
class App extends Component{
  state = {
    todos:[],
    isLoading: false
  };
  componentDidMount(){
    const context = this
    this.setState({isLoading: true}, () =>
    axios
    .get("https://intense-garden-54873.herokuapp.com/")
    .then(res =>
      context.setState({
        todos: res.data,
        isLoading: false
      }))
    )
  }
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo._id === id){
          todo.status = !todo.status;
        }
        return todo;
      })
    });
  };
  AddTodo = kegiatan =>{
    axios
    .post("https://intense-garden-54873.herokuapp.com/", {
      kegiatan,
      status: false
    })
    .then(res =>
      this.setState({
        todos: [...this.state.todos, res.data]
      })
      );
    };
    render(){
      return(
        <div className="App">
          <div className="contrainer">
            <Header />
            <AddTodo AddTodo={this.AddTodo} />{" "}
            {this.state.isLoading? <div>Lagi loading...</div>:
<Todo
            todos={this.state.todos}
            markComplete={this.markComplete}
            />}
          </div>{" "}
        </div>
      );
    }
  }

export default App;
