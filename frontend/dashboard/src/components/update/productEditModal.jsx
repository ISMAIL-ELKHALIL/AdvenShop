import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";

export default function ProductEditModal({
  productId,
  setOpen,
  onUpdateSuccess,
}) {
  console.log("productId", productId);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setImage(product.image);
    }
  }, [product]);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    try {
      await updateProduct({ id: productId, formData });
      toast.success("Product updated successfully");
      refetch();
      onUpdateSuccess(); // Invoke the callback
      setOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  return (
    <div className="update">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          <h4>X</h4>
        </span>

        <h1>Edit Product</h1>

        <form onSubmit={submitHandler}>
          <div className="item">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Price</label>
            <input
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="item">
            <label>Image</label>
            <input
              //value={image}
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
