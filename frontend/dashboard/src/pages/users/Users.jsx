// Users.jsx
import DataTable from "../../components/dataTable/DataTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Users.scss";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { useEffect, useState } from "react";
import { addUserModal, userColumns } from "../../utils/columnsAndModals"
import Add from "../../components/Add/Add";
import UserEditModal from "../../components/update/UserEditModal";

export default function Users() {
  const { data, isLoading, refetch, error } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: loadingDeleteUser }] = useDeleteUserMutation();
  const [editUserId, setEditUserId] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const users = data?.users
    ?.map((user) => {
      return {
        ...user,
        id: user._id,
      };
    })
    .filter((user) => {
      return user.isAdmin === true;
    });

  const handleUpdate = (userId) => {
    // Open the UserEditModal with the userId
    // Pass a callback to handle update success+-
    setOpenEdit(true);
    setEditUserId(userId);
  };

  const handleEditUpdateSuccess = () => {
    // If needed, perform any additional logic when user update is successful
    refetch(); // Refetch the data or perform any other actions
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);

      refetch();
      toast.success("User deleted successfully");
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
{/*           <div onClick={() => handleUpdate(params.row.id)}>
            <img src="/view.svg" alt="" />
          </div> */}
          <div onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
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
            <h1>Users</h1>
            <button
              className="addButton"
              onClick={() => {
                setOpenAdd(true);
              }}
            >Add New User
            </button>
          </div>

          {users && (
            <DataTable
              columns={userColumns}
              rows={users}
              getRowId={(row) => row.id}
              actionColumn={actionColumn}
            />
          )}
          {openAdd && (
            <Add slug="User" modalConfig={addUserModal} setOpen={setOpenAdd} />
          )}
          {openEdit && (
            <UserEditModal
              userId={editUserId}
              setOpen={setOpenEdit}
              onUpdateSuccess={handleEditUpdateSuccess}
            />
          )}
        </div>
      )}
    </>
  );
}
