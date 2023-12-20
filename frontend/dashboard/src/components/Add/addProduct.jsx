// Importing necessary modules and styles
import React, { useEffect, useState } from "react";
import "./Add.scss";
import { useAddProductMutation } from "../../slices/productsApiSlice";
import { useGetAllCategoriesQuery } from "../../slices/categoriesApiSlice";

export default function AddProduct(props) {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategrories,
    refetch: refetchCategories,
  } = useGetAllCategoriesQuery();

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setProductData({
        ...productData,
        image: e.target.files, // This is a File object
      });
    } else {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const addNewEntity = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("description", productData.description);
      for (let i = 0; i < productData.image.length; i++) {
        formData.append("image", productData.image[i]);
      }


      console.log("formData", formData);
      console.log("data", {
        files: formData.get("image"),
        name: formData.get("name"),
        price: formData.get("price"),
        description: formData.get("description"),
        category: formData.get("category"),
      });

      await addProduct(formData).unwrap();
      // Handle success or navigate to another page
      // Close the modal after successful submission
      props.setOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // JSX for the Add component
  return (
    <>
      {isLoadingCategories ? (
        <p>Loading...</p>
      ) : errorCategrories ? (
        <p>errorCategrories.data.message||errorCategrories.error</p>
      ) : (
        <div className="add">
          <div className="modal">
            {/* Close button to close the modal */}
            <span className="close" onClick={() => props.setOpen(false)}>
              <h4>X</h4>
            </span>

            {/* Heading for the modal */}
            <h1>Add new {props.slug}</h1>

            {/* Form for adding a new entity */}
            <form
              onSubmit={addNewEntity}
              encType="multipart/form-data"
              method="post"
            >
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
                        value={productData[column.field] || ""}
                      >
                        <option value={""}>Select a category</option>
                        {!isLoadingCategories &&
                          !errorCategrories &&
                          categories?.map((category) => {
                            return (
                              <option
                                key={category._id}
                                value={category._id}
                                name={column.field}
                              >
                                {category.name}
                              </option>
                            );
                          })}
                      </select>
                    ) : (
                      // Default input for other types
                      <input
                        type={column.type}
                        name={column.field}
                        placeholder={column.field}
                        onChange={handleInputChange}
                        multiple
                        //value={productData[column.field] || ""}
                      />
                    )}
                  </div>
                ))}

              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
