import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useUpdateOrderToDeliveredMutation,
  useGetOrderDetailsQuery,
} from "../../slices/orderApiSlice";

export default function CustomerEditModal(props) {

  const {
    data: orderDetails,
    isLoading,
    error,
    refetch,
  }= useGetOrderDetailsQuery(props.orderId);

  const [isDelivered, setIsDelivered] = useState(orderDetails.isDelivered);


  useEffect(() => {
    if (orderDetails) {
      setIsDelivered();
    }
  }, [orderDetails]);

  const [updateOrderToDelivered, { isLoading: loadingUpdate }] =
    useUpdateOrderToDeliveredMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateOrderToDelivered({ id: props.orderId, isDelivered });
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
            <label>Delivred</label>
            <select
              name=""
              id=""
              value={isDelivered}
              onChange={(e) => setIsDelivered(e.target.value)}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>

            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
