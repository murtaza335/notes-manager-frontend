'use client';

import { useState } from 'react';

interface AddNotePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNotePopup: React.FC<AddNotePopupProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('bug');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!title || !description) {
      alert('Please fill in all fields');
      return;
    }

    const newNote = { title, tag, description };
    const storedUser = localStorage.getItem("user");
    const parsed = storedUser ? JSON.parse(storedUser) : null;
    const token = parsed?.token;

    try {
      const res = await fetch('http://192.168.162.4:5000/api/task/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNote),
      });

      if (!res.ok) throw new Error('Failed to add note');

      alert('Note added successfully!');
      
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error adding note');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded-xl w-[90%] max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Note</h2>

        <label className="block mb-2 text-[#4285f4] font-medium">Title</label>
        <input
          type="text"
          className="w-full p-3 rounded bg-[#3a3a3a] border border-gray-400 text-white mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />

        <label className="block mb-2 text-[#4285f4] font-medium">Tag</label>
        <select
          className="w-full p-3 rounded bg-[#3a3a3a] border border-gray-400 text-white mb-4"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
          <option value="support">Support</option>
        </select>

        <label className="block mb-2 text-[#4285f4] font-medium">Description</label>
        <textarea
          className="w-full p-3 rounded bg-[#3a3a3a] border border-gray-400 text-white mb-4"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Note description"
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-[#3a3a3a] text-white border border-gray-400 px-5 py-2 rounded font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#34b7ff] text-white px-5 py-2 rounded font-bold"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotePopup;
