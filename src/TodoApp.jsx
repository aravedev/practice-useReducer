import React from "react";
import { useState } from "react";
import { useReducer } from "react";

const types = {
  add: "add",
  update: "update",
  delete: "delete",
};

const initialTodos = [
  { id: 1, title: "title 1" },
  { id: 2, title: "title 2" },
];

const reducer = (state, action) => {
  switch (action.type) {
    case types.delete:
      return state.filter((todo) => todo.id !== action.payload);

    case types.add:
      return [...state, action.payload];
    default:
      return state;
  }
};

// Functional component

export const TodoApp = () => {
  // todos
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");

  const onDelete = (id) => {
    const action = {
      type: types.delete,
      payload: id,
    };

    dispatch(action);
  };

  const onInputChange = (event) => {
    const note = event.target.value;
    const name = event.target.name;
    console.log(name);
    setText(note);
  };

  const onInputDescription = (event) => {
    const note = event.target.value;
    const name = event.target.name;

    setDescription(note);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: text,
      description: description,
    };

    dispatch({ type: types.add, payload: newTodo });
  };

  return (
    <>
      <h2>TodoApp</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={(id) => onDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Todo text..."
          name="text"
          value={text}
          onChange={onInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

// type="submit"
//onClick={dispatch({ type: types.delete })}
