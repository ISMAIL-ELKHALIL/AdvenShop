import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import "./Update.scss";

export default function UserEditModal(props) {
  console.log(props);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data:user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(props.userId);
  
  useEffect(() => {
    if (user) {
      setId(user._id);
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
  
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(id, name, email);

      await updateUser({ id, name, email, isAdmin });
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

        <h1>Edit User </h1>

        <form onSubmit={submitHandler}>
          <div className="item">
            <label>Name</label>
            <input
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <select
              value={isAdmin}
              onChange={(e) => setIsAdmin(e.target.value)}
            >
              <option value=""></option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
