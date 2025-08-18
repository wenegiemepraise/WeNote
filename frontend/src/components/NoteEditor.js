import React, { useState } from 'react';

const NoteEditor = ({ onSave }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSave(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your note..."
        rows={4}
        style={{ width: '100%' }}
      />
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteEditor;
