import React,{ useEffect, useState} from "react";
import "./App.css";
import { Button,CssBaseline , Card, TextField, CardContent, Grid, Paper, Typography } from '@material-ui/core';

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <Paper className="todo">
      <Typography variant="h6" style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</Typography>
      <Grid className="btn">
        <Button  onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button onClick={() => removeTodo(index)}>✕</Button>
      </Grid>
    </Paper>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}> 
      <TextField id="outlined-basic" label="ADD A TODO" variant="outlined" type="text"  value={value} onChange={e => setValue(e.target.value)}/>

    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "",
      isDone: false
    }
  ]);
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem("my_todos"));
    setTodos(storedTodos)
  },[])

  const addTodo = text => {
    const newTodos = [...todos, { text }];

    localStorage.setItem("my_todos", JSON.stringify(newTodos)); //store colors
    const storedTodos = JSON.parse(localStorage.getItem("my_todos"));
    setTodos(storedTodos)
   
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    localStorage.setItem("my_todos", JSON.stringify(newTodos)); //store colors
    const storedTodos = JSON.parse(localStorage.getItem("my_todos"));
    setTodos(storedTodos)
  };

  return (
    <Paper className="app">
      <CssBaseline  />
      <Grid className="container">
        <Typography variant="h4" className="heading"> MY Todo List</Typography>
        <FormTodo addTodo={addTodo} />
        <Grid className="card">
          {todos?.map((todo, index) => (
            <Card>
              <CardContent>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default App;