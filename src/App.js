import React, { Component } from "react";
import "./App.css";

/* 
  Note: Throughout the code you'll notice that before we update the state,
  if it's an array or object we will be making copies of it & that is because 
  array & objects in JavaScript are mutable. See this article below to learn 
  more about the Power of immutability and react

  https://medium.com/@sharifsbeat/the-power-of-immutability-and-react-daf46f2a5f4d
*/

// React Component
class App extends Component {
  // React's Local State
  state = {
    // our initial todos sotred as an array of Objects
    todos: [
      {
        title: "Wash the dishes",
        completed: false
      },
      {
        title: "Take out the trash",
        completed: false
      }
    ]
  };

  // Called before the component is "shown" on the page
  componentDidMount() {
    // To learn about fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    fetch("https://jsonplaceholder.typicode.com/todos")
      // converting the raw data to a JavaScript object
      .then(response => response.json())
      // Update the todos state to  include the todos from the server
      // To learn about ... syntax: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Copy_an_array
      .then(data => this.setState({ todos: [...this.state.todos, ...data] }));
  }

  addTodo = event => {
    // The onKeyPress function is calling this function & it gets called when
    // any key gets pressed. But we only want to add a todo when the "Enter" key
    // is pressed so therefore we wrap our logic to add a todo inside an if block
    if (event.key === "Enter") {
      // Create the todo Object
      const todo = { title: event.target.value, completed: false };
      // Clears the input in the UI
      event.target.value = "";

      // Make a copy of the Array
      const todos = [...this.state.todos];
      // add the todo to the copy of the array (we're using "unshift" to add it to the
      // front of the array so that it shows up on top of the list when it gets
      // added in the UI)
      // To learn about unshift: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
      todos.unshift(todo);

      // Update the state with the new todos array & react will trigger a render
      // & update the UI accordingly
      this.setState({
        todos
      });
    }
  };

  markComplete = index => {
    // Make a copy of the Array
    const todos = [...this.state.todos];
    // Make a copy of the Object & set completed to true
    const todo = { ...todos[index], completed: true };
    // Update the todo in the current index with new object above
    todos[index] = todo;

    // Update the state with the new todos array & react will trigger a render
    // & update the UI accordingly
    this.setState({ todos });
  };

  removeTodo = index => {
    // Make a copy of the Array
    const todos = [...this.state.todos];

    // Remove the todo in the array, because we have the "index" we know where
    // it is in the array
    // To learn about splice: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    todos.splice(index, 1);

    // Update the state with the new todos array & react will trigger a render
    // & update the UI accordingly
    this.setState({ todos });
  };

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        {/* Our Input to capture a new todo item */}
        <input type="text" onKeyPress={this.addTodo} />
        <ul>
          {/* To learn about map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
          {this.state.todos.map((todo, index) => (
            // To learn about the "key" prop: https://reactjs.org/docs/lists-and-keys.html#keys
            <li key={index}>
              {/* 
                if the todo is marked "completed" we then apply some CSS style to show it's
                completed. It it's not then then we supply no styles by passing 
                it an empty object "{}"
              */}
              <span
                style={
                  todo.completed
                    ? { textDecoration: "line-through", color: "red" }
                    : {}
                }
              >
                {/* The name of the todo */}
                {todo.title}
              </span>
              {/* A Button to mark a todo "completed". (&#10004; is the unicode for a checkmark)*/}
              <button onClick={() => this.markComplete(index)}>&#10004;</button>
              {/* A Button to delete a todo */}
              <button
                onClick={() => this.removeTodo(index)}
                style={{ color: "red" }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
