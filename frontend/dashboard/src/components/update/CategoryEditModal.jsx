import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from "../../slices/categoriesApiSlice";
import "./UpdateCategory.scss";

export default function CategoryEditModal(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const {
    data:user,
    isLoading,
    error,
    refetch,
  } = useGetCategoryDetailsQuery(props.userId);
  
  useEffect(() => {
    if (user) {
      setId(user._id);
      setName(user.name);
    }
  }, [user]);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateCategoryMutation();


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id, name });
      toast.success("user updated successfully");
      refetch();
      props.onUpdateSuccess(); // Invoke the callback
      props.setOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="update">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          <h4>X</h4>
        </span>

        <h1>Edit Category </h1>

        <form onSubmit={submitHandler}>
          <div className="item">
            <label>Name</label>
            <input
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
