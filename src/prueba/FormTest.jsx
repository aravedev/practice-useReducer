import React, { useEffect, useReducer, useState } from "react";
import { nanoid } from "nanoid";

// Initial State form
const initialForm = {
  text: "",
  description: "",
};

// Start Types

const types = {
  addNote: "[ADD] new note",
  deleteNote: "[DELETE] note",
  editNote: "[EDITE] note",
};

//End Types

// Start Reducer

/*
{
      id: 1,
      title: "React",
      description: "Testing useReducer",
    },
*/

// Note: Have a look of this initialStateNotes, I created it as an object that contains arrays inside, so we can manipulate it giving new arrays inside with the description and if you wanna use them later, just destructure the info that you need :)

const initialStateNotes = {
  notes: [],
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case types.addNote:
      return {
        ...state, // if I want set up more properties in the future
        notes: [...state.notes, action.payload],
      };

    case types.deleteNote:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case types.editNote:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };

    default:
      return state;
  }
};

// End Reducer

export const FormTest = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteForm, dispatch] = useReducer(notesReducer, initialStateNotes);
  const { notes } = noteForm;

  //Methods
  const onInputChange = (event) => {
    const title = event.target.value;
    setTitle(title);
  };

  const onTextAreaChange = (event) => {
    const textArea = event.target.value;
    setDescription(textArea);
  };

  const addNote = (title, description) => {
    const note = {
      id: nanoid(5),
      title: title,
      description: description,
    };

    const action = {
      type: types.addNote,
      payload: note,
    };

    //return note;
    dispatch(action);
    //console.log(action);
  };

  const deleteNote = (id) => {
    const action = {
      type: types.deleteNote,
      payload: id,
    };

    dispatch(action);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    addNote(title, description);
    event.target.reset();
  };

  const editForm = (id) => {
    const editedNote = {
      id: id,
      title: title,
      description: description,
    };
    const action = {
      type: types.editNote,
      payload: editedNote,
    };

    dispatch(action);
  };

  return (
    <>
      <form onSubmit={(event) => onFormSubmit(event)}>
        <input
          id="titleId"
          type="text"
          placeholder="title"
          name="title"
          onChange={onInputChange}
        />
        <div>
          <textarea
            name="description"
            id="textAreaId"
            cols="30"
            rows="10"
            placeholder="description..."
            onChange={onTextAreaChange}
          ></textarea>
        </div>
        <button>Add</button>
      </form>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <div>
              <h3>Title: {note.title}</h3>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
              <button onClick={() => editForm(note.id)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

/*


*/
