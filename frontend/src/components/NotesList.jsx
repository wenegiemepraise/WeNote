import React from 'react';

const NotesList = ({ notes }) => (
  <ul>
    {notes.map(note => (
      <li key={note.id}>
        <div>{note.content}</div>
        <small>{new Date(note.timestamp).toLocaleString()}</small>
      </li>
    ))}
  </ul>
);

export default NotesList;
