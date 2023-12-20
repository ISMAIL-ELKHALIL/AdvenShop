// Importing necessary modules and styles
import React, { useState } from "react";
import "./Add.scss";
import { useRegisterMutation } from "../../slices/usersApiSlice";


export default function Add(props) {
  const [register, { isLoading:loadingRegisterUser }] = useRegisterMutation();
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addNewEntity = async (e) => {
    e.preventDefault();

    try {
      const res = await register({ ...formData }).unwrap();

      props.setOpen(false);
    } catch (error) {
      console.error(`Error adding:`, error.message);
    }
  };

  // JSX for the Add component
  return (
    <div className="add">
      <div className="modal">
        {/* Close button to close the modal */}
        <span className="close" onClick={() => props.setOpen(false)}>
          <h4>X</h4>
        </span>

        {/* Heading for the modal */}
        <h1>Add new {props.slug}</h1>

        {/* Form for adding a new entity */}
        <form onSubmit={addNewEntity}>

          {/* Mapping through modalConfig to render form fields */}
          {props.modalConfig
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>

                {/* Label for the form field */}
                <label>{column.headerName}</label>

                {/* Rendering different input types based on column type */}
                {column.type === "boolean" ? (

                  // Select input for boolean type
                  <select
                    name={column.field}
                    onChange={handleInputChange}
                    value={formData[column.field] || ""}
                  >
                    <option value=""></option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                ) : column.type === "active" ? (

                  // Select input for active type
                  <select
                    name={column.field}
                    onChange={handleInputChange}
                    value={formData[column.field] || ""}
                  >
                    <option value=""></option>
                    <option value="true">active</option>
                    <option value="false">inactive</option>
                  </select>
                ) : (
                  
                  // Default input for other types
                  <input
                    type={column.type}
                    name={column.field}
                    placeholder={column.field}
                    onChange={handleInputChange}
                    value={formData[column.field] || ""}
                  />
                )}
              </div>
            ))}

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
