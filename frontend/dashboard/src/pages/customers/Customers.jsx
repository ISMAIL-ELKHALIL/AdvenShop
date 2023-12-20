// Customers.jsx

import DataTable from "../../components/dataTable/DataTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../slices/usersApiSlice";
import { useEffect, useState } from "react";
import {
  customerColumns,
  updateCustomerModal,
} from "../../utils/columnsAndModals";
import Add from "../../components/Add/Add";
import CustomerEditModal from "../../components/update/CustomerEditModal"; // Import the new modal

export default function Customers() {
  const { data, isLoading, refetch, error } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: loadingDeleteUser }] =
    useDeleteUserMutation();
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);

  const customers = data?.customers
    ?.map((customer) => {
      return {
        ...customer,
        id: customer._id,
      };
    })
    .filter((customer) => {
      return customer.isAdmin === false;
    });

  // const handleUpdate = (customerId) => {
  //   setOpenEdit(true);
  //   setEditCustomerId(customerId);
  // };

  // const handleEditUpdateSuccess = () => {
  //   refetch();
  // };

  const handleDelete = async (customerId) => {
    try {
      await deleteUser(customerId);
      refetch();
      toast.success("Customer deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
        </div>
      );
    },
  };

  useEffect(() => {
    refetch();
  }, [openAdd, refetch]);

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <div className="users">
          <div className="info">
            <h1>Customers</h1>
          </div>

          {customers && (
            <DataTable
              slug="Users"
              columns={customerColumns}
              rows={customers}
              getRowId={(row) => row.id}
              actionColumn={actionColumn}
            />
          )}
        </div>
      )}
    </>
  );
}
