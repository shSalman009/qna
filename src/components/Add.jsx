import React, { useEffect, useState } from "react";
import { useQna } from "../context/qnaContext";

export default function Add() {
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [editValues, setEditValues] = useState({
    editTitle: "",
    editDescription: "",
  });

  const { title, description } = values;
  const { editTitle, editDescription } = editValues;

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addQna(title, description);
    setValues({ title: "", description: "" });
  };

  const { addQna, updateQna, editedItem, cancelEdit } = useQna();

  useEffect(() => {
    editedItem &&
      setEditValues({
        editTitle: editedItem.title,
        editDescription: editedItem.description,
      });
  }, [editedItem]);

  return (
    <>
      <div>
        <h2 className="mx-auto text-4xl font-semibold my-10 text-center uppercase">
          Add Qna
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            onChange={handleChange}
            value={title}
            className="w-full border p-2 my-4"
            type="text"
            placeholder="Title"
            required
          />
          <input
            name="description"
            onChange={handleChange}
            value={description}
            className="w-full border p-2 my-4"
            type="text"
            placeholder="Description"
            required
          />

          <button
            disabled={!title || !description}
            type="submit"
            className={`px-4 py-2 mx-auto bg-blue-700 text-white rounded-sm ${
              !title || !description ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            ADD
          </button>
        </form>

        {editedItem && (
          <div>
            <h2 className="mx-auto text-4xl font-semibold my-10 text-center uppercase">
              edit
            </h2>{" "}
            <input
              name="editTitle"
              onChange={handleEditChange}
              value={editTitle}
              className="w-full border p-2 my-4"
              type="text"
              placeholder="Title"
              required
            />
            <input
              name="editDescription"
              onChange={handleEditChange}
              value={editDescription}
              className="w-full border p-2 my-4"
              type="text"
              placeholder="Description"
              required
            />
            <button
              onClick={() =>
                updateQna(editedItem.id, editTitle, editDescription)
              }
              type="button"
              className="px-4 py-2 mx-auto bg-blue-700 text-white rounded-sm"
            >
              EDIT
            </button>{" "}
            <button
              onClick={cancelEdit}
              type="button"
              className="px-4 py-2 mx-auto bg-gray-500 text-white rounded-sm"
            >
              CANCEL
            </button>
          </div>
        )}
      </div>
    </>
  );
}
