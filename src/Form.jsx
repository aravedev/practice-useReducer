import React from "react";
import { useState } from "react";
import { useForm } from "./useForm";

export const Form = () => {
  const { onInputChange, onResetForm, name, description } = useForm({
    name: "",
    description: "",
  });

  const [text, setText] = useState({});

  const onNewNote = (text) => {
    console.log(text);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const text = {
      name: name,
      description: description,
    };

    setText(text);
    onNewNote(text);
    onResetForm();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          onChange={onInputChange}
          name="name"
          value={name}
          type="text"
          placeholder="name"
        />
      </div>
      <div>
        <textarea
          onChange={onInputChange}
          name="description"
          value={description}
          cols="30"
          rows="10"
          placeholder="text"
        ></textarea>
      </div>
      <button type="submit" onClick={(text) => onNewNote(text)}>
        submit
      </button>
    </form>
  );
};
