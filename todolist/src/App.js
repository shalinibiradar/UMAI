import React from 'react';
import './App.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// Importing React-Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Importing Components
import Header from './components/layout/Header'
import AddTodo from './components/AddToDo'
import DisplayToDoList from './components/DisplayToDoList'
import CompletedToDoItems from './components/CompletedToDoItems'
import TrashedToDoItem from './components/TrashedToDoItems'


const arrayItem = JSON.parse(localStorage.getItem("Items"))

/*Function to format date*/
function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

let reducer = function (state, action) {
  const arrayData = JSON.parse(localStorage.getItem("Items"))

  if (action.type === 'newTodo') {

    let obj = {
      id: Math.random(),
      title: action.content,
      duedate: action.dueDate,
      completeddate: '',
      status: 'pending'
    }

    if (arrayData !== null) {

      localStorage.setItem("Items", JSON.stringify([...arrayData, obj]))
      return { todos: [...arrayData, obj] }

    }

    else if (arrayData === null) {
      localStorage.setItem("Items", JSON.stringify([obj]))
      return { todos: [obj] }
    }
  }

  else if (action.type === 'completeTodo') {
    const arrayData = JSON.parse(localStorage.getItem("Items"))
    const currentDate = new Date()
    for (var i = 0; i < arrayData.length; i++) {
      console.log("i" + i)
      if (arrayData[i].id === action.id) {
        arrayData[i].status = "CompletedToDoItem"
        arrayData[i].completeddate = formatDate(currentDate)
      }
    }
    localStorage.clear();
    localStorage.setItem("Items", JSON.stringify(arrayData))
    alert("To Do Item is Completed Successfully")
    window.location.reload(false);
  }

  else if (action.type === 'deleteTodo') {
    const arrayData = JSON.parse(localStorage.getItem("Items"))

    for (var i = 0; i < arrayData.length; i++) {
      if (arrayData[i].id === action.id) {
        arrayData[i].status = "DeletedToDoItem"
      }
    }
    localStorage.clear();
    localStorage.setItem("Items", JSON.stringify(arrayData))
    alert("To Do Item is Deleted Successfully")
    window.location.reload(false);
  }

  else {
    return state;
  }
}



let myStore = createStore(reducer, { todos: arrayItem },
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_())


function App() {


  return (

    <Router>
      <div className="App">
        <div className="container">

          <Header />
          <br />
          <Route exact path="/" render={props => (
            <Provider store={myStore}>
              <AddTodo></AddTodo>
              <DisplayToDoList></DisplayToDoList>

            </Provider>
          )} />

          <Route path="/completedToDoItems" component={CompletedToDoItems} />
          <Route path="/trashedToDoItems" component={TrashedToDoItem} />

        </div>
      </div>
    </Router>

  );
}

export default App;
