import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/usersApiSlice";

export default function CustomerEditModal(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: customer, isLoading, error, refetch } = useGetUserDetailsQuery(props.customerId);

  useEffect(() => {
    if (customer) {
      setId(customer._id);
      setName(customer.name);
      setIsAdmin(customer.isAdmin);
    }
  }, [customer]);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id, name, isAdmin });
      toast.success("Customer updated successfully");
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

        <h1>Edit Customer</h1>

        <form onSubmit={submitHandler}>
          <div className="item">
            <label>Name</label>
            <input
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
